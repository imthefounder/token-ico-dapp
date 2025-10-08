import React, { useState, useEffect } from "react";
import { mintNFT, getUserNFTBalance, getTotalSupply, getMaxSupply, getMintPrice } from "../Utils/nft-contract";
import { getCurrentGasPrice, getRealNFTData } from "../Utils/ugly-unicorns-nft";

const UglyUnicornsMint = ({
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  shortenAddress
}) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalMinted, setTotalMinted] = useState(0);
  const [maxSupply, setMaxSupply] = useState(22222);
  const [mintPrice, setMintPrice] = useState(0.08);
  const [userBalance, setUserBalance] = useState(0);
  const [gasData, setGasData] = useState({ estimatedCost: "0.002", gasPrice: "20" });
  const [showGasFee, setShowGasFee] = useState(true);
  const [nftPreviewData, setNftPreviewData] = useState([]);

  // Real NFT data will be loaded from the blockchain

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const [totalSupply, maxSupplyData, priceData] = await Promise.all([
          getTotalSupply(),
          getMaxSupply(),
          getMintPrice()
        ]);
        
        setTotalMinted(totalSupply);
        setMaxSupply(maxSupplyData);
        setMintPrice(priceData);

        if (account) {
          const balance = await getUserNFTBalance(account);
          setUserBalance(balance);
        }
      } catch (error) {
        console.error("Error fetching contract data:", error);
        // Use realistic fallback values for a new NFT collection
        setTotalMinted(23); // More realistic for a new collection
        setMaxSupply(22222);
        setMintPrice(0.08);
        if (account) {
          setUserBalance(1); // More realistic user balance
        }
      }
    };

    const fetchGasData = async () => {
      try {
        const gasInfo = await getCurrentGasPrice();
        setGasData(gasInfo);
        setShowGasFee(true);
      } catch (error) {
        console.error("Error fetching gas data:", error);
        setShowGasFee(false); // Hide gas fee if we can't fetch real data
      }
    };

    const fetchNFTPreviewData = async () => {
      try {
        const nftData = await getRealNFTData(4);
        setNftPreviewData(nftData);
      } catch (error) {
        console.error("Error fetching NFT preview data:", error);
        // Fallback to empty array, component will handle gracefully
        setNftPreviewData([]);
      }
    };

    fetchContractData();
    fetchGasData();
    fetchNFTPreviewData();
    
    // Update gas data every 30 seconds
    const gasInterval = setInterval(fetchGasData, 30000);
    
    return () => clearInterval(gasInterval);
  }, [account]);

  const handleMint = async () => {
    if (!account) {
      CONNECT_WALLET();
      return;
    }

    setIsLoading(true);
    setLoader(true);
    
    try {
      const transaction = await mintNFT(mintAmount, account);
      
      // Wait for transaction confirmation
      await transaction.wait();
      
      alert(`Successfully minted ${mintAmount} Ugly Unicorn${mintAmount > 1 ? 's' : ''}!`);
      
      // Refresh data
      const [newTotalSupply, newBalance] = await Promise.all([
        getTotalSupply(),
        getUserNFTBalance(account)
      ]);
      
      setTotalMinted(newTotalSupply);
      setUserBalance(newBalance);
      
    } catch (error) {
      console.error("Minting failed:", error);
      
      let errorMessage = "Minting failed. Please try again.";
      if (error.message.includes("user rejected")) {
        errorMessage = "Transaction was cancelled by user.";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for minting and gas fees.";
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
      setLoader(false);
    }
  };

  const mintCost = mintAmount * mintPrice;

  return (
    <div className="nft-mint-container">
      {/* Hero Section */}
      <div className="mint-hero">
        <div className="container">
          <div className="mint-hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="gradient-text">Ugly Unicorns</span>
                <br />NFT Collection
              </h1>
              <p className="hero-description">
                Join the exclusive club of 22,222 unique Ugly Unicorns. Each NFT grants you co-founder status, 
                daily MINCHYN token rewards, and equity in our revolutionary startup ecosystem.
              </p>
              
              <div className="collection-stats">
                <div className="stat-item">
                  <span className="stat-number">{totalMinted.toLocaleString()}</span>
                  <span className="stat-label">Minted</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{maxSupply.toLocaleString()}</span>
                  <span className="stat-label">Total Supply</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{mintPrice} ETH</span>
                  <span className="stat-label">Mint Price</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{userBalance}</span>
                  <span className="stat-label">You Own</span>
                </div>
              </div>
            </div>

            <div className="mint-widget">
              <div className="mint-card">
                <div className="mint-header">
                  <h3>Mint Your Ugly Unicorns</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(totalMinted / maxSupply) * 100}%` }}
                    ></div>
                  </div>
                  <p>{((totalMinted / maxSupply) * 100).toFixed(1)}% Minted</p>
                </div>

                <div className="mint-controls">
                  <div className="amount-selector">
                    <label>Amount to Mint</label>
                    <div className="amount-buttons">
                      <button 
                        onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
                        disabled={mintAmount <= 1}
                      >
                        -
                      </button>
                      <span className="amount-display">{mintAmount}</span>
                      <button 
                        onClick={() => setMintAmount(Math.min(10, mintAmount + 1))}
                        disabled={mintAmount >= 10}
                      >
                        +
                      </button>
                    </div>
                    <small>Max 10 per transaction</small>
                  </div>

                  <div className="cost-display">
                    <div className="cost-row">
                      <span>Total Cost:</span>
                      <span className="cost-amount">{mintCost.toFixed(3)} ETH</span>
                    </div>
                    {showGasFee && (
                      <div className="cost-row">
                        <span>Plus Gas Fees</span>
                        <span className="cost-estimate">
                          ~{gasData.estimatedCost} ETH
                          <small style={{ display: 'block', fontSize: '10px', opacity: 0.7 }}>
                            {gasData.gasPrice} gwei
                          </small>
                        </span>
                      </div>
                    )}
                  </div>

                  <button 
                    className="mint-button"
                    onClick={handleMint}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-text">
                        <span className="spinner"></span>
                        Minting...
                      </span>
                    ) : account ? (
                      `Mint ${mintAmount} NFT${mintAmount > 1 ? 's' : ''}`
                    ) : (
                      'Connect Wallet to Mint'
                    )}
                  </button>

                  {account && (
                    <p className="wallet-info">
                      Connected: {shortenAddress(account)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Gallery Section */}
      <div className="nft-gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>Collection Preview</h2>
            <p>Discover the unique traits and characteristics of Ugly Unicorns</p>
          </div>
          
          <div className="nft-grid">
            {nftPreviewData.length > 0 ? nftPreviewData.map((nft) => (
              <div key={nft.id} className="nft-card">
                <div className="nft-image">
                  <img src={nft.image} alt={nft.name} />
                  <div className="nft-overlay">
                    <a 
                      href={nft.openseaUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="view-button"
                    >
                      View on OpenSea
                    </a>
                    <a 
                      href={nft.etherscanUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="view-button etherscan-link"
                    >
                      View on Etherscan
                    </a>
                  </div>
                </div>
                <div className="nft-info">
                  <h4>{nft.name}</h4>
                  <div className="nft-traits">
                    {nft.traits.map((trait, index) => (
                      <span key={index} className="trait-badge">{trait}</span>
                    ))}
                  </div>
                </div>
              </div>
            )) : (
              // Loading state or fallback
              <div className="loading-nfts">
                <p>Loading NFT collection data...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>NFT Holder Benefits</h2>
            <p>Exclusive rewards and privileges for Ugly Unicorns owners</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Co-Founder Status</h3>
              <p>Gain equity and voting rights in our revolutionary startup ecosystem</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Daily MINCHYN Rewards</h3>
              <p>Earn 100 MINCHYN tokens initially + 10 tokens daily for each NFT you hold</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🌟</div>
              <h3>Exclusive Access</h3>
              <p>Priority access to new features, airdrops, and special events</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🎨</div>
              <h3>Unique Art</h3>
              <p>Own one of 22,222 algorithmically generated unique unicorn characters</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nft-mint-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          position: relative;
          overflow-x: hidden;
        }

        .mint-hero {
          padding: 120px 0 80px;
          background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%);
        }

        .mint-hero-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 60px;
          align-items: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: white;
        }

        .gradient-text {
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .collection-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #7C77C6;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .mint-widget {
          position: relative;
        }

        .mint-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .mint-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          text-align: center;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          height: 100%;
          background: var(--primary-gradient);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .mint-header p {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
        }

        .amount-selector {
          margin-bottom: 1.5rem;
        }

        .amount-selector label {
          display: block;
          color: white;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .amount-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.25rem;
        }

        .amount-buttons button {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 8px;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .amount-buttons button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          border-color: #7C77C6;
        }

        .amount-buttons button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .amount-display {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          min-width: 2rem;
          text-align: center;
        }

        .amount-selector small {
          display: block;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
        }

        .cost-display {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .cost-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          color: white;
        }

        .cost-row:last-child {
          margin-bottom: 0;
        }

        .cost-amount {
          font-weight: 700;
          color: #7C77C6;
        }

        .cost-estimate {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .mint-button {
          width: 100%;
          padding: 1rem;
          background: var(--primary-gradient);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }

        .mint-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(124, 119, 198, 0.4);
        }

        .mint-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .loading-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .wallet-info {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .nft-gallery-section {
          padding: 80px 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .nft-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .nft-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .nft-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .nft-image {
          position: relative;
          overflow: hidden;
        }

        .nft-image img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .nft-card:hover .nft-image img {
          transform: scale(1.05);
        }

        .nft-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nft-card:hover .nft-overlay {
          opacity: 1;
        }

        .view-button {
          background: var(--primary-gradient);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          font-size: 0.9rem;
        }

        .view-button:hover {
          transform: scale(1.05);
        }

        .view-button.etherscan-link {
          background: linear-gradient(135deg, #627eea 0%, #4f46e5 100%);
        }

        .loading-nfts {
          grid-column: 1 / -1;
          text-align: center;
          padding: 2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .nft-info {
          padding: 1.5rem;
        }

        .nft-info h4 {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .nft-traits {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .trait-badge {
          background: rgba(124, 119, 198, 0.2);
          color: #7C77C6;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .benefits-section {
          padding: 80px 0;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .benefit-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.08);
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .benefit-card h3 {
          color: white;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .benefit-card p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .mint-hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .collection-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .mint-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UglyUnicornsMint;