import React from 'react';
import { Header, Footer, Token, TokenInfo, BackToTop } from "../Components";
import { TOKEN_ICO_Context } from "../context/index";

const TokenomicsPage = () => {
  const {
    account,
    CONNECT_WALLET,
    setAccount,
    setLoader,
    shortenAddress,
    detail,
    currency,
    setOwnerModel,
  } = React.useContext(TOKEN_ICO_Context);

  return (
    <div className="body_wrap">
      <Header
        account={account}
        CONNECT_WALLET={CONNECT_WALLET}
        setAccount={setAccount}
        setLoader={setLoader}
        setOwnerModel={setOwnerModel}
        shortenAddress={shortenAddress}
        detail={detail}
        currency={currency}
      />
      
      {/* Hero Section */}
      <section style={{
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: 'transparent',
        paddingTop: '120px'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Tokenomics
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6'
            }}>
              Explore MINCHYN token economics, distribution, and utility features
            </p>
          </div>
        </div>
      </section>

      <Token />
      <TokenInfo account={account} detail={detail} />
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default TokenomicsPage;