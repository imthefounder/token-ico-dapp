import React from "react";

const About = () => {
  return (
    <section id="about" className="about-section" style={{
      padding: '8rem 0',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(245, 87, 108, 0.05) 100%)',
      position: 'relative'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>

      <div className="container">
        {/* Section Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '4rem',
          maxWidth: '800px',
          margin: '0 auto 4rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              color: 'var(--primary-color)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              marginBottom: '1rem'
            }}>
              About MINCHYN
            </span>
          </div>
          
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Revolutionizing NFT Rewards
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}>
            MINCHYN is pioneering the future of NFT-based reward systems with cutting-edge blockchain technology
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
          {/* Left Column - Mission & Vision */}
          <div className="animate-fadeInLeft">
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ 
                fontSize: '2rem', 
                marginBottom: '1.5rem',
                background: 'var(--secondary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Our Mission
              </h3>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                marginBottom: '2rem',
                color: 'var(--text-secondary)'
              }}>
                To bridge the gap between NFT ownership and tangible rewards, creating a sustainable 
                ecosystem where digital assets generate real value for their holders through innovative 
                tokenomics and community-driven governance.
              </p>

              <h4 style={{ 
                fontSize: '1.3rem', 
                marginBottom: '1rem',
                color: 'var(--primary-color)'
              }}>
                What Makes Us Different
              </h4>
              
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                fontSize: '1rem',
                lineHeight: '1.8'
              }}>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                    marginRight: '0.8rem', 
                    color: 'var(--primary-color)',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  NFT-based passive income generation
                </li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                    marginRight: '0.8rem', 
                    color: 'var(--primary-color)',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Deflationary tokenomics with burning mechanism
                </li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                    marginRight: '0.8rem', 
                    color: 'var(--primary-color)',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Multi-chain compatibility and scalability
                </li>
                <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                    marginRight: '0.8rem', 
                    color: 'var(--primary-color)',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Community governance and transparency
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Stats & Features */}
          <div className="animate-fadeInRight">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Stats Cards */}
              <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                <div className="glass-card" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    background: 'var(--primary-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                  }}>
                    10M+
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Total Token Supply
                  </div>
                </div>

                <div className="glass-card" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  background: 'rgba(245, 87, 108, 0.1)',
                  border: '1px solid rgba(245, 87, 108, 0.2)'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    background: 'var(--secondary-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                  }}>
                    24/7
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Reward Generation
                  </div>
                </div>

                <div className="glass-card" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    background: 'var(--success-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                  }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Decentralized
                  </div>
                </div>

                <div className="glass-card" style={{ 
                  padding: '2rem', 
                  textAlign: 'center',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.2)'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                  }}>
                    ∞
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Scalability
                  </div>
                </div>
              </div>

              {/* Vision Card */}
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem',
                  background: 'var(--primary-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Our Vision
                </h3>
                
                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.7',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem'
                }}>
                  We envision a future where NFT ownership transcends mere digital collectibles, 
                  creating a thriving economy of interconnected rewards, utilities, and opportunities 
                  for holders worldwide.
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  fontSize: '0.9rem',
                  opacity: 0.8
                }}>
                  <span>🎯 Innovation</span>
                  <span>🤝 Community</span>
                  <span>🔮 Future</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '5rem',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 'var(--border-radius)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ 
            fontSize: '2rem', 
            marginBottom: '1rem',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Join the MINCHYN Revolution
          </h3>
          
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Be part of the next generation of NFT rewards and help shape the future of decentralized finance.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => document.getElementById('purchase-section')?.scrollIntoView()}
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              Start Earning Now
            </button>
            
            <button 
              className="btn btn-outline"
              onClick={() => window.location.href = '/learn-more'}
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
