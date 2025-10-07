import { ethers } from "ethers";

// Ugly Unicorns NFT Contract Configuration
const nftConfig = {
  contractAddress: "0xa548fa1d539cab8d78163cb064f7b22e6ef34b2f", // Ugly Unicorns contract address
  abi: [
    {
      "inputs": [{"internalType": "string", "name": "_newBaseURI", "type": "string"}],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
        {"indexed": true, "internalType": "address", "name": "approved", "type": "address"},
        {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
        {"indexed": true, "internalType": "address", "name": "operator", "type": "address"},
        {"indexed": false, "internalType": "bool", "name": "approved", "type": "bool"}
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "contract IERC20", "name": "token", "type": "address"},
        {"indexed": false, "internalType": "address", "name": "to", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "ERC20PaymentReleased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"},
        {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": false, "internalType": "address", "name": "account", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "shares", "type": "uint256"}
      ],
      "name": "PayeeAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": false, "internalType": "address", "name": "from", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "PaymentReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": false, "internalType": "address", "name": "to", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "PaymentReleased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": false, "internalType": "address", "name": "royaltyRecipient", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "royaltyAmountNumerator", "type": "uint256"}
      ],
      "name": "SetRoyaltyInfo",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
        {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
        {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"}
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "MAX_TOKENS",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "RESERVED_SUPPLY",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ROYALTY_AMOUNT_DENOMINATOR",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "", "type": "address"}],
      "name": "_minted",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_royaltyAmountNumerator",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_royaltyRecipient",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "bytes32[]", "name": "_merkleProof", "type": "bytes32[]"},
        {"internalType": "uint256", "name": "tokens", "type": "uint256"}
      ],
      "name": "allowListMint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "", "type": "address"}],
      "name": "allowListMintCount",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "allowListMintEnabled",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "to", "type": "address"},
        {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "newMAX_TOKENS", "type": "uint256"}],
      "name": "decreaseMAX_TOKENS",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "getApproved",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "owner", "type": "address"},
        {"internalType": "address", "name": "operator", "type": "address"}
      ],
      "name": "isApprovedForAll",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxPerWallet",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "merkleRoot",
      "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokens", "type": "uint256"}],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mintEnabled",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "_to", "type": "address"},
        {"internalType": "uint256", "name": "tokens", "type": "uint256"}
      ],
      "name": "mintReservedTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "_owner", "type": "address"}],
      "name": "mintedTotalOf",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextOwnerToExplicitlySet",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "ownerOf",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
      "name": "payee",
      "outputs": [{"internalType": "address", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "price",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "_to", "type": "address"},
        {"internalType": "uint256", "name": "tokens", "type": "uint256"}
      ],
      "name": "promoMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address payable", "name": "account", "type": "address"}],
      "name": "release",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "contract IERC20", "name": "token", "type": "address"},
        {"internalType": "address", "name": "account", "type": "address"}
      ],
      "name": "release",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "contract IERC20", "name": "token", "type": "address"},
        {"internalType": "address", "name": "account", "type": "address"}
      ],
      "name": "released",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
      "name": "released",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "uint256", "name": "", "type": "uint256"},
        {"internalType": "uint256", "name": "salePrice", "type": "uint256"}
      ],
      "name": "royaltyInfo",
      "outputs": [
        {"internalType": "address", "name": "", "type": "address"},
        {"internalType": "uint256", "name": "", "type": "uint256"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "from", "type": "address"},
        {"internalType": "address", "name": "to", "type": "address"},
        {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "from", "type": "address"},
        {"internalType": "address", "name": "to", "type": "address"},
        {"internalType": "uint256", "name": "tokenId", "type": "uint256"},
        {"internalType": "bytes", "name": "_data", "type": "bytes"}
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "bool", "name": "_val", "type": "bool"}],
      "name": "setAllowListMintEnabled",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "operator", "type": "address"},
        {"internalType": "bool", "name": "approved", "type": "bool"}
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "string", "name": "_newBaseURI", "type": "string"}],
      "name": "setBaseURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "max", "type": "uint256"}],
      "name": "setMaxPerWallet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "bytes32", "name": "_root", "type": "bytes32"}],
      "name": "setMerkleRoot",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "bool", "name": "_val", "type": "bool"}],
      "name": "setMintEnabled",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_newPrice", "type": "uint256"}],
      "name": "setPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "royaltyRecipient", "type": "address"},
        {"internalType": "uint256", "name": "royaltyAmountNumerator", "type": "uint256"}
      ],
      "name": "setRoyaltyInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "_contract", "type": "address"}],
      "name": "setToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
      "name": "shares",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
      "name": "spendTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "standardToken",
      "outputs": [{"internalType": "contract StandardToken", "name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "bytes4", "name": "interfaceId", "type": "bytes4"}],
      "name": "supportsInterface",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "index", "type": "uint256"}],
      "name": "tokenByIndex",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "owner", "type": "address"},
        {"internalType": "uint256", "name": "index", "type": "uint256"}
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
      "name": "tokenURI",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "contract IERC20", "name": "token", "type": "address"}],
      "name": "totalReleased",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalReleased",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalShares",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "address", "name": "from", "type": "address"},
        {"internalType": "address", "name": "to", "type": "address"},
        {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "uriSuffix",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
};

