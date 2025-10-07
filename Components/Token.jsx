import React, { useState, useEffect } from "react";
import { getCurrentGasPrice } from "../Utils/ugly-unicorns-nft";

const Token = () => {
  const [gasData, setGasData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGasData = async () => {
      try {
        const gasInfo = await getCurrentGasPrice();
        setGasData(gasInfo);
      } catch (error) {
        console.error("Error fetching gas data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGasData();
    // Update gas data every 30 seconds
    const interval = setInterval(fetchGasData, 30000);
    
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="tokenomics" className="tokenomics-section" style={{
      padding: '8rem 0',
      background: 'linear-gradient(135deg, rgba(245, 87, 108, 0.05) 0%, rgba(102, 126, 234, 0.05) 100%)',
      position: 'relative'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(245, 87, 108, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 8s ease-in-out infinite'
      }}></div>

      <div className="container">
        {/* Section Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '5rem',
          maxWidth: '800px',
          margin: '0 auto 5rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(245, 87, 108, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              color: '#f5576c',
              border: '1px solid rgba(245, 87, 108, 0.2)',
              marginBottom: '1rem'
            }}>
              Tokenomics
            </span>
          </div>
          
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem',
            background: 'var(--secondary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            $MINCHYN Token Economics
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}>
            Discover the advanced tokenomics driving sustainable growth and rewards
          </p>
        </div>

        {/* Token Distribution */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ 
            fontSize: '2.2rem', 
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Token Distribution
          </h3>
          
          <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
            {/* Distribution Chart Visualization */}
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ 
                width: '300px', 
                height: '300px', 
                margin: '0 auto',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Simulated Pie Chart */}
                <div style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: `conic-gradient(
                    #667eea 0deg 144deg,
                    #f5576c 144deg 216deg,
                    #10b981 216deg 288deg,
                    #f59e0b 288deg 324deg,
                    #8b5cf6 324deg 360deg
                  )`,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '150px',
                    height: '150px',
                    background: 'var(--background-primary)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold',
                      background: 'var(--primary-gradient)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      10M
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      Total Supply
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution Details */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: 'ICO Sale', percentage: '40%', amount: '400M MINCHYN', color: '#667eea' },
                  { label: 'Liquidity Pool', percentage: '20%', amount: '200M MINCHYN', color: '#f5576c' },
                  { label: 'Rewards Pool', percentage: '20%', amount: '200M MINCHYN', color: '#10b981' },
                  { label: 'Team & Development', percentage: '10%', amount: '100M MINCHYN', color: '#f59e0b' },
                  { label: 'Marketing & Partnerships', percentage: '10%', amount: '100M MINCHYN', color: '#8b5cf6' }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: item.color,
                      borderRadius: '50%',
                      marginRight: '1rem'
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.amount}</div>
                    </div>
                    <div style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold',
                      color: item.color
                    }}>
                      {item.percentage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Token Features Grid */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ 
            fontSize: '2.2rem', 
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'var(--secondary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Token Features
          </h3>
          
          <div className="grid grid-3" style={{ gap: '2rem' }}>
            {[
              {
                icon: '🦄',
                title: 'Ugly Unicorns Rewards',
                description: 'Earn MINCHYN tokens exclusively through Ugly Unicorns NFT holdings - the ONLY collection with reward access!',
                gradient: 'var(--primary-gradient)'
              },
              {
                icon: '🔥',
                title: 'Burn Mechanism',
                description: 'Deflationary tokenomics with controlled burning to maintain value',
                gradient: 'var(--secondary-gradient)'
              },
              {
                icon: '👑',
                title: 'Role-Based Access',
                description: 'Advanced permission system with minter, burner, and admin roles',
                gradient: 'var(--success-gradient)'
              },
              {
                icon: '🔗',
                title: 'Multi-Contract Support',
                description: 'Integration with multiple secondary contracts for enhanced rewards',
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
              },
              {
                icon: '💎',
                title: 'ERC-20 Standard',
                description: 'Fully compliant ERC-20 token with extended functionality',
                gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'
              },
              {
                icon: '📈',
                title: 'Growth Potential',
                description: 'Built for long-term value appreciation and ecosystem expansion',
                gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card" style={{ 
                padding: '2.5rem',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem',
                  background: feature.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {feature.icon}
                </div>
                <h4 style={{ 
                  fontSize: '1.3rem', 
                  marginBottom: '1rem',
                  background: feature.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {feature.title}
                </h4>
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reward Mechanics */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ 
            fontSize: '2.2rem', 
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Reward Mechanics
          </h3>
          
          <div className="grid grid-2" style={{ gap: '3rem' }}>
            <div className="glass-card" style={{ 
              padding: '3rem',
              background: 'rgba(102, 126, 234, 0.1)',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h4 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '1.5rem',
                color: 'var(--primary-color)'
              }}>
                Primary Rewards
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Initial Bonus:</strong> 100 MINCHYN per NFT
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Daily Rate:</strong> 10 MINCHYN per NFT per day
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Automatic Calculation:</strong> Real-time accumulation
                </li>
                <li>
                  <strong>Flexible Claiming:</strong> Claim anytime
                </li>
              </ul>
            </div>

            <div className="glass-card" style={{ 
              padding: '3rem',
              background: 'rgba(245, 87, 108, 0.1)',
              border: '1px solid rgba(245, 87, 108, 0.2)'
            }}>
              <h4 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '1.5rem',
                color: '#f5576c'
              }}>
                Secondary Rewards
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Partner NFTs:</strong> Additional contract support
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Bonus Rate:</strong> 5 MINCHYN per secondary NFT per day
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <strong>Multiple Collections:</strong> Stack rewards
                </li>
                <li>
                  <strong>Growing Network:</strong> More partners coming
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contract Information */}
        <div className="glass-card" style={{ 
          padding: '3rem',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ 
            fontSize: '2rem', 
            marginBottom: '2rem',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Contract Information
          </h3>
          
          <div className="grid grid-2" style={{ gap: '2rem', textAlign: 'left' }}>
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--primary-color)' }}>Token Name:</strong> MINCHYN
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--primary-color)' }}>Symbol:</strong> $MINCHYN
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--primary-color)' }}>Decimals:</strong> 18
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--primary-color)' }}>Total Supply:</strong> 1,000,000,000 MINCHYN
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--primary-color)' }}>Network:</strong> Ethereum Mainnet
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--primary-color)' }}>Standard:</strong> ERC-20
              </div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 'var(--border-radius-sm)',
            wordBreak: 'break-all'
          }}>
            <strong style={{ color: 'var(--primary-color)' }}>Contract Address:</strong><br />
            <a 
              href="https://etherscan.io/token/0x91738EE7A9b54eb810198cefF5549ca5982F47B3"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: '#667eea', 
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#764ba2'}
              onMouseLeave={(e) => e.target.style.color = '#667eea'}
            >
              0x91738EE7A9b54eb810198cefF5549ca5982F47B3
            </a>
          </div>

          {/* Gas Fee Information */}
          <div style={{ 
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 'var(--border-radius-sm)'
          }}>
            <strong style={{ color: 'var(--primary-color)' }}>Current Gas Fees:</strong>
            {loading ? (
              <div style={{ marginTop: '1rem', color: 'var(--text-primary)' }}>
                Loading gas data...
              </div>
            ) : gasData ? (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  <strong>Base Fee:</strong> {gasData.gasPrice} gwei
                </div>
                <div style={{ color: 'var(--text-primary)' }}>
                  <strong>Recommended Base Fee:</strong> {(parseFloat(gasData.gasPrice) * 2).toFixed(1)} gwei
                </div>
                <div style={{ 
                  marginTop: '0.5rem', 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontSize: '0.9rem' 
                }}>
                  Estimated transaction cost: ~{gasData.estimatedCost} ETH
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                Gas data unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Token;
