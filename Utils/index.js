export const convertTime = () => {
  const date = new Date(time);

  const formattedDate = `${date.toLocaleDateString} ${date.toLocaleTimeString}`;

  return formattedDate;
};

export const shortenAddress = (address) =>
  `${address?.slice(0, 4)}... ${address?.slice(address.length - 4)}`;

// Error parsing utility for transaction errors
export const parseTransactionError = (error) => {
  const errorMessage = error?.message || error?.toString() || '';
  const errorCode = error?.code;
  
  console.log('Transaction error:', error);
  
  // Check for user rejection
  if (errorMessage.includes('user rejected') || 
      errorMessage.includes('User denied') ||
      errorMessage.includes('rejected') ||
      errorCode === 4001) {
    return "Transaction was cancelled by user.";
  }
  
  // Check for insufficient funds
  if (errorMessage.includes('insufficient funds') ||
      errorMessage.includes('Insufficient funds') ||
      errorMessage.includes('insufficient balance') ||
      errorMessage.includes('not enough balance')) {
    return "Insufficient funds to complete transaction. Please ensure you have enough ETH for the purchase amount plus gas fees.";
  }
  
  // Check for network issues
  if (errorMessage.includes('network') ||
      errorMessage.includes('Network') ||
      errorMessage.includes('connection') ||
      errorMessage.includes('timeout')) {
    return "Network connection issue. Please check your internet connection and try again.";
  }
  
  // Check for gas estimation errors
  if (errorMessage.includes('gas') ||
      errorMessage.includes('Gas') ||
      errorMessage.includes('out of gas')) {
    return "Transaction failed due to gas issues. Please try increasing the gas limit or check your wallet settings.";
  }
  
  // Check for contract-specific errors
  if (errorMessage.includes('execution reverted') ||
      errorMessage.includes('reverted')) {
    if (errorMessage.includes('Insufficient funds sent')) {
      return "Insufficient funds sent to the contract. Please ensure you're sending enough ETH for your token purchase.";
    }
    return "Transaction was rejected by the smart contract. Please check the transaction details and try again.";
  }
  
  // Check for wallet connection issues
  if (errorMessage.includes('wallet') ||
      errorMessage.includes('provider') ||
      errorMessage.includes('ethereum')) {
    return "Wallet connection issue. Please ensure your wallet is connected and try again.";
  }
  
  // Generic fallback with more helpful message
  return "Transaction failed. Please check your wallet balance, network connection, and try again. If the problem persists, contact support.";
};

// Export MINCHYN token utilities
export * from './minchyn-token';
export * from './nft-contract';
export * from './ugly-unicorns-nft';
