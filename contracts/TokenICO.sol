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

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this operation");
        _;
    }

    constructor() {

    }

    function updateToken() {
        
    }

    function updateTokenSalePrice() {

    }

    function multiply() {

    }

    function buyToken() {

    }

    function getTokenDetails() {

    }

    function transferToOwner() {

    }

    function transferEther() {

    }

    function withdrawAllTokens() {

    }
    
}