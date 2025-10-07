import React, { useState, useEffect } from "react";

const Header = ({
  account,
  CONNECT_WALLET,
  setAccount,
  setLoader,
  setOwnerModel,
  shortenAddress,
  detail,
  currency,
  ownerModel,
}) => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetamaskInstalled(true);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount("");
    } else {
      setAccount(accounts[0]);
    }
  };

  const menuItems = [
    { name: "Home", href: "/", isLink: true },
    { name: "Mint NFT", href: "/mint-nft", isLink: true },
    { name: "About", href: "/learn-more", isLink: true },
    { name: "Tokenomics", href: "/tokenomics", isLink: true },
    // { name: "Team", href: "/team", isLink: true }, // Hidden as requested
    { name: "FAQ", href: "/faq", isLink: true }
  ];

  const scrollToSection = (href, isLink = false) => {
    if (isLink) {
      window.location.href = href;
      return;
    }
    
    // Check if we're currently on the learn-more page
    const currentPath = window.location.pathname;
    if (currentPath === '/learn-more') {
      // Redirect to main page with anchor
      window.location.href = `/${href}`;
      return;
    }
    
    // If we're on the main page, scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      width: '100%',
      zIndex: '10000',
      backgroundColor: 'rgba(15, 15, 35, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 0',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
    }}>
      <div className="container">
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div 
            onClick={() => window.location.href = '/'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--primary-gradient)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              M
            </div>
            <div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                MINCHYN
              </div>
              <div style={{
                fontSize: '0.7rem',
                opacity: 0.7,
                marginTop: '-0.2rem'
              }}>
                Token ICO
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }} className="desktop-nav">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.isLink)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.target.style.color = 'var(--primary-color)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                  e.target.style.color = 'var(--text-primary)';
                }}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Wallet Connection */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {account ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(102, 126, 234, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  border: '1px solid rgba(102, 126, 234, 0.2)'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: 'var(--success-color)',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px var(--success-color)'
                  }}></div>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                  }}>
                    {shortenAddress(account)}
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    opacity: 0.8
                  }}>
                    {currency ? parseFloat(currency).toFixed(4) : '0.0000'} ETH
                  </span>
                </div>

                {detail?.contractOwner?.toLowerCase() === account?.toLowerCase() && (
                  <button
                    className="btn btn-outline"
                    onClick={() => setOwnerModel(true)}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    Admin
                  </button>
                )}
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={CONNECT_WALLET}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem'
                }}
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(15, 15, 35, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none',
            borderRadius: '0 0 20px 20px',
            padding: '1rem'
          }}>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.isLink)}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  padding: '1rem',
                  textAlign: 'left',
                  borderRadius: '10px',
                  marginBottom: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'none';
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .desktop-nav {
          display: flex;
        }
        .mobile-menu-btn {
          display: none;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