// Get contract configuration
export const NFT_CONTRACT_ADDRESS = nftConfig.contractAddress;
export const NFT_CONTRACT_ABI = nftConfig.abi;

// Dynamic contract configuration
let currentConfig = { ...nftConfig };

// Update contract configuration
export const updateNFTContract = (contractAddress, abi) => {
  // Validate inputs
  if (!ethers.utils.isAddress(contractAddress)) {
    throw new Error("Invalid contract address");
  }
  
  if (!Array.isArray(abi)) {
    throw new Error("Invalid ABI format");
  }

  // Update the current configuration
  currentConfig = {
    contractAddress,
    abi
  };

  console.log("NFT Contract updated:", contractAddress);
  return true;
};

// Get current contract configuration
export const getCurrentConfig = () => currentConfig;

// Create NFT contract instance
export const getNFTContract = (signerOrProvider) => {
  return new ethers.Contract(currentConfig.contractAddress, currentConfig.abi, signerOrProvider);
};

// Mint NFT function
export const mintNFT = async (amount, account) => {
  try {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask to mint NFTs");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getNFTContract(signer);

    // Get mint price
    const mintPrice = await contract.price();
    const totalCost = mintPrice.mul(amount);

    // Execute mint transaction - Ugly Unicorns mint function only takes tokens parameter
    const transaction = await contract.mint(amount, {
      value: totalCost,
      gasLimit: 300000 // Adjust as needed
    });

    return transaction;
  } catch (error) {
    console.error("Minting error:", error);
    throw error;
  }
};

// Get user's NFT balance
export const getUserNFTBalance = async (account) => {
  try {
    if (!window.ethereum || !account) return 0;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getNFTContract(provider);
    
    const balance = await contract.balanceOf(account);
    return balance.toNumber();
  } catch (error) {
    console.error("Error getting NFT balance:", error);
    return 0;
  }
};

// Get total supply
export const getTotalSupply = async () => {
  try {
    if (!window.ethereum) return 0;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getNFTContract(provider);
    
    const totalSupply = await contract.totalSupply();
    return totalSupply.toNumber();
  } catch (error) {
    console.error("Error getting total supply:", error);
    return 0;
  }
};

// Get max supply
export const getMaxSupply = async () => {
  try {
    if (!window.ethereum) return 22222; // Default value

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getNFTContract(provider);
    
    const maxSupply = await contract.MAX_TOKENS();
    return maxSupply.toNumber();
  } catch (error) {
    console.error("Error getting max supply:", error);
    return 22222; // Default fallback
  }
};

// Get mint price in ETH
export const getMintPrice = async () => {
  try {
    if (!window.ethereum) return 0.08; // Default value

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getNFTContract(provider);
    
    const mintPrice = await contract.price();
    return parseFloat(ethers.utils.formatEther(mintPrice));
  } catch (error) {
    console.error("Error getting mint price:", error);
    return 0.08; // Default fallback
  }
};

// Check if minting is enabled
export const isMintEnabled = async () => {
  try {
    if (!window.ethereum) return false;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getNFTContract(provider);
    
    const mintEnabled = await contract.mintEnabled();
    return mintEnabled;
  } catch (error) {
    console.error("Error checking mint status:", error);
    return false;
  }
};

// Get max tokens per wallet
export const getMaxPerWallet = async () => {
  try {
    if (!window.ethereum) return 10; // Default value

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getNFTContract(provider);
    
    const maxPerWallet = await contract.maxPerWallet();
    return maxPerWallet.toNumber();
  } catch (error) {
    console.error("Error getting max per wallet:", error);
    return 10; // Default fallback
  }
};

// Get how many tokens an address has minted
export const getMintedByAddress = async (address) => {
  try {
    if (!window.ethereum || !address) return 0;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getNFTContract(provider);
    
    const minted = await contract.mintedTotalOf(address);
    return minted.toNumber();
  } catch (error) {
    console.error("Error getting minted count:", error);
    return 0;
  }
};