import React, { useState, useEffect } from "react";
import { getRecentTransfers, formatNumber, MINCHYN_TOKEN_ADDRESS } from "../Utils/minchyn-token";

const BlockchainActivity = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCount, setShowCount] = useState(10);

  const fetchTransfers = async () => {
    try {
      setLoading(true);
      const data = await getRecentTransfers(showCount);
      setTransfers(data);
    } catch (error) {
      console.error("Error fetching transfers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchTransfers, 60000);
    
    return () => clearInterval(interval);
  }, [showCount]);

  const formatAddress = (address) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const getEtherscanLink = (hash) => {
    return `https://etherscan.io/tx/${hash}`;
  };

  const getAddressLink = (address) => {
    return `https://etherscan.io/address/${address}`;
  };

  return (
    <section style={{
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 'bold'
          }}>
            🔗 Live Blockchain Activity
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Real-time MINCHYN token transfers on the Ethereum blockchain
          </p>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <label style={{ color: 'white' }}>Show:</label>
          <select
            value={showCount}
            onChange={(e) => setShowCount(Number(e.target.value))}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '0.5rem',
              borderRadius: '8px'
            }}
          >
            <option value={5}>5 transactions</option>
            <option value={10}>10 transactions</option>
            <option value={20}>20 transactions</option>
            <option value={50}>50 transactions</option>
          </select>
          
          <button
            onClick={fetchTransfers}
            disabled={loading}
            style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {loading ? '🔄 Loading...' : '🔄 Refresh'}
          </button>
        </div>

        {/* Activity Table */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflowX: 'auto'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔄</div>
              <p>Loading recent transactions...</p>
            </div>
          ) : transfers.length > 0 ? (
            <div style={{ minWidth: '800px' }}>
              {/* Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 120px 150px',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                marginBottom: '1rem',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                <div>From</div>
                <div>To</div>
                <div>Amount</div>
                <div>Block</div>
                <div>Time</div>
              </div>

              {/* Transactions */}
              {transfers.map((transfer, index) => (
                <div key={index} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 120px 150px',
                  gap: '1rem',
                  padding: '1rem',
                  background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.85rem',
                  alignItems: 'center'
                }}>
                  <div>
                    <a
                      href={getAddressLink(transfer.from)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#64b5f6',
                        textDecoration: 'none'
                      }}
                    >
                      {formatAddress(transfer.from)}
                    </a>
                  </div>
                  
                  <div>
                    <a
                      href={getAddressLink(transfer.to)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#81c784',
                        textDecoration: 'none'
                      }}
                    >
                      {formatAddress(transfer.to)}
                    </a>
                  </div>
                  
                  <div style={{ fontWeight: 'bold' }}>
                    {formatNumber(transfer.value)} MINCHYN
                  </div>
                  
                  <div>
                    <a
                      href={`https://etherscan.io/block/${transfer.blockNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#ffd700',
                        textDecoration: 'none'
                      }}
                    >
                      {transfer.blockNumber}
                    </a>
                  </div>
                  
                  <div style={{ fontSize: '0.8rem' }}>
                    {new Date(transfer.date).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
              <p>No recent transactions found</p>
            </div>
          )}
        </div>

        {/* Links */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          <a
            href={`https://etherscan.io/token/${MINCHYN_TOKEN_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(102, 126, 234, 0.3)'
            }}
          >
            📊 View on Etherscan
          </a>
          
          <a
            href={`https://etherscan.io/token/${MINCHYN_TOKEN_ADDRESS}#tokenAnalytics`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#764ba2',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              background: 'rgba(118, 75, 162, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(118, 75, 162, 0.3)'
            }}
          >
            📈 Token Analytics
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlockchainActivity;