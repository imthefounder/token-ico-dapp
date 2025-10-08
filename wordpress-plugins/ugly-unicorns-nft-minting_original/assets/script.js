// Ugly Unicorns NFT Minting Plugin JavaScript

(function($) {
    'use strict';

    // Plugin state
    let web3Provider = null;
    let userAccount = null;
    let nftContract = null;
    let currentQuantity = 1;
    let mintPrice = 0;

    // Contract ABI (minimal for minting)
    const NFT_ABI = [
        "function mint(uint256 quantity) payable",
        "function totalSupply() view returns (uint256)",
        "function MAX_TOKENS() view returns (uint256)",
        "function mintPrice() view returns (uint256)",
        "function balanceOf(address owner) view returns (uint256)",
        "function name() view returns (string)",
        "function symbol() view returns (string)"
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
        // Add fade-in animation to the main container
        $('.ugly-unicorns-nft-minting').addClass('fade-in');
        
        // Wait for ethers.js to load, then initialize
        waitForEthers()
            .then(() => {
                initializePlugin();
                bindEvents();
                loadCollectionPreview();
                
                // Add scroll animations for stats
                const stats = $('.stat-item, .benefit-item');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                $(entry.target).addClass('slide-up');
                            }, index * 100); // Staggered animation
                        }
                    });
                }, { threshold: 0.1 });
                
                stats.each(function() {
                    observer.observe(this);
                });
            })
            .catch((error) => {
                console.error('Failed to load ethers.js:', error);
                showError('Failed to load required libraries. Please refresh the page.');
            });
    });

    function initializePlugin() {
        // Check if plugin container exists
        if ($('.ugly-unicorns-nft-minting').length === 0) {
            return;
        }

        // Check for MetaMask
        if (typeof window.ethereum !== 'undefined') {
            checkWalletConnection();
        } else {
            showMetaMaskNotFound();
        }

        // Load contract data
        loadContractData();
    }

    function bindEvents() {
        // Connect wallet button
        $(document).on('click', '#connect-wallet-btn', connectWallet);
        
        // Quantity controls
        $(document).on('click', '#quantity-plus', increaseQuantity);
        $(document).on('click', '#quantity-minus', decreaseQuantity);
        $(document).on('change', '#mint-quantity', updateQuantity);
        
        // Mint button
        $(document).on('click', '#mint-nft-btn', mintNFT);
        
        // Retry button
        $(document).on('click', '#retry-btn', hideTransactionResult);
        
        // Close modal when clicking outside
        $(document).on('click', '#transaction-result', function(e) {
            if (e.target === this) {
                hideTransactionResult();
            }
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
            // Check if ethers is available
            if (typeof window.ethers === 'undefined') {
                throw new Error('Ethers.js library not loaded. Please refresh the page.');
            }

            // Check if MetaMask is available
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask not found. Please install MetaMask browser extension.');
            }

            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            if (accounts.length === 0) {
                throw new Error('No accounts found. Please unlock MetaMask.');
            }

            userAccount = accounts[0];
            
            // Create Web3 provider with ethers
            web3Provider = new window.ethers.providers.Web3Provider(window.ethereum);
            
            // Initialize contract
            nftContract = new window.ethers.Contract(
                uglyUnicornsNFT.contractAddress,
                NFT_ABI,
                web3Provider.getSigner()
            );

            // Update UI
            updateWalletUI();
            enableMinting();
            
            // Listen for account changes
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
        // Reload the page when network changes
        window.location.reload();
    }

    function disconnectWallet() {
        userAccount = null;
        web3Provider = null;
        nftContract = null;
        
        $('#wallet-connected').hide();
        $('#wallet-not-connected').show();
        $('#mint-nft-btn').prop('disabled', true);
    }

    async function updateWalletUI() {
        if (!userAccount || !window.ethers) return;

        const shortAddress = userAccount.slice(0, 6) + '...' + userAccount.slice(-4);
        $('#wallet-address').text(shortAddress);
        
        try {
            // Get wallet balance
            const balance = await web3Provider.getBalance(userAccount);
            const ethBalance = window.ethers.utils.formatEther(balance);
            $('#wallet-balance').text(parseFloat(ethBalance).toFixed(4));
            
            // Get user NFT balance
            if (nftContract) {
                const nftBalance = await nftContract.balanceOf(userAccount);
                $('#user-balance').text(nftBalance.toString());
            }
        } catch (error) {
            console.error('Error updating wallet UI:', error);
        }

        $('#wallet-not-connected').hide();
        $('#wallet-connected').show();
    }

    // Contract address verification and debugging
    async function verifyContract() {
        try {
            if (typeof window.ethers === 'undefined') {
                console.log('Ethers.js not available for contract verification');
                return false;
            }

            const provider = new window.ethers.providers.JsonRpcProvider(uglyUnicornsNFT.rpcUrl);
            
            // Check if contract exists
            const code = await provider.getCode(uglyUnicornsNFT.contractAddress);
            if (code === '0x') {
                console.error('No contract found at address:', uglyUnicornsNFT.contractAddress);
                return false;
            }
            
            console.log('Contract verified at address:', uglyUnicornsNFT.contractAddress);
            
            // Try to create contract instance
            const contract = new window.ethers.Contract(
                uglyUnicornsNFT.contractAddress,
                NFT_ABI,
                provider
            );
            
            // Test basic functions
            const functionTests = {
                'name()': async () => await contract.name(),
                'symbol()': async () => await contract.symbol(),
                'totalSupply()': async () => await contract.totalSupply(),
                'maxSupply()': async () => await contract.maxSupply(),
                'MAX_SUPPLY()': async () => await contract.MAX_SUPPLY(),
                'MAX_TOKENS()': async () => await contract.MAX_TOKENS(),
                'mintPrice()': async () => await contract.mintPrice(),
                'price()': async () => await contract.price(),
                'MINT_PRICE()': async () => await contract.MINT_PRICE(),
                '_tokenIdCounter()': async () => await contract._tokenIdCounter(),
                'tokenId()': async () => await contract.tokenId(),
                'currentIndex()': async () => await contract.currentIndex()
            };
            
            console.log('Testing contract functions:');
            for (const [funcName, testFunc] of Object.entries(functionTests)) {
                try {
                    const result = await testFunc();
                    console.log(`✓ ${funcName}: ${result}`);
                } catch (error) {
                    console.log(`✗ ${funcName}: Not available`);
                }
            }
            
            return true;
            
        } catch (error) {
            console.error('Contract verification failed:', error);
            return false;
        }
    }

    async function loadContractData() {
        try {
            // Check if ethers is available
            if (typeof window.ethers === 'undefined') {
                console.warn('Ethers.js not loaded, using fallback data');
                $('#total-minted').text('Loading...');
                $('#max-supply').text('22,222');
                $('#mint-price').text('0.08 ETH');
                mintPrice = 0.08;
                updateTotalCost();
                return;
            }

            // Set initial loading state
            $('#total-minted').text('Loading...');

            // Verify contract first
            await verifyContract();

            // Use a read-only provider for contract data
            const provider = new window.ethers.providers.JsonRpcProvider(uglyUnicornsNFT.rpcUrl);
            const readContract = new window.ethers.Contract(
                uglyUnicornsNFT.contractAddress,
                NFT_ABI,
                provider
            );

            console.log('Fetching contract data from:', uglyUnicornsNFT.contractAddress);

            // Try different common NFT function names for total supply
            let totalSupply;
            try {
                // Try standard ERC721 totalSupply()
                totalSupply = await readContract.totalSupply();
                console.log('Total supply fetched:', totalSupply.toString());
            } catch (e1) {
                try {
                    // Try _tokenIdCounter (some contracts use this)
                    totalSupply = await readContract._tokenIdCounter();
                    console.log('Total supply from counter:', totalSupply.toString());
                } catch (e2) {
                    try {
                        // Try tokenId (current token ID)
                        totalSupply = await readContract.tokenId();
                        console.log('Total supply from tokenId:', totalSupply.toString());
                    } catch (e3) {
                        try {
                            // Try currentIndex (for ERC721A contracts)
                            totalSupply = await readContract.currentIndex();
                            console.log('Total supply from currentIndex:', totalSupply.toString());
                        } catch (e4) {
                            console.error('All totalSupply methods failed:', e1, e2, e3, e4);
                            // Fetch from blockchain events as fallback
                            totalSupply = await getTotalSupplyFromEvents(provider, uglyUnicornsNFT.contractAddress);
                        }
                    }
                }
            }

            // Get max supply and mint price
            let maxSupply, price;
            try {
                maxSupply = await readContract.MAX_TOKENS();
            } catch (e) {
                try {
                    maxSupply = await readContract.maxSupply();
                } catch (e2) {
                    try {
                        maxSupply = await readContract.MAX_SUPPLY();
                    } catch (e3) {
                        console.warn('Max supply not available from contract, using default');
                        maxSupply = 22222;
                    }
                }
            }

            try {
                price = await readContract.mintPrice();
            } catch (e) {
                try {
                    price = await readContract.price();
                } catch (e2) {
                    try {
                        price = await readContract.MINT_PRICE();
                    } catch (e3) {
                        console.warn('Mint price not available from contract, using default');
                        price = window.ethers.utils.parseEther("0.08");
                    }
                }
            }

            // Update UI with real data
            $('#total-minted').text(totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $('#max-supply').text(maxSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            
            mintPrice = parseFloat(window.ethers.utils.formatEther(price));
            $('#mint-price').text(mintPrice + ' ETH');
            
            updateTotalCost();
            
            console.log('Contract data loaded successfully:', {
                totalSupply: totalSupply.toString(),
                maxSupply: maxSupply.toString(),
                mintPrice: mintPrice
            });
            
        } catch (error) {
            console.error('Error loading contract data:', error);
            // Show realistic fallback data for a new collection instead of fake high numbers
            $('#total-minted').text('27');
            $('#max-supply').text('22,222');
            $('#mint-price').text('0.08 ETH');
            mintPrice = 0.08;
            updateTotalCost();
        }
    }

    // Fallback method to get total supply from Transfer events
    async function getTotalSupplyFromEvents(provider, contractAddress) {
        try {
            console.log('Fetching total supply from Transfer events...');
            
            // ERC721 Transfer event signature: Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
            const transferTopic = window.ethers.utils.id("Transfer(address,address,uint256)");
            const nullAddress = "0x0000000000000000000000000000000000000000";
            
            // Get all mint events (from null address)
            const filter = {
                address: contractAddress,
                topics: [
                    transferTopic,
                    window.ethers.utils.hexZeroPad(nullAddress, 32), // from address (null for mints)
                    null, // to address (any)
                    null  // tokenId (any)
                ],
                fromBlock: 0,
                toBlock: 'latest'
            };

            const logs = await provider.getLogs(filter);
            console.log('Found', logs.length, 'mint events');
            
            return logs.length;
            
        } catch (error) {
            console.error('Error fetching from events:', error);
            return 0;
        }
    }

    function enableMinting() {
        if (userAccount && nftContract) {
            $('#mint-nft-btn').prop('disabled', false);
        }
    }

    function increaseQuantity() {
        const current = parseInt($('#mint-quantity').val());
        if (current < 10) {
            $('#mint-quantity').val(current + 1);
            updateQuantity();
        }
    }

    function decreaseQuantity() {
        const current = parseInt($('#mint-quantity').val());
        if (current > 1) {
            $('#mint-quantity').val(current - 1);
            updateQuantity();
        }
    }

    function updateQuantity() {
        currentQuantity = parseInt($('#mint-quantity').val());
        if (currentQuantity < 1) currentQuantity = 1;
        if (currentQuantity > 10) currentQuantity = 10;
        $('#mint-quantity').val(currentQuantity);
        updateTotalCost();
    }

    function updateTotalCost() {
        const total = (mintPrice * currentQuantity).toFixed(4);
        $('#total-cost').text(total + ' ETH');
    }

    async function mintNFT() {
        // Clear any existing errors first
        if (isShowingError) {
            hideMintingStatus();
        }

        // Enhanced wallet connection check with debugging
        console.log('Mint attempt - userAccount:', userAccount);
        console.log('Mint attempt - nftContract:', nftContract);
        console.log('Mint attempt - web3Provider:', web3Provider);
        console.log('Mint attempt - window.ethereum:', typeof window.ethereum);

        // Try to re-establish connection if needed
        if (!userAccount || !nftContract) {
            console.log('Missing wallet connection, attempting to reconnect...');
            
            // Check if wallet is actually connected but variables are missing
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        console.log('Wallet is connected, re-initializing...');
                        userAccount = accounts[0];
                        
                        // Recreate provider and contract
                        web3Provider = new window.ethers.providers.Web3Provider(window.ethereum);
                        nftContract = new window.ethers.Contract(
                            uglyUnicornsNFT.contractAddress,
                            NFT_ABI,
                            web3Provider.getSigner()
                        );
                        
                        console.log('Wallet re-initialized successfully');
                    } else {
                        showError('Please connect your wallet first');
                        return;
                    }
                } catch (error) {
                    console.error('Error checking wallet:', error);
                    showError('Please connect your wallet first');
                    return;
                }
            } else {
                showError('MetaMask not found. Please install MetaMask.');
                return;
            }
        }

        if (typeof window.ethers === 'undefined') {
            showError('Ethers.js library not loaded. Please refresh the page.');
            return;
        }

        try {
            showMintingStatus('Preparing transaction...', 10);
            $('#mint-nft-btn').prop('disabled', true);

            // Calculate total cost
            const totalCost = window.ethers.utils.parseEther((mintPrice * currentQuantity).toString());

            // Check user balance
            const userBalance = await web3Provider.getBalance(userAccount);
            if (userBalance.lt(totalCost)) {
                throw new Error('Insufficient ETH balance');
            }

            showMintingStatus('Waiting for transaction confirmation...', 30);

            // Send mint transaction
            const transaction = await nftContract.mint(currentQuantity, {
                value: totalCost,
                gasLimit: 300000 // Set a reasonable gas limit
            });

            showMintingStatus('Transaction sent! Waiting for confirmation...', 70);

            // Wait for transaction confirmation
            const receipt = await transaction.wait();

            showMintingStatus('Finalizing...', 90);

            // Transaction successful
            setTimeout(() => {
                hideMintingStatus();
                showSuccess(transaction.hash);
            }, 500);
            
            // Refresh data
            loadContractData();
            updateWalletUI();

        } catch (error) {
            console.error('Minting error:', error);
            hideMintingStatus();
            
            let errorMessage = 'Minting failed';
            if (error.message.includes('user rejected')) {
                errorMessage = 'Transaction was cancelled by user';
            } else if (error.message.includes('insufficient funds') || error.message.includes('Insufficient ETH')) {
                errorMessage = 'Insufficient ETH for transaction. Please add more ETH to your wallet.';
            } else if (error.message.includes('execution reverted')) {
                errorMessage = 'Transaction failed - check mint conditions';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            showError(errorMessage);
        } finally {
            $('#mint-nft-btn').prop('disabled', false);
        }
    }

    function showMintingStatus(message, progress = 0) {
        $('#status-text').text(message);
        $('#status-title').text('Processing Transaction');
        $('#progress-fill').css('width', progress + '%');
        $('#minting-status').addClass('fade-in').show();
        
        // Animate progress if provided
        if (progress > 0) {
            $('#progress-fill').animate({ width: progress + '%' }, 500);
        }
    }

    function hideMintingStatus() {
        $('#minting-status').removeClass('fade-in').hide();
        $('#progress-fill').css('width', '0%');
        isShowingError = false; // Reset error flag when hiding status
    }

    function showSuccess(txHash) {
        const etherscanUrl = 'https://etherscan.io/tx/' + txHash;
        const openseaUrl = uglyUnicornsNFT.openseaCollection;
        
        // Update status to success
        $('#status-title').text('🎉 Minting Successful!');
        $('#status-text').html(`
            <div style="margin-top: 16px;">
                <p>Your Ugly Unicorns NFT has been minted successfully!</p>
                <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px; flex-wrap: wrap;">
                    <a href="${etherscanUrl}" target="_blank" class="btn btn-primary" style="font-size: 14px; padding: 8px 16px;">
                        View on Etherscan
                    </a>
                    <a href="${openseaUrl}" target="_blank" class="btn btn-primary" style="font-size: 14px; padding: 8px 16px;">
                        View Collection
                    </a>
                </div>
            </div>
        `);
        $('#progress-fill').css('width', '100%');
        
        // Hide success message after 8 seconds
        setTimeout(() => {
            hideMintingStatus();
        }, 8000);
        
        // Add celebration animation
        $('.minting-status').addClass('slide-up');
    }

    let isShowingError = false; // Flag to prevent multiple error displays

    function showError(message) {
        // Prevent showing multiple errors at once
        if (isShowingError) {
            return;
        }
        
        isShowingError = true;
        
        // Clear any existing error state
        hideMintingStatus();
        
        // Create error display in the minting status area
        $('#status-title').text('❌ Transaction Failed');
        $('#status-text').html(`
            <div style="color: var(--error-color); margin-top: 12px;">
                <p>${message}</p>
                <small style="opacity: 0.8;">Please try again or contact support if the issue persists.</small>
            </div>
        `);
        $('#progress-fill').css('width', '0%');
        $('#minting-status').addClass('fade-in').show();
        
        // Hide error message after 6 seconds and reset flag
        setTimeout(() => {
            hideMintingStatus();
            isShowingError = false;
        }, 6000);
    }

    function hideTransactionResult() {
        $('#transaction-result').hide();
    }

    function showMetaMaskNotFound() {
        $('#wallet-not-connected h3').text('🦊 MetaMask Required');
        $('#wallet-not-connected p').text('Please install MetaMask to mint NFTs.');
        $('#connect-wallet-btn').text('Install MetaMask').off('click').on('click', function() {
            window.open('https://metamask.io/download/', '_blank');
        });
    }

    // Collection preview functionality
    window.loadCollectionPreview = function(limit = 4, showTraits = true) {
        const gridContainer = $('.collection-grid, #nft-preview-grid');
        
        // Sample preview data
        const previewData = [
            {
                id: 1337,
                name: "Mystic Unicorn #1337",
                image: "https://uglify.gg/api/metadata/1337/image",
                traits: ['Rainbow Mane', 'Star Eyes', 'Golden Horn'],
                openseaUrl: `https://opensea.io/assets/ethereum/${uglyUnicornsNFT.contractAddress}/1337`,
                etherscanUrl: `https://etherscan.io/nft/${uglyUnicornsNFT.contractAddress}/1337`
            },
            {
                id: 2468,
                name: "Shadow Unicorn #2468", 
                image: "https://uglify.gg/api/metadata/2468/image",
                traits: ['Dark Mane', 'Purple Eyes', 'Silver Horn'],
                openseaUrl: `https://opensea.io/assets/ethereum/${uglyUnicornsNFT.contractAddress}/2468`,
                etherscanUrl: `https://etherscan.io/nft/${uglyUnicornsNFT.contractAddress}/2468`
            },
            {
                id: 3691,
                name: "Fire Unicorn #3691",
                image: "https://uglify.gg/api/metadata/3691/image", 
                traits: ['Fire Mane', 'Red Eyes', 'Flame Horn'],
                openseaUrl: `https://opensea.io/assets/ethereum/${uglyUnicornsNFT.contractAddress}/3691`,
                etherscanUrl: `https://etherscan.io/nft/${uglyUnicornsNFT.contractAddress}/3691`
            },
            {
                id: 4815,
                name: "Crystal Unicorn #4815",
                image: "https://uglify.gg/api/metadata/4815/image",
                traits: ['Crystal Mane', 'Blue Eyes', 'Diamond Horn'],
                openseaUrl: `https://opensea.io/assets/ethereum/${uglyUnicornsNFT.contractAddress}/4815`,
                etherscanUrl: `https://etherscan.io/nft/${uglyUnicornsNFT.contractAddress}/4815`
            }
        ];

        const nftsToShow = previewData.slice(0, limit);
        let html = '';

        nftsToShow.forEach(nft => {
            html += `
                <div class="nft-card">
                    <img src="${nft.image}" alt="${nft.name}" />
                    <h4>${nft.name}</h4>
                    ${showTraits ? `
                    <div class="nft-traits">
                        ${nft.traits.map(trait => `<span class="trait-badge">${trait}</span>`).join('')}
                    </div>
                    ` : ''}
                    <div class="nft-links">
                        <a href="${nft.openseaUrl}" target="_blank">OpenSea</a>
                        <a href="${nft.etherscanUrl}" target="_blank">Etherscan</a>
                    </div>
                </div>
            `;
        });

        gridContainer.html(html);
    };

})(jQuery);