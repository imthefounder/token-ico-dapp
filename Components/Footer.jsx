import React from "react";

const Footer = () => {
  const socialLinks = [
    { name: "Discord", url: "https://discord.gg/hyY6ve7k", icon: "💬" },
    { name: "Twitter", url: "https://twitter.com/minchyn", icon: "🐦" },
    { name: "Telegram", url: "https://t.me/minchyn", icon: "📱" },
    { name: "GitHub", url: "https://github.com/minchyn", icon: "🔗" }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Tokenomics", href: "#tokenomics" },
    // { name: "Team", href: "#team" }, // Hidden as requested
    { name: "FAQ", href: "#faq" },
    { name: "Learn More", href: "/learn-more" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" }
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(25, 25, 55, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '5rem 0 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 8s ease-in-out infinite'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(245, 87, 108, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 6s ease-in-out infinite'
      }}></div>

      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-4" style={{ gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand Section */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'var(--primary-gradient)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem'
              }}>
                M
              </div>
              <div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  background: 'var(--primary-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  MINCHYN
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  opacity: 0.7,
                  marginTop: '-0.3rem'
                }}>
                  NFT Reward Token
                </div>
              </div>
            </div>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              maxWidth: '400px'
            }}>
              Revolutionizing NFT rewards with cutting-edge blockchain technology. 
              Join the future of decentralized finance with passive income through Ugly Unicorns NFT holdings.
            </p>

            {/* Newsletter Signup */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ 
                fontSize: '1.2rem', 
                marginBottom: '1rem',
                background: 'var(--secondary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Stay Updated
              </h4>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                maxWidth: '350px'
              }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '0.8rem 1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '25px',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                />
                <button style={{
                  padding: '0.8rem 1.5rem',
                  background: 'var(--primary-gradient)',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 style={{ 
                fontSize: '1.1rem', 
                marginBottom: '1rem',
                color: 'var(--text-primary)'
              }}>
                Follow Us
              </h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '45px',
                      height: '45px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--primary-gradient)';
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1.5rem',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: '1rem' }}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.3rem 0'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--primary-color)';
                      e.target.style.paddingLeft = '1rem';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--text-secondary)';
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    → {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              marginBottom: '1.5rem',
              background: 'var(--secondary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Legal & Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '2rem' }}>
              {legalLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: '1rem' }}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.3rem 0'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#f5576c';
                      e.target.style.paddingLeft = '1rem';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--text-secondary)';
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    → {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div>
              <h5 style={{ 
                fontSize: '1rem', 
                marginBottom: '0.8rem',
                color: 'var(--text-primary)'
              }}>
                Contact
              </h5>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <p style={{ margin: '0.5rem 0' }}>📧 support@minchyn.io</p>
                <p style={{ margin: '0.5rem 0' }}>💼 partnerships@minchyn.io</p>
                <p style={{ margin: '0.5rem 0' }}>🚨 security@minchyn.io</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Information */}
        <div style={{
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 'var(--border-radius)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2rem'
        }}>
          <h4 style={{ 
            fontSize: '1.2rem', 
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Smart Contract Information
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            fontSize: '0.9rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ color: 'var(--primary-color)' }}>Token Contract:</strong><br />
              <span style={{ 
                fontFamily: 'monospace', 
                wordBreak: 'break-all',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '0.5rem',
                borderRadius: '5px',
                display: 'inline-block',
                marginTop: '0.5rem'
              }}>
                0x91738EE7A9b54eb810198cefF5549ca5982F47B3
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong style={{ color: 'var(--primary-color)' }}>Network:</strong> Ethereum Mainnet<br />
              <strong style={{ color: 'var(--primary-color)' }}>Standard:</strong> ERC-20<br />
              <strong style={{ color: 'var(--primary-color)' }}>Decimals:</strong> 18
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)' 
          }}>
            © 2025 MINCHYN. All rights reserved. Built with ❤️ for the future of DeFi.
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '2rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            <span>🔒 Audited Smart Contracts</span>
            <span>🛡️ Community Governed</span>
            <span>🌍 Decentralized</span>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        @media (max-width: 768px) {
          .grid-4 {
            grid-template-columns: 1fr !important;
          }
          
          .grid-4 > div:first-child {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
