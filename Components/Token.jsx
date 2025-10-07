import React from "react";

const Token = () => {
  return (
    <div className="token-section">
      <div className="container">
        <h2 className="section-title">$MINCHYN Token Details</h2>
        <div className="token-info-grid">
          <div className="token-feature">
            <h3>🎯 Reward System</h3>
            <p>Earn MINCHYN tokens through NFT holdings with our innovative reward mechanism</p>
          </div>
          <div className="token-feature">
            <h3>🔥 Burn Mechanism</h3>
            <p>Deflationary tokenomics with controlled burning to maintain value</p>
          </div>
          <div className="token-feature">
            <h3>👑 Role-Based Access</h3>
            <p>Advanced permission system with minter, burner, and admin roles</p>
          </div>
          <div className="token-feature">
            <h3>🔗 Multi-Contract Support</h3>
            <p>Integration with multiple secondary contracts for enhanced rewards</p>
          </div>
          <div className="token-feature">
            <h3>💎 ERC-20 Standard</h3>
            <p>Fully compliant ERC-20 token with extended functionality</p>
          </div>
          <div className="token-feature">
            <h3>📈 Growth Potential</h3>
            <p>Built for long-term value appreciation and ecosystem expansion</p>
          </div>
        </div>
        <div className="token-contract-info">
          <h3>Contract Information</h3>
          <div className="contract-details">
            <p><strong>Token Name:</strong> MINCHYN</p>
            <p><strong>Symbol:</strong> $MINCHYN</p>
            <p><strong>Decimals:</strong> 18</p>
            <p><strong>Contract:</strong> 0x91738EE7A9b54eb810198cefF5549ca5982F47B3</p>
            <p><strong>Network:</strong> Ethereum Mainnet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
