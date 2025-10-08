import { ethers } from "ethers";

// Ugly Unicorns NFT Contract Configuration
const NFT_CONTRACT_ADDRESS = "0xa548fa1d539cab8d78163cb064f7b22e6ef34b2f";

// Multiple RPC providers for reliability
const RPC_PROVIDERS = [
  "https://eth.llamarpc.com",
  "https://rpc.ankr.com/eth",
  "https://ethereum.publicnode.com",
  "https://cloudflare-eth.com"
];

// Minimal ABI for the functions we need
const NFT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function MAX_TOKENS() view returns (uint256)",
  "function mintPrice() view returns (uint256)",
  "function mintEnabled() view returns (bool)",
  "function maxPerWallet() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function _minted(address owner) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

// Get a working provider
const getProvider = async () => {
  for (const rpc of RPC_PROVIDERS) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      await provider.getNetwork(); // Test the connection
      return provider;
    } catch (error) {
      console.warn(`Failed to connect to ${rpc}:`, error.message);
      continue;
    }
  }
  throw new Error("All RPC providers failed");
};

// Get NFT contract instance
const getNFTContract = async () => {
  const provider = await getProvider();
  return new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, provider);
};

// Get comprehensive NFT collection information
export const getNFTCollectionInfo = async () => {
  try {
    const contract = await getNFTContract();
    
    const [
      name,
      symbol,
      totalSupply,
      maxTokens,
      mintPrice,
      mintEnabled,
      maxPerWallet
    ] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.totalSupply(),
      contract.MAX_TOKENS(),
      contract.mintPrice(),
      contract.mintEnabled(),
      contract.maxPerWallet()
    ]);

    return {
      name,
      symbol,
      totalSupply: totalSupply.toNumber(),
      maxTokens: maxTokens.toNumber(),
      mintPrice: ethers.utils.formatEther(mintPrice),
      mintEnabled,
      maxPerWallet: maxPerWallet.toNumber(),
      contractAddress: NFT_CONTRACT_ADDRESS,
      remaining: maxTokens.toNumber() - totalSupply.toNumber(),
      progress: (totalSupply.toNumber() / maxTokens.toNumber()) * 100
    };
  } catch (error) {
    console.error("Error fetching NFT collection info:", error);
    return {
      name: "Ugly Unicorns",
      symbol: "UU",
      totalSupply: 0,
      maxTokens: 10000,
      mintPrice: "0.05",
      mintEnabled: false,
      maxPerWallet: 10,
      contractAddress: NFT_CONTRACT_ADDRESS,
      remaining: 10000,
      progress: 0,
      error: error.message
    };
  }
};

// Get user's NFT balance and minted count
export const getUserNFTInfo = async (userAddress) => {
  if (!userAddress) return { balance: 0, minted: 0 };

  try {
    const contract = await getNFTContract();
    
    const [balance, minted] = await Promise.all([
      contract.balanceOf(userAddress),
      contract._minted(userAddress)
    ]);

    return {
      balance: balance.toNumber(),
      minted: minted.toNumber(),
      userAddress
    };
  } catch (error) {
    console.error("Error fetching user NFT info:", error);
    return { balance: 0, minted: 0, error: error.message };
  }
};

// Get recent NFT transfers/mints
export const getRecentNFTActivity = async (limit = 10) => {
  try {
    const contract = await getNFTContract();
    const provider = await getProvider();
    
    // Get recent blocks
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(currentBlock - 10000, 0); // Last ~10k blocks

    // Get Transfer events (mints are transfers from zero address)
    const filter = contract.filters.Transfer();
    const events = await contract.queryFilter(filter, fromBlock, currentBlock);
    
    // Sort by block number (most recent first) and limit
    const recentEvents = events
      .sort((a, b) => b.blockNumber - a.blockNumber)
      .slice(0, limit);

    const activities = await Promise.all(
      recentEvents.map(async (event) => {
        const block = await provider.getBlock(event.blockNumber);
        const isMint = event.args.from === ethers.constants.AddressZero;
        
        return {
          type: isMint ? 'mint' : 'transfer',
          tokenId: event.args.tokenId.toNumber(),
          from: event.args.from,
          to: event.args.to,
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          timestamp: block.timestamp,
          timeAgo: getTimeAgo(block.timestamp),
          etherscanUrl: `https://etherscan.io/tx/${event.transactionHash}`
        };
      })
    );

    return activities;
  } catch (error) {
    console.error("Error fetching NFT activity:", error);
    return [];
  }
};

