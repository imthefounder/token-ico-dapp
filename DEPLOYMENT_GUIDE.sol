// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Deployment script example for MINCHYN ICO
// Use this with Hardhat, Truffle, or Remix

/*
DEPLOYMENT STEPS:

1. First, deploy the MinchynToken contract if you haven't already:
   - Constructor parameters: name, symbol, nftContract, totalSupply
   - Example: "MINCHYN", "MINCHYN", "0x0000000000000000000000000000000000000000", "1000000000000000000000000"

2. Deploy the TokenICO contract:
   - No constructor parameters needed

3. Configure the ICO contract:
   - Call updateToken(MINCHYN_TOKEN_ADDRESS)
   - Call updateTokenSalePrice(PRICE_IN_WEI) // e.g., 1000000000000000 for 0.001 ETH per token
   - Call setPurchaseLimits(MIN_TOKENS, MAX_TOKENS) // e.g., (1, 10000)
   - Call setTotalTokensForSale(TOTAL_TOKENS) // e.g., 500000000000000000000000 for 500,000 tokens

4. Transfer MINCHYN tokens to the ICO contract:
   - From MINCHYN token contract, call transfer(ICO_CONTRACT_ADDRESS, AMOUNT)
   - Or approve ICO contract and let it transfer

5. Activate the sale:
   - Call setSaleStatus(true)

IMPORTANT ADDRESSES TO UPDATE:

- Update constants.js with:
  - TOKEN_ADDRESS: Your deployed MINCHYN token address or existing 0x91738EE7A9b54eb810198cefF5549ca5982F47B3
  - CONTRACT_ADDRESS: Your deployed ICO contract address
  - OWNER_ADDRESS: Your wallet address

EXAMPLE DEPLOYMENT TRANSACTIONS:

1. Deploy TokenICO contract
2. TokenICO.updateToken("0x91738EE7A9b54eb810198cefF5549ca5982F47B3")
3. TokenICO.updateTokenSalePrice("1000000000000000") // 0.001 ETH per token
4. TokenICO.setPurchaseLimits(1, 10000) // Min 1, Max 10,000 tokens
5. TokenICO.setTotalTokensForSale("500000000000000000000000") // 500,000 tokens
6. Transfer tokens to ICO contract (if you own the MINCHYN token)
7. TokenICO.setSaleStatus(true)

TESTING TRANSACTIONS:

1. TokenICO.getTokenDetails() // Verify token info
2. TokenICO.getICODetails() // Check ICO status
3. TokenICO.buyToken(10) // Buy 10 tokens with correct ETH amount
4. Check token balance in buyer's wallet

GAS ESTIMATES:
- Contract deployment: ~2,000,000 gas
- Token purchase: ~100,000 gas
- Admin functions: ~50,000 gas each

Make sure to test everything on a testnet first!
*/