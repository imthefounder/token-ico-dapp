import { ethers } from "ethers";

// MINCHYN Token Contract Address on mainnet
export const MINCHYN_TOKEN_ADDRESS = "0x91738EE7A9b54eb810198cefF5549ca5982F47B3";

// Standard ERC20 ABI for the functions we need
export const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "from", "type": "address"},
      {"indexed": true, "name": "to", "type": "address"},
      {"indexed": false, "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  }
];

// Get Ethereum provider (for mainnet data)
const getProvider = () => {
  // Use multiple RPC endpoints for reliability
  const rpcUrls = [
    "https://eth.llamarpc.com",
    "https://rpc.ankr.com/eth",
    "https://ethereum.publicnode.com",
    "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7"
  ];

  // Try each RPC URL until one works
  for (const rpcUrl of rpcUrls) {
    try {
      return new ethers.providers.JsonRpcProvider(rpcUrl);
    } catch (error) {
      console.warn(`Failed to connect to ${rpcUrl}:`, error);
      continue;
    }
  }
  
  // Fallback to default provider
  return ethers.getDefaultProvider('mainnet');
};

// Create contract instance
const getTokenContract = () => {
  const provider = getProvider();
  return new ethers.Contract(MINCHYN_TOKEN_ADDRESS, ERC20_ABI, provider);
};

// Get real-time token information
export const getTokenInfo = async () => {
  try {
    const contract = getTokenContract();
    
    // Fetch all token data in parallel for better performance
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply()
    ]);

    return {
      name,
      symbol,
      decimals: decimals.toString(),
      totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
      totalSupplyRaw: totalSupply.toString(),
      contractAddress: MINCHYN_TOKEN_ADDRESS
    };
  } catch (error) {
    console.error("Error fetching token info:", error);
    // Return fallback data if blockchain call fails
    return {
      name: "MINCHYN",
      symbol: "MINCHYN",
      decimals: "18",
      totalSupply: "1000000000", // 1 billion as fallback
      totalSupplyRaw: "1000000000000000000000000000", // 1 billion with 18 decimals
      contractAddress: MINCHYN_TOKEN_ADDRESS,
      error: "Failed to fetch real-time data"
    };
  }
};

// Get user's MINCHYN balance
export const getUserTokenBalance = async (userAddress) => {
  try {
    if (!userAddress || !ethers.utils.isAddress(userAddress)) {
      return "0";
    }

    const contract = getTokenContract();
    const balance = await contract.balanceOf(userAddress);
    const decimals = await contract.decimals();
    
    return ethers.utils.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return "0";
  }
};

// Get recent token transfers (last 10 transactions)
export const getRecentTransfers = async (limit = 10) => {
  try {
    const provider = getProvider();
    const contract = getTokenContract();
    
    // Get the latest block number
    const latestBlock = await provider.getBlockNumber();
    
    // Get Transfer events from the last 1000 blocks (roughly last 3-4 hours)
    const fromBlock = Math.max(0, latestBlock - 1000);
    
    const transferFilter = contract.filters.Transfer();
    const events = await contract.queryFilter(transferFilter, fromBlock, latestBlock);
    
    // Get the latest events and format them
    const recentEvents = events.slice(-limit).reverse();
    
    const transfers = await Promise.all(
      recentEvents.map(async (event) => {
        const block = await provider.getBlock(event.blockNumber);
        const decimals = await contract.decimals();
        
        return {
          hash: event.transactionHash,
          from: event.args.from,
          to: event.args.to,
          value: ethers.utils.formatUnits(event.args.value, decimals),
          blockNumber: event.blockNumber,
          timestamp: block.timestamp,
          date: new Date(block.timestamp * 1000).toLocaleString()
        };
      })
    );

    return transfers;
  } catch (error) {
    console.error("Error fetching recent transfers:", error);
    return [];
  }
};

// Get token holders count (approximate - this is resource intensive)
export const getHoldersCount = async () => {
  try {
    // This would require indexing service or third-party API
    // For now, return a placeholder or fetch from a service like Etherscan API
    return "Fetching...";
  } catch (error) {
    console.error("Error fetching holders count:", error);
    return "N/A";
  }
};

// Format large numbers for display
export const formatNumber = (num) => {
  const number = parseFloat(num);
  
  if (number >= 1e9) {
    return (number / 1e9).toFixed(2) + 'B';
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(2) + 'M';
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(2) + 'K';
  } else {
    return number.toLocaleString();
  }
};

// Get token price from DEX (if available on Uniswap/other DEXs)
export const getTokenPrice = async () => {
  try {
    // This would integrate with price APIs like CoinGecko, DEX APIs, etc.
    // For now, return placeholder
    return {
      usd: "N/A",
      eth: "N/A",
      change24h: "N/A"
    };
  } catch (error) {
    console.error("Error fetching token price:", error);
    return {
      usd: "N/A",
      eth: "N/A",
      change24h: "N/A"
    };
  }
};