import React, { useState, useEffect } from "react";
import { getTokenInfo, getUserTokenBalance, getRecentTransfers, formatNumber, MINCHYN_TOKEN_ADDRESS } from "../Utils/minchyn-token";
import { getCurrentGasPrice } from "../Utils/ugly-unicorns-nft";

const TokenInfo = ({ account }) => {
  const [tokenData, setTokenData] = useState({
    name: "Loading...",
    symbol: "Loading...",
    decimals: "18",
    totalSupply: "Loading...",
    contractAddress: MINCHYN_TOKEN_ADDRESS
  });
  const [userBalance, setUserBalance] = useState("0");
  const [recentTransfers, setRecentTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [gasData, setGasData] = useState(null);
  const [gasLoading, setGasLoading] = useState(true);

  // Fetch token data
  const fetchTokenData = async () => {
    try {
      setLoading(true);
      const data = await getTokenInfo();
      setTokenData(data);
      setLastUpdated(new Date());
      
      // If user is connected, get their balance
      if (account) {
        const balance = await getUserTokenBalance(account);
        setUserBalance(balance);
      }
      
      // Get recent transfers
      const transfers = await getRecentTransfers(5);
      setRecentTransfers(transfers);
      
    } catch (error) {
      console.error("Error fetching token data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch gas data
  const fetchGasData = async () => {
    try {
      setGasLoading(true);
      const gasInfo = await getCurrentGasPrice();
      setGasData(gasInfo);
    } catch (error) {
      console.error("Error fetching gas data:", error);
    } finally {
      setGasLoading(false);
    }
  };

  // Fetch data on component mount and when account changes
  useEffect(() => {
    fetchTokenData();
    fetchGasData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTokenData();
      fetchGasData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [account]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <section style={{
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: 'white',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            Real-Time Token Information
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.1rem'
          }}>
            Live data from the Ethereum blockchain
          </p>
          {lastUpdated && (
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.9rem',
              marginTop: '0.5rem'
            }}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Contract Information */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              📊 Contract Information
            </h3>
            
            <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Token Name:</strong> {tokenData.name}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Symbol:</strong> {tokenData.symbol}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Decimals:</strong> {tokenData.decimals}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Total Supply:</strong> {formatNumber(tokenData.totalSupply)} {tokenData.symbol}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Contract:</strong>
                <a
                  href={`https://etherscan.io/token/${tokenData.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    marginTop: '0.5rem',
                    fontSize: '0.9rem',
                    wordBreak: 'break-all',
                    color: '#667eea',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                    e.target.style.color = '#764ba2';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.color = '#667eea';
                  }}
                  title="View on Etherscan"
                >
                  {tokenData.contractAddress}
                </a>
              </div>
            </div>
            
            {tokenData.error && (
              <div style={{
                color: '#ffd700',
                fontSize: '0.9rem',
                marginTop: '1rem',
                padding: '0.5rem',
                background: 'rgba(255, 215, 0, 0.1)',
                borderRadius: '8px'
              }}>
                ⚠️ {tokenData.error}
              </div>
            )}
          </div>

          {/* Gas Fee Information */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              ⛽ Current Gas Fees
            </h3>
            
            {gasLoading ? (
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Loading gas data...
              </div>
            ) : gasData ? (
              <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Base Fee:</strong> {gasData.gasPrice} gwei
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Recommended Base Fee:</strong> {(parseFloat(gasData.gasPrice) * 2).toFixed(1)} gwei
                </div>
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontSize: '0.9rem' 
                }}>
                  Estimated transaction cost: ~{gasData.estimatedCost} ETH
                </div>
              </div>
            ) : (
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Gas data unavailable
              </div>
            )}
          </div>

          {/* User Balance (if connected) */}
          {account && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                💰 Your Balance
              </h3>
              
              <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Address:</strong>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    marginTop: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                  onClick={() => copyToClipboard(account)}
                  title="Click to copy"
                  >
                    {formatAddress(account)}
                  </div>
                </div>
                
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#ffd700'
                }}>
                  {formatNumber(userBalance)} {tokenData.symbol}
                </div>
              </div>
              
              <button
                onClick={fetchTokenData}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  fontSize: '0.9rem'
                }}
                disabled={loading}
              >
                {loading ? '🔄 Updating...' : '🔄 Refresh'}
              </button>
            </div>
          )}

          {/* Recent Activity */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            gridColumn: account ? 'auto' : 'span 2'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              🔥 Recent Activity
            </h3>
            
            {recentTransfers.length > 0 ? (
              <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {recentTransfers.map((transfer, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>From:</strong> {formatAddress(transfer.from)}
                      <strong style={{ marginLeft: '1rem' }}>To:</strong> {formatAddress(transfer.to)}
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Amount:</strong> {formatNumber(transfer.value)} {tokenData.symbol}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {transfer.date}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {loading ? 'Loading recent transfers...' : 'No recent transfers found'}
              </div>
            )}
            
            <div style={{ marginTop: '1rem' }}>
              <a
                href={`https://etherscan.io/token/${tokenData.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ffd700',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                🔗 View on Etherscan →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenInfo;
