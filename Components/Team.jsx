import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      expertise: "Blockchain Architecture",
      experience: "Former Ethereum Foundation Developer with 8+ years in DeFi",
      image: "👨‍💼",
      background: "Led development of 3 successful DeFi protocols with $100M+ TVL",
      skills: ["Smart Contracts", "Protocol Design", "Team Leadership"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      expertise: "Smart Contract Development",
      experience: "10+ years in blockchain development and security",
      image: "👩‍💻",
      background: "Previously security lead at ConsenSys, audited 100+ smart contracts",
      skills: ["Solidity", "Security", "DevOps"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      expertise: "DeFi Product Strategy",
      experience: "Former Product Manager at Uniswap and Compound",
      image: "👨‍🎨",
      background: "Scaled DeFi products from 0 to millions of users",
      skills: ["Product Strategy", "UX Design", "Community"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Emma Watson",
      role: "Head of Marketing",
      expertise: "Crypto Marketing & Partnerships",
      experience: "Led marketing for 5 successful token launches",
      image: "👩‍🚀",
      background: "Built communities of 500K+ members across multiple blockchain projects",
      skills: ["Community Building", "Partnerships", "Content Strategy"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "David Kim",
      role: "Blockchain Engineer",
      expertise: "Full-Stack Blockchain Development",
      experience: "Senior engineer with expertise in Layer 1 and Layer 2 solutions",
      image: "👨‍🔬",
      background: "Contributed to Polygon and Arbitrum core development",
      skills: ["Solidity", "JavaScript", "Python"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Lisa Zhang",
      role: "Operations Manager",
      expertise: "Business Operations & Legal",
      experience: "Former operations lead at Binance with regulatory expertise",
      image: "👩‍⚖️",
      background: "Managed compliance for crypto exchanges across 50+ jurisdictions",
      skills: ["Operations", "Legal", "Compliance"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    }
  ];

  return (
    <section id="team" className="team-section" style={{
      padding: '8rem 0',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
      position: 'relative'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '8%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 10s ease-in-out infinite'
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
              background: 'rgba(139, 92, 246, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              fontSize: '0.9rem',
              color: '#8b5cf6',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              marginBottom: '1rem'
            }}>
              Our Team
            </span>
          </div>
          
          <h2 style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Meet the Visionaries
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}>
            Industry veterans building the future of NFT-based rewards
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-4" style={{ gap: '2rem', marginBottom: '5rem' }}>
          {[
            { number: '50+', label: 'Years Combined Experience' },
            { number: '15+', label: 'Successful Projects' },
            { number: '$500M+', label: 'Total Value Secured' },
            { number: '2M+', label: 'Users Served' }
          ].map((stat, index) => (
            <div key={index} className="glass-card" style={{ 
              padding: '2rem', 
              textAlign: 'center',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-3" style={{ gap: '2.5rem' }}>
          {teamMembers.map((member, index) => (
            <div key={index} className="glass-card team-member-card" style={{ 
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}
            >
              {/* Profile Image */}
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {member.image}
              </div>
              
              {/* Name and Role */}
              <h3 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '0.5rem',
                background: 'var(--primary-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {member.name}
              </h3>
              
              <div style={{ 
                fontSize: '1rem', 
                color: '#8b5cf6',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                {member.role}
              </div>

              {/* Expertise */}
              <div style={{ 
                padding: '0.5rem 1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(139, 92, 246, 0.2)'
              }}>
                {member.expertise}
              </div>

              {/* Experience */}
              <p style={{ 
                fontSize: '0.95rem', 
                lineHeight: '1.5',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                fontStyle: 'italic'
              }}>
                {member.experience}
              </p>

              {/* Background */}
              <p style={{ 
                fontSize: '0.9rem', 
                lineHeight: '1.5',
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem'
              }}>
                {member.background}
              </p>

              {/* Skills */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} style={{
                      padding: '0.3rem 0.8rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1rem'
              }}>
                {Object.entries(member.social).map(([platform, link], linkIndex) => (
                  <a 
                    key={linkIndex}
                    href={link}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(139, 92, 246, 0.1)',
                      borderRadius: '50%',
                      color: '#8b5cf6',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#8b5cf6';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                      e.currentTarget.style.color = '#8b5cf6';
                    }}
                  >
                    {platform === 'twitter' && '🐦'}
                    {platform === 'linkedin' && '💼'}
                    {platform === 'github' && '🔗'}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team CTA */}
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
            background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Join Our Growing Team
          </h3>
          
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            We're always looking for talented individuals who share our passion for innovation 
            and want to shape the future of decentralized finance.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = 'mailto:careers@minchyn.io'}
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              View Open Positions
            </button>
            
            <button 
              className="btn btn-outline"
              onClick={() => window.location.href = 'mailto:team@minchyn.io'}
              style={{ fontSize: '1rem', padding: '1rem 2rem' }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
