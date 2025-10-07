import React, { useState } from "react";

const Faq = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is MINCHYN?",
          answer: "MINCHYN is a revolutionary ERC-20 token that combines NFT ownership with passive income generation. By holding qualifying NFTs, users automatically earn MINCHYN tokens through our innovative reward system."
        },
        {
          question: "How does the reward system work?",
          answer: "MINCHYN rewards are calculated based on your Ugly Unicorns NFT holdings - the ONLY NFT collection eligible for rewards! You earn 100 MINCHYN tokens initially per Ugly Unicorn, plus 10 MINCHYN tokens per day for each NFT you hold. The collection features 22,222 unique unicorns that also grant co-founder status and equity in our startup."
        },
        {
          question: "What makes MINCHYN different from other tokens?",
          answer: "MINCHYN is unique because it's directly tied to Ugly Unicorns NFT ownership, creating real utility for digital collectibles. Our deflationary tokenomics, exclusive NFT integration, and gamified ecosystem where holders become co-founders set us apart from traditional reward tokens."
        },
        {
          question: "What are Ugly Unicorns and why are they special?",
          answer: "Ugly Unicorns (contract: 0xa548fa1d539cab8d78163cb064f7b22e6ef34b2f) is the ONLY NFT collection that earns MINCHYN rewards. With 22,222 unique unicorns, holders don't just earn tokens - they become co-founders with gifted equity and can influence our startup's operations through cr8r.xyz platform."
        }
      ]
    },
    {
      category: "Token Economics",
      questions: [
        {
          question: "What is the total supply of MINCHYN?",
          answer: "The total supply is 1,000,000,000 MINCHYN tokens. Distribution includes 40% for ICO sale, 20% for liquidity, 20% for rewards pool, 10% for team & development, and 10% for marketing & partnerships."
        },
        {
          question: "Is MINCHYN deflationary?",
          answer: "Yes, MINCHYN features a deflationary mechanism through token burning. This helps maintain scarcity and potentially increases value over time as tokens are permanently removed from circulation."
        },
        {
          question: "How long do rewards last?",
          answer: "Rewards are available until April 1, 2032. This long reward period ensures sustained incentives for NFT holders and community growth."
        }
      ]
    },
    {
      category: "ICO & Purchase",
      questions: [
        {
          question: "How can I buy MINCHYN tokens?",
          answer: "You can purchase MINCHYN tokens during our ICO by connecting your wallet and using ETH. The current price is 0.001 ETH per MINCHYN token. Simply click 'Buy MINCHYN Now' and follow the instructions."
        },
        {
          question: "What wallets are supported?",
          answer: "We support all major Ethereum wallets including MetaMask, WalletConnect, Coinbase Wallet, and hardware wallets like Ledger and Trezor."
        },
        {
          question: "Is there a minimum purchase amount?",
          answer: "Yes, the minimum purchase is 1 MINCHYN token, and the maximum per transaction is 10,000 MINCHYN tokens to ensure fair distribution during the ICO."
        }
      ]
    },
    {
      category: "NFT Requirements",
      questions: [
        {
          question: "Which NFTs are eligible for rewards?",
          answer: "Initially, rewards are available for holders of our primary partner NFT collection. We're continuously adding secondary contracts to expand the ecosystem and provide more earning opportunities."
        },
        {
          question: "Do I need to stake my NFTs?",
          answer: "No staking required! Simply hold eligible NFTs in your wallet and rewards automatically accumulate. You can claim your earned MINCHYN tokens at any time."
        },
        {
          question: "What happens if I transfer my NFT?",
          answer: "When you transfer an NFT, your accumulated rewards are automatically calculated and remain claimable. The new owner will start earning rewards from the time of transfer."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "What blockchain is MINCHYN on?",
          answer: "MINCHYN is deployed on Ethereum Mainnet as an ERC-20 token. We're planning multi-chain expansion to provide better accessibility and lower transaction costs."
        },
        {
          question: "Is the smart contract audited?",
          answer: "Yes, our smart contracts have been thoroughly audited by leading security firms. We use OpenZeppelin's battle-tested libraries and follow industry best practices for security."
        },
        {
          question: "Can I add MINCHYN to my wallet?",
          answer: "Absolutely! You can add MINCHYN to MetaMask and other wallets using our contract address: 0x91738EE7A9b54eb810198cefF5549ca5982F47B3"
        }
      ]
    },
    {
      category: "Rewards & Claims",
      questions: [
        {
          question: "How often can I claim rewards?",
          answer: "You can claim your accumulated MINCHYN rewards at any time. There are no restrictions on claiming frequency, giving you complete flexibility over your earnings."
        },
        {
          question: "Are there any fees for claiming?",
          answer: "The only costs are standard Ethereum gas fees for the transaction. We don't charge any additional fees for claiming your earned MINCHYN tokens."
        },
        {
          question: "How are rewards calculated?",
          answer: "Rewards are calculated in real-time based on your NFT holdings. The system tracks your holding duration and automatically computes your earned tokens using our transparent reward formula."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="faq-section" style={{
      padding: '8rem 0',
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
      position: 'relative'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 12s ease-in-out infinite'
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
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              marginBottom: '1rem'
            }}>
              Frequently Asked Questions
            </span>
          </div>
          
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Everything You Need to Know
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}>
            Get answers to the most common questions about MINCHYN and our reward ecosystem
          </p>
        </div>

        {/* FAQ Categories */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} style={{ marginBottom: '3rem' }}>
              {/* Category Header */}
              <div style={{ 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                <h3 style={{ 
                  fontSize: '1.8rem',
                  background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '600'
                }}>
                  {category.category}
                </h3>
              </div>

              {/* Questions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {category.questions.map((item, questionIndex) => {
                  const itemIndex = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[itemIndex];
                  
                  return (
                    <div key={questionIndex} className="glass-card faq-item" style={{
                      borderRadius: 'var(--border-radius)',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}>
                      {/* Question */}
                      <div 
                        onClick={() => toggleItem(itemIndex)}
                        style={{
                          padding: '1.5rem 2rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: isOpen ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        <h4 style={{ 
                          fontSize: '1.2rem',
                          margin: 0,
                          color: 'var(--text-primary)',
                          fontWeight: '600'
                        }}>
                          {item.question}
                        </h4>
                        
                        <div style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: isOpen ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isOpen ? 'white' : 'var(--text-primary)',
                          fontSize: '1.2rem',
                          transition: 'all 0.3s ease',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                        }}>
                          +
                        </div>
                      </div>

                      {/* Answer */}
                      <div style={{
                        maxHeight: isOpen ? '500px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease'
                      }}>
                        <div style={{
                          padding: '0 2rem 1.5rem 2rem',
                          fontSize: '1rem',
                          lineHeight: '1.7',
                          color: 'var(--text-secondary)',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
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
            background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Still Have Questions?
          </h3>
          
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Our team is here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = 'mailto:support@minchyn.io'}
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              Contact Support
            </button>
            
            <button 
              className="btn btn-outline"
              onClick={() => window.location.href = 'https://discord.gg/hyY6ve7k'}
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              Join Discord
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
