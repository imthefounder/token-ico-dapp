// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20 {
    function transfer(address recipient, uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
    function allowance(address owner, address spender) external view returns(uint256);
    function approve(address spender, uint256 amount) external returns(bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);
    function symbol() external view returns(string memory);
    function totalSupply() external view returns(uint256);
    function name() external view returns(string memory);
}

contract TokenICO {
    address public owner;
    address public tokenAddress;
    uint256 public tokenSalePrice;
    uint256 public soldTokens;
    
    // Additional state variables for enhanced ICO functionality
    uint256 public tokensSold;
    uint256 public totalTokensForSale;
    uint256 public minPurchase;
    uint256 public maxPurchase;
    bool public saleActive;
    
    // Events
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event SaleStatusChanged(bool status);
    event PriceUpdated(uint256 newPrice);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this operation");
        _;
    }
    
    modifier saleIsActive() {
        require(saleActive, "Token sale is not active");
        _;
    }

    constructor() {
        owner = msg.sender;
        saleActive = false;
        minPurchase = 1; // Minimum 1 token
        maxPurchase = 10000; // Maximum 10,000 tokens per transaction
    }

    function updateToken(address _tokenAddress) public onlyOwner {
        tokenAddress = _tokenAddress;
    }

    function updateTokenSalePrice(uint256 _tokenSalePrice) public onlyOwner {
        tokenSalePrice = _tokenSalePrice;
        emit PriceUpdated(_tokenSalePrice);
    }
    
    function setSaleStatus(bool _status) public onlyOwner {
        saleActive = _status;
        emit SaleStatusChanged(_status);
    }
    
    function setPurchaseLimits(uint256 _min, uint256 _max) public onlyOwner {
        minPurchase = _min;
        maxPurchase = _max;
    }
    
    function setTotalTokensForSale(uint256 _totalTokens) public onlyOwner {
        totalTokensForSale = _totalTokens;
    }

    function multiply(uint256 x, uint256 y) internal pure returns(uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyToken(uint256 _tokenAmount) public payable saleIsActive {
        require(_tokenAmount >= minPurchase, "Purchase amount below minimum");
        require(_tokenAmount <= maxPurchase, "Purchase amount exceeds maximum");
        require(msg.value == multiply(_tokenAmount, tokenSalePrice), "Insufficient Ether provided for this purchase");

        ERC20 token = ERC20(tokenAddress);
        
        require(_tokenAmount <= token.balanceOf(address(this)), "Not enough tokens available for sale");

        // Transfer tokens (already in the right decimals)
        require(token.transfer(msg.sender, _tokenAmount * 1e18), "Token transfer failed");

        // Transfer ETH to owner
        payable(owner).transfer(msg.value);

        soldTokens += _tokenAmount;
        tokensSold += _tokenAmount;
        
        emit TokensPurchased(msg.sender, _tokenAmount, msg.value);
    }

    function getTokenDetails() public view returns(string memory name, string memory symbol, uint256 balance, uint256 supply, uint256 tokenPrice, address tokenAddr) {
        ERC20 token = ERC20(tokenAddress);

        return(
            token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress
        );
    }
    
    function getICODetails() public view returns(
        uint256 _tokensSold,
        uint256 _totalTokensForSale,
        uint256 _minPurchase,
        uint256 _maxPurchase,
        bool _saleActive,
        uint256 _tokenPrice
    ) {
        return(
            tokensSold,
            totalTokensForSale,
            minPurchase,
            maxPurchase,
            saleActive,
            tokenSalePrice
        );
    }

    function transferToOwner(uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");

        (bool success,) = owner.call{value: _amount}("");

        require(success, "Transaction failed");
    }

    function transferEther(address payable _reciever, uint256 _amount) external payable {
        require(msg.value >= _amount, "Insufficient funds sent");

        (bool success,) = _reciever.call{value: _amount}("");

        require(success, "Transaction failed");
    }

    function withdrawAllTokens() public onlyOwner {
        ERC20 token = ERC20(tokenAddress);

        uint256 balance = token.balanceOf(address(this));

        require(balance > 0, "No token to withdraw");

        require(token.transfer(owner, balance), "Transaction failed");
    }
    
}