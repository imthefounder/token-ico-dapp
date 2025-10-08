// MINCHYN ICO Platform WordPress Plugin JavaScript

(function($) {
    'use strict';

    // Plugin state
    let web3Provider = null;
    let userAccount = null;
    let tokenContract = null;
    let icoContract = null;

    // Contract ABIs (minimal for functionality)
    const TOKEN_ABI = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
        "function name() view returns (string)"
    ];

    const ICO_ABI = [
        "function buyTokens() payable",
        "function tokenPrice() view returns (uint256)",
        "function tokensSold() view returns (uint256)",
        "function totalTokensForSale() view returns (uint256)",
        "function ethRaised() view returns (uint256)"
    ];

    // Wait for ethers.js to load
    function waitForEthers() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50; // Wait up to 5 seconds
            
            function checkEthers() {
                attempts++;
                if (typeof window.ethers !== 'undefined') {
                    resolve(window.ethers);
                } else if (attempts < maxAttempts) {
                    setTimeout(checkEthers, 100);
                } else {
                    reject(new Error('Ethers.js failed to load'));
                }
            }
            
            checkEthers();
        });
    }

    // Initialize when DOM is ready
    $(document).ready(function() {
        // Wait for ethers.js to load, then initialize
        waitForEthers()
            .then(() => {
                initializePlugin();
                bindEvents();
                startDataUpdates();
            })
            .catch((error) => {
                console.error('Failed to load ethers.js:', error);
                showError('Failed to load required libraries. Please refresh the page.');
            });
    });

    function initializePlugin() {
        // Check if any plugin containers exist
        if ($('.minchyn-ico-dashboard, .minchyn-token-purchase, .minchyn-nft-mint').length === 0) {
            return;
        }

        // Check for MetaMask
        if (typeof window.ethereum !== 'undefined') {
            checkWalletConnection();
        } else {
            showMetaMaskNotFound();
        }

        // Load initial data
        loadICOData();
    }

    function bindEvents() {
        // Add modern UI animations
        $('.minchyn-ico-dashboard, .minchyn-token-purchase, .minchyn-token-info, .minchyn-roadmap, .minchyn-team').addClass('fade-in');
        
        // Connect wallet
        $(document).on('click', '#connect-wallet', connectWallet);
        
        // Dashboard actions
        $(document).on('click', '#buy-tokens-btn', showTokenPurchase);
        $(document).on('click', '#add-to-metamask', addTokenToMetaMask);
        
        // Token purchase
        $(document).on('input', '#token-amount', updatePurchaseCalculation);
        $(document).on('click', '#purchase-btn', purchaseTokens);
        
        // Add scroll animations for stats and cards
        const elements = $('.stat-card, .team-member, .roadmap-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        $(entry.target).addClass('slide-up');
                    }, index * 100); // Staggered animation
                }
            });
        }, { threshold: 0.1 });
        
        elements.each(function() {
            observer.observe(this);
        });
    }

    async function checkWalletConnection() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await connectWallet();
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    }

    async function connectWallet() {
        try {
            // Ensure ethers.js is loaded
            if (typeof window.ethers === 'undefined') {
                throw new Error('Ethers.js library not loaded. Please refresh the page.');
            }

            // Check if MetaMask is available
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask not found. Please install MetaMask browser extension.');
            }

            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            userAccount = accounts[0];
            web3Provider = new window.ethers.providers.Web3Provider(window.ethereum);
            
            // Initialize contracts
            if (minchynICO.tokenContract && minchynICO.tokenContract !== '0x...') {
                tokenContract = new window.ethers.Contract(
                    minchynICO.tokenContract,
                    TOKEN_ABI,
                    web3Provider
                );
            }

            if (minchynICO.icoContract && minchynICO.icoContract !== '0x...') {
                icoContract = new window.ethers.Contract(
                    minchynICO.icoContract,
                    ICO_ABI,
                    web3Provider.getSigner()
                );
            }

            // Update UI
            updateWalletUI();
            enableActions();
            
            // Listen for changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
            
        } catch (error) {
            console.error('Error connecting wallet:', error);
            showError('Failed to connect wallet: ' + error.message);
        }
    }

    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            disconnectWallet();
        } else {
            userAccount = accounts[0];
            updateWalletUI();
        }
    }

    function handleChainChanged(chainId) {
        window.location.reload();
    }

    function disconnectWallet() {
        userAccount = null;
        web3Provider = null;
        tokenContract = null;
        icoContract = null;
        
        $('#wallet-connected').hide();
        $('#wallet-not-connected').show();
        $('.dashboard-actions button').prop('disabled', true);
    }

    async function updateWalletUI() {
        if (!userAccount) return;

        const shortAddress = userAccount.slice(0, 6) + '...' + userAccount.slice(-4);
        $('#user-address').text(shortAddress);
        
        try {
            // Get ETH balance
            const ethBalance = await web3Provider.getBalance(userAccount);
            $('#eth-balance').text(parseFloat(window.ethers.utils.formatEther(ethBalance)).toFixed(4));
            
            // Get token balance
            if (tokenContract) {
                const tokenBalance = await tokenContract.balanceOf(userAccount);
                const decimals = await tokenContract.decimals();
                const formattedBalance = window.ethers.utils.formatUnits(tokenBalance, decimals);
                $('#token-balance').text(parseFloat(formattedBalance).toFixed(2));
            } else {
                $('#token-balance').text('0.00');
            }
            
        } catch (error) {
            console.error('Error updating wallet UI:', error);
        }

        $('#wallet-not-connected').hide();
        $('#wallet-connected').show();
    }

    async function loadICOData() {
        try {
            // Load static/fallback data first
            $('#tokens-sold').text('150,000,000');
            $('#eth-raised').text('1,250.5');
            $('#current-price').text(minchynICO.tokenPrice + ' ETH');
            
            // Update progress
            const soldPercentage = (150000000 / 1000000000) * 100;
            $('#progress-fill').css('width', soldPercentage + '%');
            $('#progress-text').text(soldPercentage.toFixed(1) + '% Complete');
            $('#progress-amount').text('150,000,000 / 1,000,000,000 MINCHYN');
            
            // Set countdown timer (example: 30 days from now)
            const endTime = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
            startCountdown(endTime);
            
            // Try to load real data if contracts are available
            if (icoContract) {
                try {
                    const [tokensSold, ethRaised, tokenPrice] = await Promise.all([
                        icoContract.tokensSold(),
                        icoContract.ethRaised(),
                        icoContract.tokenPrice()
                    ]);
                    
                    $('#tokens-sold').text(tokensSold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                    $('#eth-raised').text(parseFloat(window.ethers.utils.formatEther(ethRaised)).toFixed(2));
                    $('#current-price').text(parseFloat(window.ethers.utils.formatEther(tokenPrice)).toFixed(6) + ' ETH');
                } catch (contractError) {
                    console.warn('Could not load real contract data:', contractError);
                }
            }
            
        } catch (error) {
            console.error('Error loading ICO data:', error);
        }
    }

    function startCountdown(endTime) {
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endTime - now;
            
            if (distance < 0) {
                $('#time-left').text('ENDED');
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            $('#time-left').text(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    function enableActions() {
        if (userAccount) {
            $('.dashboard-actions button').prop('disabled', false);
            $('#purchase-btn').prop('disabled', false);
        }
    }

    function showTokenPurchase() {
        // Scroll to token purchase section if it exists
        if ($('.minchyn-token-purchase').length > 0) {
            $('html, body').animate({
                scrollTop: $('.minchyn-token-purchase').offset().top - 50
            }, 500);
        } else {
            alert('Token purchase interface not found on this page. Please add the [minchyn_token_purchase] shortcode.');
        }
    }

    function updatePurchaseCalculation() {
        const tokenAmount = parseFloat($('#token-amount').val()) || 0;
        const tokenPrice = parseFloat(minchynICO.tokenPrice);
        const ethCost = tokenAmount * tokenPrice;
        const usdCost = ethCost * 2000; // Approximate ETH/USD rate
        
        $('#eth-cost').text(ethCost.toFixed(6) + ' ETH');
        $('#usd-cost').text('~$' + usdCost.toFixed(2));
        
        // Update summary
        $('#summary-tokens').text(tokenAmount.toLocaleString());
        $('#summary-cost').text(ethCost.toFixed(6) + ' ETH');
        
        // Calculate bonus (10% for purchases over 10,000 tokens)
        const bonus = tokenAmount > 10000 ? Math.floor(tokenAmount * 0.1) : 0;
        if (bonus > 0) {
            $('#summary-bonus').text('+' + bonus.toLocaleString() + ' MINCHYN');
            $('.summary-row.bonus').show();
        } else {
            $('.summary-row.bonus').hide();
        }
    }

    async function purchaseTokens() {
        if (!userAccount || !icoContract) {
            showError('Please connect your wallet and ensure contracts are configured');
            return;
        }

        try {
            const tokenAmount = parseFloat($('#token-amount').val());
            if (!tokenAmount || tokenAmount < 100) {
                showError('Minimum purchase is 100 tokens');
                return;
            }

            showPurchaseStatus('Preparing transaction...');
            $('#purchase-btn').prop('disabled', true);

            const tokenPrice = parseFloat(minchynICO.tokenPrice);
            const ethCost = tokenAmount * tokenPrice;
            const ethValue = window.ethers.utils.parseEther(ethCost.toString());

            // Check user balance
            const userBalance = await web3Provider.getBalance(userAccount);
            if (userBalance.lt(ethValue)) {
                throw new Error('Insufficient ETH balance');
            }

            showPurchaseStatus('Waiting for transaction confirmation...');

            // Send purchase transaction
            const transaction = await icoContract.buyTokens({
                value: ethValue,
                gasLimit: 200000
            });

            showPurchaseStatus('Transaction sent! Waiting for confirmation...');

            // Wait for confirmation
            await transaction.wait();

            // Success
            hidePurchaseStatus();
            showSuccess('Tokens purchased successfully!');
            
            // Refresh data
            loadICOData();
            updateWalletUI();

        } catch (error) {
            console.error('Purchase error:', error);
            hidePurchaseStatus();
            
            let errorMessage = 'Token purchase failed';
            if (error.message.includes('user rejected')) {
                errorMessage = 'Transaction was cancelled';
            } else if (error.message.includes('insufficient funds')) {
                errorMessage = 'Insufficient ETH for transaction';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            showError(errorMessage);
        } finally {
            $('#purchase-btn').prop('disabled', false);
        }
    }

    async function addTokenToMetaMask() {
        if (!tokenContract || !userAccount) {
            showError('Please connect your wallet first');
            return;
        }

        try {
            const tokenSymbol = await tokenContract.symbol();
            const tokenDecimals = await tokenContract.decimals();
            
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: minchynICO.tokenContract,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                    },
                },
            });
            
            showSuccess('Token added to MetaMask successfully!');
            
        } catch (error) {
            console.error('Error adding token to MetaMask:', error);
            showError('Failed to add token to MetaMask');
        }
    }

    function showPurchaseStatus(message) {
        $('#purchase-status-text').text(message);
        $('#purchase-status').show();
    }

    function hidePurchaseStatus() {
        $('#purchase-status').hide();
    }

    function showSuccess(message) {
        alert('✅ ' + message);
    }

    function showError(message) {
        alert('❌ ' + message);
    }

    function showMetaMaskNotFound() {
        $('#wallet-not-connected h3').text('🦊 MetaMask Required');
        $('#wallet-not-connected').append('<p>Please install MetaMask to use this platform.</p>');
        $('#connect-wallet').text('Install MetaMask').off('click').on('click', function() {
            window.open('https://metamask.io/download/', '_blank');
        });
    }

    function startDataUpdates() {
        // Update data every 30 seconds
        setInterval(function() {
            if (userAccount) {
                updateWalletUI();
                loadICOData();
            }
        }, 30000);
    }

    // Initialize purchase calculation on page load
    $(document).ready(function() {
        if ($('#token-amount').length > 0) {
            updatePurchaseCalculation();
        }
    });

})(jQuery);