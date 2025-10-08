import React from 'react';

const MetaMaskInstallPrompt = ({ onClose }) => {
  const getBrowserSpecificUrl = () => {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Firefox')) {
      return 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
    } else if (userAgent.includes('Edg')) {
      return 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm';
    } else {
      return 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
    }
  };

  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Edg')) return 'Edge';
    if (userAgent.includes('Chrome')) return 'Chrome';
    return 'your browser';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(25, 25, 55, 0.95) 100%)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}>
        {/* MetaMask Logo */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #f6851b 0%, #e2761b 100%)',
          borderRadius: '20px',
          margin: '0 auto 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem'
        }}>
          🦊
        </div>

        <h2 style={{
          color: 'white',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          MetaMask Required
        </h2>

        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}>
          To connect your wallet and interact with MINCHYN tokens, you need to install MetaMask extension for {getBrowserName()}.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href={getBrowserSpecificUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'linear-gradient(135deg, #f6851b 0%, #e2761b 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'transform 0.2s ease',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Install MetaMask
          </a>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Cancel
          </button>
        </div>

        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem',
          marginTop: '1.5rem'
        }}>
          After installing MetaMask, refresh this page and try connecting again.
        </p>
      </div>
    </div>
  );
};

export default MetaMaskInstallPrompt;