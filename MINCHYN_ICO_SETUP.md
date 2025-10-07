# MINCHYN Token ICO Platform Setup Guide

## Overview
This ICO platform has been configured to work with your $MINCHYN token (0x91738EE7A9b54eb810198cefF5549ca5982F47B3). The platform allows users to purchase MINCHYN tokens using ETH through a smart contract interface.

## What Has Been Updated

### 1. Smart Contracts
- **MinchynToken.sol**: Created a new token contract based on your MINCHYN token with ICO compatibility
- **TokenICO.sol**: Enhanced the existing ICO contract with:
  - Sale status management (active/inactive)
  - Purchase limits (min/max per transaction)
  - Better error handling
  - Event emissions for transparency
  - Enhanced token management

### 2. Frontend Configuration
- **constants.js**: Updated with MINCHYN token address (0x91738EE7A9b54eb810198cefF5549ca5982F47B3)
- **MinchynERC20.json**: New ABI file for MINCHYN token functionality
- Updated imports to use the correct MINCHYN token ABI

### 3. Key Features Added
- **Sale Management**: Admin can start/stop token sale
- **Purchase Limits**: Configurable minimum and maximum purchase amounts
- **Token Withdrawal**: Owner can withdraw unsold tokens
- **Progress Tracking**: Track total tokens sold
- **Enhanced Security**: Better validation and error handling

## Deployment Steps

### 1. Deploy the ICO Contract
First, you'll need to deploy the updated TokenICO contract:

```bash
# Install dependencies first
npm install

# Deploy to your preferred network (example for Sepolia testnet)
# You'll need to use Hardhat, Truffle, or Remix for deployment
```

### 2. Configure the ICO Contract
After deployment, you'll need to:

1. **Set the token address**: Call `updateToken()` with your MINCHYN token address
2. **Set the token price**: Call `updateTokenSalePrice()` with your desired price per token
3. **Set purchase limits**: Call `setPurchaseLimits()` with min/max amounts
4. **Transfer MINCHYN tokens**: Send tokens to the ICO contract for sale
5. **Activate sale**: Call `setSaleStatus(true)` to start the ICO

### 3. Update Frontend Configuration
Update the `CONTRACT_ADDRESS` in `constants.js` with your deployed ICO contract address:

```javascript
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_ICO_CONTRACT_ADDRESS";
```

### 4. Configure Token Sale Parameters
You can customize these parameters in your ICO contract:

- **Token Price**: Price per token in wei (e.g., 0.001 ETH = 1000000000000000 wei)
- **Min Purchase**: Minimum tokens per transaction (default: 1)
- **Max Purchase**: Maximum tokens per transaction (default: 10,000)
- **Total Tokens for Sale**: Set how many tokens are available for the ICO

## Important Contract Functions

### Owner Functions (Admin Only)
- `updateToken(address)`: Set the MINCHYN token contract address
- `updateTokenSalePrice(uint256)`: Set price per token in wei
- `setSaleStatus(bool)`: Start/stop the token sale
- `setPurchaseLimits(uint256 min, uint256 max)`: Set purchase limits
- `setTotalTokensForSale(uint256)`: Set total tokens available
- `withdrawAllTokens()`: Withdraw unsold tokens to owner

### Public Functions
- `buyToken(uint256)`: Purchase tokens (requires exact ETH amount)
- `getTokenDetails()`: Get token information
- `getICODetails()`: Get ICO status and statistics

## Security Considerations

1. **Token Transfer**: Ensure your MINCHYN token contract allows the ICO contract to transfer tokens
2. **Owner Address**: Update the `OWNER_ADDRESS` in constants.js to your wallet address
3. **Price Calculation**: Verify the token price calculation matches your expectations
4. **Sale Limits**: Set appropriate minimum and maximum purchase limits

## Testing Checklist

Before going live:

1. ✅ Deploy ICO contract to testnet
2. ✅ Transfer test MINCHYN tokens to ICO contract
3. ✅ Set appropriate token price
4. ✅ Test token purchase with small amount
5. ✅ Verify tokens are received correctly
6. ✅ Test admin functions (start/stop sale, withdraw)
7. ✅ Test frontend integration

## Network Configuration

The platform supports multiple networks:
- Ethereum Mainnet
- Sepolia Testnet
- Holesky Testnet
- Polygon Amoy

Update the network configuration in `constants.js` if needed.

## MINCHYN Token Features

Your token includes these special features:
- **Reward System**: NFT-based token rewards
- **Burn Mechanism**: Token burning functionality
- **Role-based Access**: Minter, burner, and admin roles
- **Secondary Contracts**: Support for additional reward contracts

## Support and Customization

To customize the platform further:
- Update component files in `/Components/` for UI changes
- Modify styling in `/styles/` and `/public/assets/`
- Add custom functionality in the context provider
- Enhance smart contract features as needed

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Important Notes

1. Always test on testnet before mainnet deployment
2. Ensure you have sufficient ETH for gas fees
3. Keep your private keys secure
4. Consider getting a smart contract audit for mainnet deployment
5. Make sure to comply with your local regulations regarding token sales

For additional support or customization, please refer to the Next.js and Ethereum development documentation.