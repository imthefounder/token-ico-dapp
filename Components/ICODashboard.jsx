import React, { useState, useContext, useEffect } from "react";
import { TOKEN_ICO_Context } from "../context/index";

const ICODashboard = () => {
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    TOKEN_ICO,
    BUY_TOKEN,
    CONNECT_WALLET,
    account,
    loader,
    currency,
    addTokenToMetamask,
    TOKEN_ADDRESS
  } = useContext(TOKEN_ICO_Context);

  const [icoData, setIcoData] = useState({
    tokenName: "MINCHYN",
    tokenSymbol: "$MINCHYN",
    tokenPrice: "0.001",
    totalSupply: "1000000",
    tokensSold: "450000",
    balance: "0",
    saleActive: true
  });

  // Calculate ETH amount when token amount changes
  useEffect(() => {
    if (purchaseAmount && !isNaN(purchaseAmount)) {
      const ethNeeded = (parseFloat(purchaseAmount) * parseFloat(icoData.tokenPrice)).toFixed(6);
      setEthAmount(ethNeeded);
    } else {
      setEthAmount("");
    }
  }, [purchaseAmount, icoData.tokenPrice]);

  // Calculate token amount when ETH amount changes
  const handleEthAmountChange = (value) => {
    setEthAmount(value);
    if (value && !isNaN(value)) {
      const tokensToReceive = (parseFloat(value) / parseFloat(icoData.tokenPrice)).toFixed(0);
      setPurchaseAmount(tokensToReceive);
    } else {
      setPurchaseAmount("");
    }
  };

  const handlePurchase = async () => {
    if (!account) {
      await CONNECT_WALLET();
      return;
    }

    if (!purchaseAmount || parseFloat(purchaseAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      await BUY_TOKEN(purchaseAmount);
      setPurchaseAmount("");
      setEthAmount("");
      // Refresh ICO data here if needed
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const addToMetaMask = async () => {
    try {
      await addTokenToMetamask();
    } catch (error) {
      console.error("Failed to add token to MetaMask:", error);
    }
  };

  const progressPercentage = ((parseFloat(icoData.tokensSold) / parseFloat(icoData.totalSupply)) * 100).toFixed(1);

  return (
    <section id="purchase-section" style={{ padding: '5rem 0', background: 'rgba(255, 255, 255, 0.02)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>MINCHYN Token Sale</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Secure your MINCHYN tokens now and join the revolutionary DeFi ecosystem
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
          {/* Purchase Interface */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
              Purchase MINCHYN Tokens
            </h3>

            {!account ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦊</div>
                <h4 style={{ marginBottom: '1rem' }}>Connect Your Wallet</h4>
                <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
                  Connect your MetaMask wallet to participate in the MINCHYN token sale
                </p>
                <button 
                  className="btn btn-primary w-full"
                  onClick={CONNECT_WALLET}
                  disabled={loader}
                  style={{ fontSize: '1.1rem', padding: '1rem' }}
                >
                  {loader ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderLeft: '2px solid white' }}></div>
                      Connecting...
                    </div>
                  ) : (
                    'Connect MetaMask'
                  )}
                </button>
              </div>
            ) : (
              <>
                {/* Wallet Info */}
                <div style={{ 
                  background: 'rgba(102, 126, 234, 0.1)',
                  padding: '1rem',
                  borderRadius: 'var(--border-radius-sm)',
                  marginBottom: '2rem',
                  border: '1px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Connected Wallet</div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        {account.slice(0, 6)}...{account.slice(-4)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Balance</div>
                      <div style={{ fontWeight: 'bold' }}>{currency} ETH</div>
                    </div>
                  </div>
                </div>

                {/* Purchase Form */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    Amount to Purchase (MINCHYN)
                  </label>
                  <input
                    type="number"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(e.target.value)}
                    placeholder="Enter amount of tokens"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: 'var(--border-radius-sm)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '1.1rem',
                      marginBottom: '1rem'
                    }}
                  />
                  
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    ETH Required
                  </label>
                  <input
                    type="number"
                    value={ethAmount}
                    onChange={(e) => handleEthAmountChange(e.target.value)}
                    placeholder="ETH amount"
                    step="0.000001"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: 'var(--border-radius-sm)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      fontSize: '1.1rem'
                    }}
                  />
                </div>

                {/* Purchase Summary */}
                {purchaseAmount && ethAmount && (
                  <div style={{
                    background: 'rgba(245, 87, 108, 0.1)',
                    padding: '1.5rem',
                    borderRadius: 'var(--border-radius-sm)',
                    marginBottom: '2rem',
                    border: '1px solid rgba(245, 87, 108, 0.2)'
                  }}>
                    <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Purchase Summary</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>Tokens:</span>
                      <span style={{ fontWeight: 'bold' }}>{Number(purchaseAmount).toLocaleString()} MINCHYN</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>Price per token:</span>
                      <span>{icoData.tokenPrice} ETH</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      <span>Total Cost:</span>
                      <span style={{ color: 'var(--accent-color)' }}>{ethAmount} ETH</span>
                    </div>
                  </div>
                )}

                {/* Purchase Button */}
                <button
                  className="btn btn-secondary w-full"
                  onClick={handlePurchase}
                  disabled={isLoading || !purchaseAmount || !ethAmount || parseFloat(ethAmount) <= 0}
                  style={{ 
                    fontSize: '1.1rem', 
                    padding: '1.2rem',
                    opacity: (!purchaseAmount || !ethAmount || parseFloat(ethAmount) <= 0) ? 0.5 : 1
                  }}
                >
                  {isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderLeft: '2px solid white' }}></div>
                      Processing...
                    </div>
                  ) : (
                    `Buy ${purchaseAmount || '0'} MINCHYN Tokens`
                  )}
                </button>

                {/* Add to MetaMask */}
                <button
                  className="btn btn-outline w-full"
                  onClick={addToMetaMask}
                  style={{ marginTop: '1rem', fontSize: '0.9rem' }}
                >
                  Add MINCHYN to MetaMask
                </button>
              </>
            )}
          </div>

          {/* ICO Statistics */}
          <div>
            {/* Sale Progress */}
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '2rem' }}>Sale Progress</h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '1rem',
                  fontSize: '1.1rem'
                }}>
                  <span>Tokens Sold</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {Number(icoData.tokensSold).toLocaleString()} / {Number(icoData.totalSupply).toLocaleString()}
                  </span>
                </div>
                
                <div className="progress-bar" style={{ height: '15px' }}>
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginTop: '0.5rem',
                  fontSize: '0.9rem',
                  opacity: 0.8
                }}>
                  <span>{progressPercentage}% Complete</span>
                  <span>{(parseFloat(icoData.totalSupply) - parseFloat(icoData.tokensSold)).toLocaleString()} remaining</span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-2" style={{ gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--border-radius-sm)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    {icoData.tokenPrice} ETH
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Current Price</div>
                </div>
                
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--border-radius-sm)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                    18
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Decimals</div>
                </div>
              </div>
            </div>

            {/* Token Information */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '2rem' }}>Token Information</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ opacity: 0.8 }}>Name:</span>
                  <span style={{ fontWeight: 'bold' }}>{icoData.tokenName}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ opacity: 0.8 }}>Symbol:</span>
                  <span style={{ fontWeight: 'bold' }}>{icoData.tokenSymbol}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ opacity: 0.8 }}>Network:</span>
                  <span style={{ fontWeight: 'bold' }}>Ethereum</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ opacity: 0.8 }}>Status:</span>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: icoData.saleActive ? 'var(--success-color)' : 'var(--error-color)'
                  }}>
                    <span className={`status-dot ${icoData.saleActive ? 'status-active' : 'status-inactive'}`}></span>
                    {icoData.saleActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div style={{ 
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ marginBottom: '0.5rem', opacity: 0.8 }}>Contract Address:</div>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    wordBreak: 'break-all',
                    color: 'var(--primary-color)'
                  }}>
                    {TOKEN_ADDRESS}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ICODashboard;