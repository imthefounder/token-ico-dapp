import React from 'react';
import { Header, Footer, About, BackToTop } from '../Components';

const LearnMore = () => {
  return (
    <>
      <div className="body_wrap">
        <Header />
        
        {/* Hero Section */}
        <section className="learn-more-hero" style={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          paddingTop: '80px'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)'
          }}></div>
          
          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <h1 style={{ 
                fontSize: '3.5rem', 
                marginBottom: '1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                About MINCHYN
              </h1>
              <p style={{ 
                fontSize: '1.4rem', 
                maxWidth: '800px', 
                margin: '0 auto',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                Discover the revolutionary NFT-based reward system that's changing the future of decentralized finance
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Additional Learn More Content */}
        <section style={{
          padding: '5rem 0',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
          position: 'relative'
        }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '2rem', 
                textAlign: 'center',
                background: 'linear-gradient(45deg, #ffffff, #a8edea, #fed6e3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                What is MINCHYN?
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
                <div>
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8', 
                    marginBottom: '1.5rem',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    MINCHYN is a revolutionary ERC-20 token that combines the power of NFTs with advanced tokenomics 
                    to create a unique reward ecosystem. Built on cutting-edge blockchain technology, MINCHYN offers 
                    holders the opportunity to earn passive rewards through our innovative NFT-based system.
                  </p>
                  
                  <p style={{ 
                    fontSize: '1.1rem', 
                    lineHeight: '1.8', 
                    marginBottom: '1.5rem',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}>
                    Our token features a deflationary mechanism with token burning, multi-chain compatibility, 
                    and a sophisticated reward structure that incentivizes long-term holding and community participation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section style={{
          padding: '5rem 0',
          background: 'linear-gradient(135deg, #16213e 0%, #0f0f23 50%, #1a1a2e 100%)'
        }}>
          <div className="container">
            <h2 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '3rem', 
              textAlign: 'center',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Key Features
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h3 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  🎨 NFT Rewards
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
                  Unique NFT-based reward system that provides holders with exclusive digital assets and passive income opportunities.
                </p>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h3 style={{ color: '#764ba2', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  🔥 Deflationary
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
                  Token burning mechanism that reduces supply over time, creating potential value appreciation for holders.
                </p>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h3 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  🌐 Multi-Chain
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
                  Cross-chain compatibility ensuring maximum accessibility and integration across different blockchain networks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section style={{
          padding: '5rem 0',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
        }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '2rem',
                background: 'linear-gradient(45deg, #a8edea, #fed6e3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Built on Cutting-Edge Technology
              </h2>
              
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                MINCHYN leverages the latest blockchain innovations to provide a secure, scalable, and efficient 
                token ecosystem. Our smart contracts are audited and optimized for gas efficiency while maintaining 
                the highest security standards.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                marginTop: '3rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem',
                    color: '#667eea'
                  }}>⚡</div>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Fast Transactions</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                    Optimized for quick and efficient transfers
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem',
                    color: '#764ba2'
                  }}>🔒</div>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Secure</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                    Audited smart contracts with robust security
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    marginBottom: '1rem',
                    color: '#667eea'
                  }}>💎</div>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Innovative</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                    Leading-edge NFT reward mechanics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default LearnMore;