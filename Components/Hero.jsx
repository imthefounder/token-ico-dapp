import React, { useState, useEffect, useContext } from "react";
import { TOKEN_ICO_Context } from "../context/index";

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  const {
    TOKEN_ICO,
    BUY_TOKEN,
    CONNECT_WALLET,
    account,
    loader,
    currency
  } = useContext(TOKEN_ICO_Context);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else if (prevTime.days > 0) {
          return { ...prevTime, days: prevTime.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      background: 'radial-gradient(circle at 30% 30%, rgba(102, 126, 234, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(245, 87, 108, 0.2) 0%, transparent 50%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
        borderRadius: '50%',
        animation: 'pulse 4s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, rgba(245, 87, 108, 0.1), rgba(240, 147, 251, 0.1))',
        borderRadius: '30%',
        animation: 'pulse 6s ease-in-out infinite'
      }}></div>

      <div className="container">
        <div className="grid grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
          {/* Left Column - Main Content */}
          <div className="animate-fadeInLeft">
            <div style={{ marginBottom: '1rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(102, 126, 234, 0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                color: 'var(--primary-color)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <span className="status-dot status-active"></span>
                ICO Live Now
              </span>
            </div>

            <h1 style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
              Join the Future with <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>$MINCHYN</span> Token
            </h1>

            <p style={{ 
              fontSize: '1.2rem', 
              marginBottom: '2rem',
              lineHeight: '1.6',
              color: 'var(--text-secondary)'
            }}>
              Revolutionary NFT-based reward system with advanced tokenomics. 
              Be part of the next generation of decentralized finance.
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              {account ? (
                <button 
                  className="btn btn-primary"
                  onClick={() => document.getElementById('purchase-section')?.scrollIntoView()}
                  style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem' }}
                >
                  Buy MINCHYN Now
                </button>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={CONNECT_WALLET}
                  disabled={loader}
                  style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem' }}
                >
                  {loader ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
              
              <button 
                className="btn btn-outline"
                onClick={() => document.getElementById('tokenomics')?.scrollIntoView()}
                style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem' }}
              >
                Learn More
              </button>
            </div>

            {/* Key Features */}
            <div className="grid grid-3" style={{ gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '0.5rem',
                  background: 'var(--primary-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>🎯</div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>NFT Rewards</h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8 }}>Earn through holdings</p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '0.5rem',
                  background: 'var(--secondary-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>🔥</div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>Deflationary</h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8 }}>Token burning mechanism</p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '0.5rem',
                  background: 'var(--success-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>⚡</div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>Multi-Chain</h4>
                <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8 }}>Cross-chain compatible</p>
              </div>
            </div>
          </div>

          {/* Right Column - ICO Stats & Countdown */}
          <div className="animate-fadeInUp">
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <h3 style={{ marginBottom: '2rem' }}>ICO Countdown</h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={index} style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    padding: '1rem 0.5rem',
                    borderRadius: 'var(--border-radius-sm)',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold',
                      background: 'var(--primary-gradient)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Token Price */}
              <div style={{ 
                background: 'rgba(245, 87, 108, 0.1)',
                padding: '1.5rem',
                borderRadius: 'var(--border-radius-sm)',
                marginBottom: '2rem',
                border: '1px solid rgba(245, 87, 108, 0.2)'
              }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                  Current Price
                </div>
                <div style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold',
                  background: 'var(--secondary-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  0.001 ETH
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                  per MINCHYN token
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  <span>ICO Progress</span>
                  <span>45%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '45%' }}></div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '0.8rem',
                  marginTop: '0.5rem',
                  opacity: 0.7
                }}>
                  <span>450,000 sold</span>
                  <span>1,000,000 total</span>
                </div>
              </div>

              {/* Contract Info */}
              <div style={{ 
                fontSize: '0.8rem', 
                opacity: 0.7,
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--border-radius-sm)',
                wordBreak: 'break-all'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>Contract Address:</div>
                <div style={{ color: 'var(--primary-color)' }}>
                  0x91738EE7A9b54eb810198cefF5549ca5982F47B3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
