# Multi-Wallet Integration Guide

## Current Implementation
- **MetaMask Only**: Currently supports MetaMask browser extension
- **Ethereum Mainnet**: Configured for Ethereum network
- **Basic Web3**: Uses `window.ethereum` for wallet detection

## Required Dependencies for Multi-Wallet Support

### 1. WalletConnect Integration
```bash
npm install @walletconnect/web3-provider @walletconnect/client
```

### 2. Coinbase Wallet
```bash
npm install @coinbase/wallet-sdk
```

### 3. Web3Modal (Universal Connector)
```bash
npm install web3modal
# Additional providers
npm install @walletconnect/web3-provider
npm install @coinbase/wallet-sdk
npm install fortmatic
npm install authereum
```

### 4. Wagmi (Recommended Modern Approach)
```bash
npm install wagmi viem @tanstack/react-query
npm install @wagmi/connectors
```

## Implementation Options

### Option 1: Web3Modal (Current Partial Implementation)
**Pros:**
- Already partially integrated
- Supports 20+ wallets
- Easy to implement
- Good UX with modal popup

**Cons:**
- Older technology
- Less TypeScript support
- Heavier bundle size

**Supported Wallets:**
- MetaMask
- WalletConnect (connects to 100+ mobile wallets)
- Coinbase Wallet
- Fortmatic
- Portis
- Authereum
- Torus
- Hardware wallets (Ledger, Trezor)

### Option 2: Wagmi + ConnectKit (Modern Recommended)
**Pros:**
- Modern React hooks
- Excellent TypeScript support
- Better performance
- Active development
- Built-in account management

**Cons:**
- Requires refactoring current code
- Learning curve
- Newer ecosystem

**Supported Wallets:**
- MetaMask
- WalletConnect v2
- Coinbase Wallet
- Rainbow
- Trust Wallet
- Ledger
- And many more

## Quick Implementation: Enhanced Web3Modal

### Step 1: Install Dependencies
```bash
npm install @walletconnect/web3-provider @coinbase/wallet-sdk
```

### Step 2: Configuration
```javascript
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "YOUR_INFURA_PROJECT_ID", // Required
      rpc: {
        1: "https://eth.llamarpc.com", // Ethereum Mainnet
      },
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "MINCHYN Token ICO",
      infuraId: "YOUR_INFURA_PROJECT_ID",
      rpc: "https://eth.llamarpc.com",
      chainId: 1,
      darkMode: true,
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
  theme: {
    background: "rgb(39, 49, 56)",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgb(16, 26, 32)",
  },
});
```

## Mobile Wallet Support

### WalletConnect Compatible Wallets:
- Trust Wallet
- Rainbow
- MetaMask Mobile
- Coinbase Wallet
- Argent
- Gnosis Safe
- 1inch Wallet
- Alpha Wallet
- Atomic Wallet
- Crypto.com DeFi Wallet
- Huobi Wallet
- imToken
- Loopring Wallet
- Math Wallet
- MyCrypto
- Pillar
- TokenPocket
- Unstoppable Wallet
- Zerion
- And 100+ more

## Hardware Wallet Support

### Supported Hardware Wallets:
- **Ledger**: Nano S, Nano X, Nano S Plus
- **Trezor**: Model T, Model One
- **KeepKey**: All models
- **GridPlus**: Lattice1

### Implementation with WalletConnect:
Hardware wallets work through WalletConnect when paired with mobile apps like:
- Ledger Live Mobile
- Trezor Suite Mobile

## Security Considerations

### Best Practices:
1. **Never store private keys** in frontend code
2. **Validate all transactions** on the smart contract level
3. **Use HTTPS** for all connections
4. **Implement rate limiting** for connection attempts
5. **Validate network** before executing transactions

### Risk Mitigation:
- Always show transaction details before signing
- Implement spending limits where possible
- Use multi-signature for high-value operations
- Regular security audits

## Quick Migration Path (Minimal Changes)

### 1. Enhance Current Web3Modal Setup
```javascript
// In constants.js
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const getWeb3Modal = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: "https://eth.llamarpc.com",
        },
      },
    },
  };

  return new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
    disableInjectedProvider: false,
  });
};
```

### 2. Update Connection Function
```javascript
export const CONNECT_MULTI_WALLET = async () => {
  try {
    const web3Modal = getWeb3Modal();
    const provider = await web3Modal.connect();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const address = await signer.getAddress();
    
    return { provider, address, signer };
  } catch (error) {
    throw new Error(`Wallet connection failed: ${error.message}`);
  }
};
```

## Cost Analysis

### Development Time:
- **Web3Modal Enhancement**: 2-4 hours
- **Full Wagmi Migration**: 1-2 days
- **Testing All Wallets**: 1 day

### Bundle Size Impact:
- **Web3Modal + Providers**: ~200-300KB additional
- **Wagmi**: ~150-200KB additional

### Maintenance:
- **Web3Modal**: Lower maintenance, mature
- **Wagmi**: Higher initial setup, but better long-term

## Recommendation

For immediate implementation with minimal changes:
1. **Enhance current Web3Modal** with WalletConnect support
2. **Add Coinbase Wallet** for broader compatibility
3. **Keep MetaMask** as primary option
4. **Consider Wagmi migration** for future major version

This approach provides 90% wallet coverage with minimal code changes.