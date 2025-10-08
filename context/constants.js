import { ethers } from "ethers";
import Web3Modal from "web3modal";

//INTERNAL IMPORTS & EXPORTS
import tokenICO from "./TokenICO.json";
import minchynERC20 from "./MinchynERC20.json";

export const TOKEN_ADDRESS = "0x91738EE7A9b54eb810198cefF5549ca5982F47B3"; // MINCHYN Token Address
export const ERC20_ABI = minchynERC20.abi;
export const OWNER_ADDRESS = "0x96FAA67f6c78ca2A32A4d60D1A92353A1b653F17"; // Update with your address
export const CONTRACT_ADDRESS = "0x441b3069e00c9f8E61538464b5Ba5Dd3e486c5B4"; // Update when you deploy new ICO contract
export const CONTRACT_ABI = tokenICO.abi;

const networks = {
  ethereum: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://eth.llamarpc.com"],
    blockExplorerUrls: ["https://etherscan.io"],
  },

  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },

  holesky: {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky",
    nativeCurrency: {
      name: "holesky",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"],
  },

  polygon_amoy: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Polygon Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://www.oklink.com/amoy"],
  },

  polygon_mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },

  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/polygon"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },

  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/bsc"],
    blockExplorerUrls: ["https://bscscan.com"],
  },

  base_mainnet: {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },

  base_sepolia: {
    chainId: `0x${Number(84532).toString(16)}`,
    chainName: "Base Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },

  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const tokenImage =
  "https://www.daulathussain.com/wp-content/uploads/2024/05/theblockchaincoders.jpg";

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");

    const network = networks[networkName];
    if (!network) throw new Error(`Network ${networkName} not configured`);

    try {
      // First try to switch to the network if it exists
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.chainId }],
      });
    } catch (switchError) {
      // If the network doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [network],
        });
      } else {
        throw switchError;
      }
    }
  } catch (error) {
    console.log("Network change error:", error.message);
    throw error;
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "ethereum";

  await changeNetwork({ networkName });
};

export const CHECK_CONNECTED_WALLET = async () => {
  try {
    if (!isMetaMaskInstalled()) {
      console.log("MetaMask not installed");
      return null;
    }

    if (!window.ethereum) {
      console.log("Ethereum object not found");
      return null;
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts && accounts.length > 0) {
      console.log("Found connected account:", accounts[0]);
      return accounts[0];
    } else {
      console.log("No connected accounts found");
      return null;
    }
  } catch (error) {
    console.log("Error checking connected wallet:", error);
    return null;
  }
};

// Enhanced MetaMask detection
export const isMetaMaskInstalled = () => {
  return typeof window !== 'undefined' && 
         typeof window.ethereum !== 'undefined' && 
         window.ethereum.isMetaMask;
};

// Get MetaMask installation URL
export const getMetaMaskInstallUrl = () => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Firefox')) {
    return 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
  } else if (userAgent.includes('Edg')) {
    return 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm';
  } else {
    return 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
  }
};

export const CONNECT_WALLET = async () => {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      throw new Error("Not in browser environment");
    }

    // Check if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      const installUrl = getMetaMaskInstallUrl();
      throw new Error(`MetaMask not detected. Please install MetaMask from: ${installUrl}`);
    }

    // Check if Ethereum object exists
    if (!window.ethereum) {
      throw new Error("Ethereum object not found. Please check your wallet extension.");
    }

    console.log("Attempting to connect to MetaMask...");

    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts returned from MetaMask. Please unlock your wallet and try again.");
    }

    console.log("Accounts received:", accounts);

    // Try to switch/add network (non-blocking)
    try {
      await handleNetworkSwitch();
      console.log("Network switch successful");
    } catch (networkError) {
      console.warn("Network switch failed, but continuing with connection:", networkError.message);
      // Don't throw here - allow connection even if network switch fails
    }

    const connectedAccount = accounts[0];
    console.log("Successfully connected to wallet:", connectedAccount);
    
    return connectedAccount;
  } catch (error) {
    console.error("Wallet connection error:", error);
    
    // Provide more specific error messages
    if (error.code === 4001) {
      throw new Error("Connection rejected by user. Please try again and approve the connection.");
    } else if (error.code === -32002) {
      throw new Error("Connection request already pending. Please check MetaMask.");
    } else if (error.message.includes("install MetaMask")) {
      throw error; // Pass through MetaMask installation errors
    } else {
      throw new Error(`Connection failed: ${error.message}`);
    }
  }
};

const fetchContract = (address, abi, signer) =>
  new ethers.Contract(address, abi, signer);

export const TOKEN_ICO_CONTRACT = async () => {
  try {
    const web3Modal = new Web3Modal();

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const ERC20 = async (ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const network = await provider.getNetwork();

    const signer = await provider.getSigner();

    const contract = fetchContract(ADDRESS, ERC20_ABI, signer);

    const userAddress = signer.getAddress();

    const balance = await contract.balanceOf(userAddress);

    const name = await contract.name();

    const symbol = await contract.symbol();

    const supply = await contract.totalSupply();

    const decimals = await contract.decimals();

    const address = await contract.address;

    const token = {
      address: address,
      name: name,
      symbol: symbol,
      decimals: decimals,
      supply: ethers.utils.formatEther(supply.toString()),
      balance: ethers.utils.formatEther(balance.toString()),
      chianId: network.chainId,
    };

    console.log(token);

    return token;
  } catch (error) {
    console.log(error);
  }
};

export const ERC20_CONTRACT = async (CONTRACT_ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const contract = fetchContract(CONTRACT_ADDRESS, ERC20_ABI, signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const GET_BALANCE = async () => {
  try {
    const web3Modal = new Web3Modal();

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const maticBal = await signer.getBalance();

    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};

export const CHECK_ACCOUNT_BALANCE = async (ADDRESS) => {
  try {
    const web3Modal = new Web3Modal();

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const maticBal = await provider.getBalance(ADDRESS);

    return ethers.utils.formatEther(maticBal.toString());
  } catch (error) {
    console.log(error);
  }
};

export const addTokenToMetamask = async () => {
  if (window.ethereum) {
    const tokenDetails = await ERC20(TOKEN_ADDRESS);

    const tokenDecimals = tokenDetails?.decimals;

    const tokenAddress = TOKEN_ADDRESS;

    const tokenSymbol = tokenDetails?.symbol;

    const tokenImage = "";

    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        return "Token added successfully!";
      } else {
        return "Token not added";
      }
    } catch (error) {
      return "Failed to add token";
    }
  } else {
    return "Metamask is not installed";
  }
};