// Get real NFT data for collection preview
export const getRealNFTData = async (limit = 4) => {
  try {
    // First try to load some quick preview data
    const quickPreview = getQuickPreviewData(limit);
    
    // Then try to get real data in the background
    const contract = await getNFTContract();
    const totalSupply = await contract.totalSupply();
    const maxTokens = totalSupply.toNumber();
    
    if (maxTokens === 0) {
      return quickPreview; // Return preview data if no NFTs minted yet
    }

    // If we have real NFTs, get some actual data
    const tokenIds = [];
    const maxAttempts = Math.min(limit * 2, maxTokens); // Try more IDs in case some fail
    
    for (let i = 0; i < maxAttempts && tokenIds.length < limit; i++) {
      const randomId = Math.floor(Math.random() * maxTokens) + 1;
      if (!tokenIds.includes(randomId)) {
        tokenIds.push(randomId);
      }
    }

    const nftData = await Promise.allSettled(
      tokenIds.slice(0, limit).map(async (tokenId) => {
        try {
          const owner = await contract.ownerOf(tokenId);
          return {
            id: tokenId,
            name: `Ugly Unicorn #${tokenId}`,
            image: `https://uglify.gg/api/metadata/${tokenId}/image`,
            owner: owner,
            openseaUrl: `https://opensea.io/assets/ethereum/${NFT_CONTRACT_ADDRESS}/${tokenId}`,
            etherscanUrl: `https://etherscan.io/nft/${NFT_CONTRACT_ADDRESS}/${tokenId}`,
            traits: generateRandomTraits()
          };
        } catch (error) {
          console.warn(`Error fetching token ${tokenId}:`, error);
          return null;
        }
      })
    );

    // Filter successful results
    const successfulResults = nftData
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);

    // If we got some real data, return it, otherwise return preview
    return successfulResults.length > 0 ? successfulResults : quickPreview;
    
  } catch (error) {
    console.error("Error fetching real NFT data:", error);
    return getQuickPreviewData(limit); // Always return preview data as fallback
  }
};

// Quick preview data that loads immediately
const getQuickPreviewData = (limit = 4) => {
  const previewData = [
    {
      id: 1337,
      name: "Mystic Unicorn #1337",
      image: "https://uglify.gg/api/metadata/1337/image",
      owner: "0x...",
      openseaUrl: `https://opensea.io/assets/ethereum/${NFT_CONTRACT_ADDRESS}/1337`,
      etherscanUrl: `https://etherscan.io/nft/${NFT_CONTRACT_ADDRESS}/1337`,
      traits: ['Rainbow Mane', 'Star Eyes', 'Golden Horn']
    },
    {
      id: 2468,
      name: "Shadow Unicorn #2468",
      image: "https://uglify.gg/api/metadata/2468/image", 
      owner: "0x...",
      openseaUrl: `https://opensea.io/assets/ethereum/${NFT_CONTRACT_ADDRESS}/2468`,
      etherscanUrl: `https://etherscan.io/nft/${NFT_CONTRACT_ADDRESS}/2468`,
      traits: ['Dark Mane', 'Purple Eyes', 'Silver Horn']
    },
    {
      id: 3691,
      name: "Fire Unicorn #3691",
      image: "https://uglify.gg/api/metadata/3691/image",
      owner: "0x...", 
      openseaUrl: `https://opensea.io/assets/ethereum/${NFT_CONTRACT_ADDRESS}/3691`,
      etherscanUrl: `https://etherscan.io/nft/${NFT_CONTRACT_ADDRESS}/3691`,
      traits: ['Fire Mane', 'Red Eyes', 'Flame Horn']
    },
    {
      id: 4815,
      name: "Crystal Unicorn #4815",
      image: "https://uglify.gg/api/metadata/4815/image",
      owner: "0x...",
      openseaUrl: `https://opensea.io/assets/ethereum/${NFT_CONTRACT_ADDRESS}/4815`, 
      etherscanUrl: `https://etherscan.io/nft/${NFT_CONTRACT_ADDRESS}/4815`,
      traits: ['Crystal Mane', 'Blue Eyes', 'Diamond Horn']
    }
  ];
  
  return previewData.slice(0, limit);
};

// Generate random traits for display
const generateRandomTraits = () => {
  const manes = ['Rainbow Mane', 'Dark Mane', 'Fire Mane', 'Crystal Mane', 'Golden Mane'];
  const eyes = ['Star Eyes', 'Purple Eyes', 'Red Eyes', 'Blue Eyes', 'Green Eyes'];
  const horns = ['Golden Horn', 'Silver Horn', 'Flame Horn', 'Diamond Horn', 'Crystal Horn'];
  
  return [
    manes[Math.floor(Math.random() * manes.length)],
    eyes[Math.floor(Math.random() * eyes.length)],
    horns[Math.floor(Math.random() * horns.length)]
  ];
};

// Get current gas price for minting estimation
export const getCurrentGasPrice = async () => {
  try {
    const provider = await getProvider();
    const gasPrice = await provider.getGasPrice();
    
    // Estimate gas for a typical mint transaction (rough estimate)
    const estimatedGasLimit = 100000; // Typical gas limit for NFT mint
    const totalGasCost = gasPrice.mul(estimatedGasLimit);
    
    return {
      gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei'),
      estimatedCost: ethers.utils.formatEther(totalGasCost),
      gasPriceWei: gasPrice.toString()
    };
  } catch (error) {
    console.error("Error fetching gas price:", error);
    return {
      gasPrice: "20",
      estimatedCost: "0.002",
      gasPriceWei: "20000000000",
      error: error.message
    };
  }
};

// Utility function to format time ago
const getTimeAgo = (timestamp) => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// Get OpenSea collection URL
export const getOpenSeaCollectionUrl = () => {
  return `https://opensea.io/collection/ugly-unicorns-official`;
};

// Get Etherscan contract URL
export const getEtherscanContractUrl = () => {
  return `https://etherscan.io/address/${NFT_CONTRACT_ADDRESS}`;
};