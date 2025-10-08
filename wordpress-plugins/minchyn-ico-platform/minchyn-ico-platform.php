<?php
/**
 * Plugin Name: MINCHYN ICO Platform
 * Plugin URI: https://yoursite.com/minchyn-ico-platform
 * Description: Complete ICO platform for MINCHYN token with token purchase, NFT minting, dashboard, and comprehensive Web3 integration.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yoursite.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: minchyn-ico
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.3
 * Requires PHP: 7.4
 * Network: false
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('MINCHYN_ICO_VERSION', '1.0.0');
define('MINCHYN_ICO_PLUGIN_URL', plugin_dir_url(__FILE__));
define('MINCHYN_ICO_PLUGIN_PATH', plugin_dir_path(__FILE__));

class MinchynICOPlatform {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        
        // Shortcodes
        add_shortcode('minchyn_ico_dashboard', array($this, 'ico_dashboard_shortcode'));
        add_shortcode('minchyn_token_purchase', array($this, 'token_purchase_shortcode'));
        add_shortcode('minchyn_token_info', array($this, 'token_info_shortcode'));
        add_shortcode('minchyn_roadmap', array($this, 'roadmap_shortcode'));
        add_shortcode('minchyn_team', array($this, 'team_shortcode'));
        
        // Admin
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'settings_init'));
        
        // Activation/Deactivation
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        load_plugin_textdomain('minchyn-ico', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        // Enqueue Web3 libraries
        wp_enqueue_script('ethers-js', 'https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js', array(), '5.7.2', true);
        
        // Enqueue plugin assets - use modern styling
        wp_enqueue_style('minchyn-ico-style', MINCHYN_ICO_PLUGIN_URL . 'assets/style-modern.css', array(), MINCHYN_ICO_VERSION);
        wp_enqueue_script('minchyn-ico-script', MINCHYN_ICO_PLUGIN_URL . 'assets/script.js', array('jquery', 'ethers-js'), MINCHYN_ICO_VERSION, true);
        
        // Localize script with settings
        $settings = get_option('minchyn_ico_settings', array());
        wp_localize_script('minchyn-ico-script', 'minchynICO', array(
            'tokenContract' => isset($settings['token_contract']) ? $settings['token_contract'] : '0x...',
            'icoContract' => isset($settings['ico_contract']) ? $settings['ico_contract'] : '0x...',
            'nftContract' => isset($settings['nft_contract']) ? $settings['nft_contract'] : '0xa548Fa1d539CAB8d78163cb064F7b22E6EF34B2f',
            'tokenPrice' => isset($settings['token_price']) ? $settings['token_price'] : '0.0001',
            'rpcUrl' => isset($settings['rpc_url']) ? $settings['rpc_url'] : 'https://eth.llamarpc.com',
            'nonce' => wp_create_nonce('minchyn_ico_nonce'),
            'ajaxUrl' => admin_url('admin-ajax.php')
        ));
    }
    
    public function ico_dashboard_shortcode($atts) {
        $atts = shortcode_atts(array(
            'theme' => 'dark',
            'show_stats' => 'true',
            'show_progress' => 'true'
        ), $atts);
        
        ob_start();
        ?>
        <div class="minchyn-ico-dashboard" data-theme="light">
            <!-- Header Section -->
            <div class="ico-header">
                <div class="ico-header-content">
                    <div class="ico-badge">
                        <span>🚀</span>
                        <span>Live ICO</span>
                    </div>
                    <h1 class="ico-title">MINCHYN Token ICO</h1>
                    <p class="ico-subtitle">
                        Join the revolution in decentralized entrepreneurship. Purchase MINCHYN tokens and become part of our exclusive ecosystem.
                    </p>
                </div>
            </div>

            <!-- Wallet Connection -->
            <div class="wallet-section">
                <div class="wallet-container">
                    <div id="wallet-not-connected" class="wallet-status">
                        <h3>� Connect Your Wallet</h3>
                        <p>Connect your MetaMask wallet to access the ICO dashboard and purchase tokens</p>
                        <button id="connect-wallet" class="btn btn-primary btn-large">Connect MetaMask</button>
                    </div>
                    <div id="wallet-connected" class="wallet-status" style="display: none;">
                        <h3>✅ Wallet Connected</h3>
                        <div class="wallet-info">
                            <div class="wallet-info-item">
                                <div class="wallet-info-label">Wallet Address</div>
                                <div class="wallet-info-value" id="user-address">Not connected</div>
                            </div>
                            <div class="wallet-info-item">
                                <div class="wallet-info-label">ETH Balance</div>
                                <div class="wallet-info-value" id="eth-balance">0.000</div>
                            </div>
                            <div class="wallet-info-item">
                                <div class="wallet-info-label">MINCHYN Balance</div>
                                <div class="wallet-info-value" id="token-balance">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <?php if ($atts['show_stats'] === 'true'): ?>
            <!-- ICO Statistics -->
            <div class="token-stats">
                <div class="stat-card">
                    <span class="stat-icon">📊</span>
                    <span class="stat-value" id="tokens-sold">Loading...</span>
                    <div class="stat-label">Tokens Sold</div>
                    <div class="stat-description">of 1,000,000,000 MINCHYN</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">💎</span>
                    <span class="stat-value" id="eth-raised">Loading...</span>
                    <div class="stat-label">ETH Raised</div>
                    <div class="stat-description">Current funding round</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">💰</span>
                    <span class="stat-value" id="current-price">0.0001</span>
                    <div class="stat-label">Token Price</div>
                    <div class="stat-description">ETH per MINCHYN</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">⏰</span>
                    <span class="stat-value" id="time-left">00:00:00</span>
                    <div class="stat-label">Time Remaining</div>
                    <div class="stat-description">Current round ends</div>
                </div>
            </div>
            <?php endif; ?>

            <?php if ($atts['show_progress'] === 'true'): ?>
            <!-- Progress Section -->
            <div class="ico-progress-section">
                <div class="progress-container">
                    <h3>ICO Progress</h3>
                    <div class="progress-bar">
                        <div id="progress-fill" class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="progress-info">
                        <span id="progress-text">0% Complete</span>
                        <span id="progress-amount">0 / 1,000,000,000 MINCHYN</span>
                    </div>
                </div>
            </div>
            <?php endif; ?>

            <!-- Action Buttons -->
            <div class="dashboard-actions">
                <button id="buy-tokens-btn" class="btn btn-primary btn-large" disabled>
                    <span class="btn-icon">💰</span>
                    <span>Buy MINCHYN Tokens</span>
                </button>
                <button id="add-to-metamask" class="btn btn-outline btn-large" disabled>
                    <span class="btn-icon">🦊</span>
                    <span>Add MINCHYN to MetaMask</span>
                </button>
            </div>

            <!-- Comprehensive Platform Information -->
            <div style="margin-top: 48px;">
                <!-- Platform Introduction -->
                <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                    <h3 style="color: var(--primary-color); margin-bottom: 16px; text-align: center;">🚀 About Minchyn: Next-Gen Social Media Platform</h3>
                    <p style="margin-bottom: 16px; text-align: center; font-size: 16px; line-height: 1.6;">
                        Minchyn transforms passive social media consumption into an active, reward-driven economy where engagement generates tangible value. 
                        Our psychology-driven ecosystem leverages proven behavioral principles combined with the $MINCHYN utility token (ERC-20) to create 
                        a self-sustaining social platform economy.
                    </p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 24px;">
                        <div style="background: rgba(74, 144, 226, 0.1); padding: 16px; border-radius: 12px; text-align: center;">
                            <strong style="color: var(--primary-color);">🎮 XP Reward System</strong><br>
                            <small>Platform-native points for engagement</small>
                        </div>
                        <div style="background: rgba(46, 213, 115, 0.1); padding: 16px; border-radius: 12px; text-align: center;">
                            <strong style="color: var(--secondary-color);">💎 $MINCHYN Token</strong><br>
                            <small>ERC-20 utility token for premium features</small>
                        </div>
                        <div style="background: rgba(255, 107, 107, 0.1); padding: 16px; border-radius: 12px; text-align: center;">
                            <strong style="color: var(--accent-color);">🎯 Creator Pools</strong><br>
                            <small>User-funded viral amplification mechanics</small>
                        </div>
                        <div style="background: rgba(253, 203, 110, 0.1); padding: 16px; border-radius: 12px; text-align: center;">
                            <strong style="color: var(--text-accent);">🏆 Multi-Tier Economy</strong><br>
                            <small>Free (XP) and premium (token) reward layers</small>
                        </div>
                    </div>
                </div>

                <!-- Token Utility Overview -->
                <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                    <h4 style="color: var(--primary-color); margin-bottom: 20px; text-align: center;">💰 $MINCHYN Token Utility</h4>
                    <div class="token-stats" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                        <div class="stat-card" style="background: rgba(156, 136, 255, 0.05);">
                            <span class="stat-icon">🎪</span>
                            <div class="stat-label">Live Events</div>
                            <div class="stat-description">750-1500 tokens</div>
                        </div>
                        <div class="stat-card" style="background: rgba(46, 213, 115, 0.05);">
                            <span class="stat-icon">🛒</span>
                            <div class="stat-label">In-App Purchases</div>
                            <div class="stat-description">Various pricing</div>
                        </div>
                        <div class="stat-card" style="background: rgba(74, 144, 226, 0.05);">
                            <span class="stat-icon">➕</span>
                            <div class="stat-label">+More</div>
                            <div class="stat-description">Additional utilities</div>
                        </div>
                    </div>
                </div>

                <!-- How to Earn -->
                <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                    <h4 style="color: var(--primary-color); margin-bottom: 20px; text-align: center;">💎 How to Earn $MINCHYN Tokens</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                        <div style="background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(46, 213, 115, 0.1)); padding: 20px; border-radius: 12px; text-align: center;">
                            <h5 style="margin-bottom: 8px;">📱 Daily Engagement</h5>
                            <p style="margin-bottom: 4px;"><strong>50-200 XP daily</strong></p>
                            <small>Login streaks, content interaction, social connections</small>
                        </div>
                        <div style="background: linear-gradient(135deg, rgba(46, 213, 115, 0.1), rgba(255, 107, 107, 0.1)); padding: 20px; border-radius: 12px; text-align: center;">
                            <h5 style="margin-bottom: 8px;">🎨 Content Creation</h5>
                            <p style="margin-bottom: 4px;"><strong>100-300 XP per post</strong></p>
                            <small>Quality-based rewards, viral bonuses, creator pools</small>
                        </div>
                        <div style="background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(253, 203, 110, 0.1)); padding: 20px; border-radius: 12px; text-align: center;">
                            <h5 style="margin-bottom: 8px;">🔄 XP Conversion</h5>
                            <p style="margin-bottom: 4px;"><strong>~100 XP = 1 token</strong></p>
                            <small>Convert earned XP to tradeable $MINCHYN tokens</small>
                        </div>
                        <div style="background: linear-gradient(135deg, rgba(253, 203, 110, 0.1), rgba(156, 136, 255, 0.1)); padding: 20px; border-radius: 12px; text-align: center;">
                            <h5 style="margin-bottom: 8px;">👥 Referral Rewards</h5>
                            <p style="margin-bottom: 4px;"><strong>1000 XP per referral</strong></p>
                            <small>Earn when friends join and become active users</small>
                        </div>
                    </div>
                </div>

                <!-- Development Roadmap -->
                <div style="background: var(--card-bg); padding: 24px; border-radius: 16px;">
                    <h4 style="color: var(--primary-color); margin-bottom: 20px; text-align: center;">🗺️ Development Roadmap</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                        <div style="border-left: 4px solid var(--primary-color); padding-left: 16px;">
                            <h5 style="color: var(--primary-color);">Phase 1: Core System</h5>
                            <p style="margin: 8px 0;"><strong>Q1 2026 ✅</strong></p>
                            <small>XP rewards, streak mechanics, creator pools</small>
                        </div>
                        <div style="border-left: 4px solid var(--secondary-color); padding-left: 16px;">
                            <h5 style="color: var(--secondary-color);">Phase 2: Token Integration</h5>
                            <p style="margin: 8px 0;"><strong>Q2 2026 🚀</strong></p>
                            <small>$MINCHYN deployment, premium features</small>
                        </div>
                        <div style="border-left: 4px solid var(--accent-color); padding-left: 16px;">
                            <h5 style="color: var(--accent-color);">Phase 3: Advanced Economy</h5>
                            <p style="margin: 8px 0;"><strong>Q3 2026 🎯</strong></p>
                            <small>Live events, physical rewards, partnerships</small>
                        </div>
                        <div style="border-left: 4px solid var(--text-accent); padding-left: 16px;">
                            <h5 style="color: var(--text-accent);">Phase 4: Decentralization</h5>
                            <p style="margin: 8px 0;"><strong>Q4 2026 🌐</strong></p>
                            <small>DAO governance, cross-platform utility</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function token_purchase_shortcode($atts) {
        $atts = shortcode_atts(array(
            'theme' => 'dark',
            'max_purchase' => '1000000',
            'min_purchase' => '100'
        ), $atts);
        
        ob_start();
        ?>
        <div class="minchyn-token-purchase" data-theme="light">
            <!-- Header Section -->
            <div class="ico-header">
                <div class="ico-header-content">
                    <div class="ico-badge">
                        <span>💰</span>
                        <span>Token Purchase</span>
                    </div>
                    <h1 class="ico-title">Purchase MINCHYN Tokens</h1>
                    <p class="ico-subtitle">
                        Secure your stake in the future of decentralized entrepreneurship with MINCHYN tokens.
                    </p>
                </div>
            </div>

            <div class="purchase-container">
                <!-- Purchase Form -->
                <div class="purchase-form">
                    <div class="input-group">
                        <label for="token-amount">Token Amount</label>
                        <div style="position: relative;">
                            <input type="number" 
                                   id="token-amount" 
                                   min="<?php echo esc_attr($atts['min_purchase']); ?>" 
                                   max="<?php echo esc_attr($atts['max_purchase']); ?>" 
                                   value="1000" 
                                   placeholder="Enter amount">
                            <span class="input-suffix">MINCHYN</span>
                        </div>
                        <small style="color: var(--text-secondary); margin-top: 8px; display: block;">
                            Minimum: <?php echo number_format($atts['min_purchase']); ?> • 
                            Maximum: <?php echo number_format($atts['max_purchase']); ?> tokens
                        </small>
                    </div>
                    
                    <div class="conversion-info">
                        <div class="conversion-row">
                            <span>Cost in ETH</span>
                            <span id="eth-cost">0.1 ETH</span>
                        </div>
                        <div class="conversion-row">
                            <span>Cost in USD</span>
                            <span id="usd-cost">~$200</span>
                        </div>
                    </div>
                    
                    <div class="purchase-summary">
                        <h4>Purchase Summary</h4>
                        <div class="summary-row">
                            <span>MINCHYN Tokens</span>
                            <span id="summary-tokens">1,000</span>
                        </div>
                        <div class="summary-row">
                            <span>Token Price</span>
                            <span>0.0001 ETH</span>
                        </div>
                        <div class="summary-row">
                            <span>Early Bird Bonus</span>
                            <span id="summary-bonus" style="color: var(--success-color);">+10%</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total Cost</span>
                            <span id="summary-cost">0.1 ETH</span>
                        </div>
                    </div>
                    
                    <button id="purchase-btn" class="btn btn-primary btn-large" disabled style="width: 100%; margin-top: 24px;">
                        <span class="btn-icon">🚀</span>
                        <span>Purchase Tokens</span>
                    </button>
                </div>
                
                <!-- Transaction Status -->
                <div id="purchase-status" class="purchase-status" style="display: none;">
                    <div class="status-content">
                        <div class="spinner"></div>
                        <span id="purchase-status-text">Processing purchase...</span>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function token_info_shortcode($atts) {
        $atts = shortcode_atts(array(
            'layout' => 'grid',
            'show_chart' => 'true'
        ), $atts);
        
        ob_start();
        ?>
        <div class="minchyn-token-info" data-theme="light">
            <!-- Header Section -->
            <div class="ico-header">
                <div class="ico-header-content">
                    <div class="ico-badge">
                        <span>💎</span>
                        <span>Token Information</span>
                    </div>
                    <h1 class="ico-title">MINCHYN Token</h1>
                    <p class="ico-subtitle">
                        The utility token powering the future of decentralized entrepreneurship and innovation
                    </p>
                </div>
            </div>

            <div class="token-stats">
                <div class="stat-card">
                    <span class="stat-icon">🪙</span>
                    <span class="stat-value">1,000,000,000</span>
                    <div class="stat-label">Total Supply</div>
                    <div class="stat-description">Maximum tokens ever created</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">💰</span>
                    <span class="stat-value">0.0001</span>
                    <div class="stat-label">Current Price</div>
                    <div class="stat-description">ETH per MINCHYN token</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">🎯</span>
                    <span class="stat-value">60%</span>
                    <div class="stat-label">ICO Allocation</div>
                    <div class="stat-description">600M tokens available</div>
                </div>
                <div class="stat-card">
                    <span class="stat-icon">🔥</span>
                    <span class="stat-value">ERC-20</span>
                    <div class="stat-label">Token Standard</div>
                    <div class="stat-description">Ethereum blockchain</div>
                </div>
            </div>

            <!-- Token Distribution -->
            <div class="purchase-container">
                <div class="purchase-form">
                    <h3 style="text-align: center; margin-bottom: 32px;">Token Distribution</h3>
                    <div class="conversion-info">
                        <div class="conversion-row">
                            <span>ICO Public Sale</span>
                            <span style="color: var(--primary-color); font-weight: 700;">60% (600M)</span>
                        </div>
                        <div class="conversion-row">
                            <span>Team & Development</span>
                            <span style="color: var(--secondary-color); font-weight: 700;">20% (200M)</span>
                        </div>
                        <div class="conversion-row">
                            <span>Marketing & Partnerships</span>
                            <span style="color: var(--accent-color); font-weight: 700;">15% (150M)</span>
                        </div>
                        <div class="conversion-row">
                            <span>Reserve Fund</span>
                            <span style="color: var(--text-secondary); font-weight: 700;">5% (50M)</span>
                        </div>
                    </div>
                </div>
                
                <!-- Token Utility & Minchyn Platform -->
                <div class="purchase-form">
                    <h3 style="text-align: center; margin-bottom: 32px;">$MINCHYN Token Utility & Social Platform</h3>
                    
                    <!-- Platform Introduction -->
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                        <h4 style="color: var(--primary-color); margin-bottom: 16px;">🚀 Minchyn: Next-Gen Social Media Platform</h4>
                        <p style="margin-bottom: 16px;">
                            Minchyn transforms passive social media consumption into an active, reward-driven economy where engagement generates tangible value. 
                            Our psychology-driven ecosystem leverages proven behavioral principles combined with the $MINCHYN utility token (ERC-20) to create 
                            a self-sustaining social platform economy.
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 20px;">
                            <div style="background: rgba(74, 144, 226, 0.1); padding: 16px; border-radius: 12px;">
                                <strong>🎮 XP Reward System</strong><br>
                                <small>Platform-native points for engagement</small>
                            </div>
                            <div style="background: rgba(46, 213, 115, 0.1); padding: 16px; border-radius: 12px;">
                                <strong>💎 $MINCHYN Token</strong><br>
                                <small>ERC-20 utility token for premium features</small>
                            </div>
                            <div style="background: rgba(255, 107, 107, 0.1); padding: 16px; border-radius: 12px;">
                                <strong>🎯 Creator Pools</strong><br>
                                <small>User-funded viral amplification mechanics</small>
                            </div>
                            <div style="background: rgba(253, 203, 110, 0.1); padding: 16px; border-radius: 12px;">
                                <strong>🏆 Multi-Tier Economy</strong><br>
                                <small>Free (XP) and premium (token) reward layers</small>
                            </div>
                        </div>
                    </div>

                    <!-- Token Utility Ecosystem -->
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                        <h4 style="color: var(--primary-color); margin-bottom: 20px;">💰 Token Utility Ecosystem</h4>
                        <div class="token-stats" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                            <div class="stat-card" style="background: rgba(74, 144, 226, 0.05);">
                                <span class="stat-icon">🚀</span>
                                <div class="stat-label">Content Boosting</div>
                                <div class="stat-description">100 tokens per 1000 views<br><small>Accelerate your content reach</small></div>
                            </div>
                            <div class="stat-card" style="background: rgba(46, 213, 115, 0.05);">
                                <span class="stat-icon">🎨</span>
                                <div class="stat-label">Exclusive Filters</div>
                                <div class="stat-description">250-500 tokens<br><small>Premium visual effects & tools</small></div>
                            </div>
                            <div class="stat-card" style="background: rgba(255, 107, 107, 0.05);">
                                <span class="stat-icon">🚫</span>
                                <div class="stat-label">Ad Removal</div>
                                <div class="stat-description">2000 tokens/week<br><small>Clean, distraction-free experience</small></div>
                            </div>
                            <div class="stat-card" style="background: rgba(253, 203, 110, 0.05);">
                                <span class="stat-icon">⭐</span>
                                <div class="stat-label">Creator Subscriptions</div>
                                <div class="stat-description">500 tokens/month<br><small>Direct creator support & perks</small></div>
                            </div>
                            <div class="stat-card" style="background: rgba(156, 136, 255, 0.05);">
                                <span class="stat-icon">🎪</span>
                                <div class="stat-label">Live Event Access</div>
                                <div class="stat-description">750-1500 tokens<br><small>Exclusive virtual events & meetups</small></div>
                            </div>
                            <div class="stat-card" style="background: rgba(255, 159, 243, 0.05);">
                                <span class="stat-icon">🖼️</span>
                                <div class="stat-label">NFT Collectibles</div>
                                <div class="stat-description">1000-5000 tokens<br><small>Unique digital assets & rewards</small></div>
                            </div>
                        </div>
                    </div>

                    <!-- Creator & Premium Tools -->
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                        <h4 style="color: var(--primary-color); margin-bottom: 20px;">🛠️ Creator & Premium Tools</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                            <div style="border: 2px solid rgba(74, 144, 226, 0.2); padding: 20px; border-radius: 12px;">
                                <h5 style="color: var(--primary-color); margin-bottom: 12px;">📊 Advanced Analytics</h5>
                                <p style="margin-bottom: 8px;"><strong>500 tokens/month</strong></p>
                                <ul style="margin: 0; padding-left: 20px; color: var(--text-secondary);">
                                    <li>Detailed engagement metrics</li>
                                    <li>Audience demographics</li>
                                    <li>Revenue tracking</li>
                                    <li>Performance optimization tips</li>
                                </ul>
                            </div>
                            <div style="border: 2px solid rgba(46, 213, 115, 0.2); padding: 20px; border-radius: 12px;">
                                <h5 style="color: var(--secondary-color); margin-bottom: 12px;">🎯 Brand Matching</h5>
                                <p style="margin-bottom: 8px;"><strong>200 tokens/application</strong></p>
                                <ul style="margin: 0; padding-left: 20px; color: var(--text-secondary);">
                                    <li>Priority brand partnerships</li>
                                    <li>Sponsored content opportunities</li>
                                    <li>Revenue sharing programs</li>
                                    <li>Exclusive collaboration deals</li>
                                </ul>
                            </div>
                            <div style="border: 2px solid rgba(255, 107, 107, 0.2); padding: 20px; border-radius: 12px;">
                                <h5 style="color: var(--accent-color); margin-bottom: 12px;">🔧 API Access</h5>
                                <p style="margin-bottom: 8px;"><strong>2000 tokens/month</strong></p>
                                <ul style="margin: 0; padding-left: 20px; color: var(--text-secondary);">
                                    <li>Developer platform access</li>
                                    <li>Custom integrations</li>
                                    <li>Third-party app development</li>
                                    <li>Data export capabilities</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Earning Mechanics -->
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                        <h4 style="color: var(--primary-color); margin-bottom: 20px;">💎 How to Earn $MINCHYN Tokens</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                            <div style="background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(46, 213, 115, 0.1)); padding: 20px; border-radius: 12px;">
                                <h5>📱 Daily Engagement</h5>
                                <p><strong>50-200 XP daily</strong></p>
                                <small>Login streaks, content interaction, social connections</small>
                            </div>
                            <div style="background: linear-gradient(135deg, rgba(46, 213, 115, 0.1), rgba(255, 107, 107, 0.1)); padding: 20px; border-radius: 12px;">
                                <h5>🎨 Content Creation</h5>
                                <p><strong>100-300 XP per post</strong></p>
                                <small>Quality-based rewards, viral bonuses, creator pools</small>
                            </div>
                            <div style="background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(253, 203, 110, 0.1)); padding: 20px; border-radius: 12px;">
                                <h5>🔄 XP to Token Conversion</h5>
                                <p><strong>Dynamic rate: ~100 XP = 1 token</strong></p>
                                <small>Convert earned XP to tradeable $MINCHYN tokens</small>
                            </div>
                            <div style="background: linear-gradient(135deg, rgba(253, 203, 110, 0.1), rgba(156, 136, 255, 0.1)); padding: 20px; border-radius: 12px;">
                                <h5>👥 Referral Rewards</h5>
                                <p><strong>1000 XP per referral</strong></p>
                                <small>Earn when friends join and become active users</small>
                            </div>
                        </div>
                    </div>

                    <!-- Psychology-Driven Features -->
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                        <h4 style="color: var(--primary-color); margin-bottom: 20px;">🧠 Psychology-Driven Engagement</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                            <div>
                                <h5 style="color: var(--secondary-color);">🎰 Variable Rewards</h5>
                                <p>Randomized reward values create anticipation loops with dynamic multipliers and surprise "Golden Reshares" (0.1% chance of 100x rewards).</p>
                            </div>
                            <div>
                                <h5 style="color: var(--accent-color);">🏆 Social Competition</h5>
                                <p>Real-time leaderboards, public recognition mechanics, and social multipliers (+1.5x XP for group activities) drive engagement.</p>
                            </div>
                            <div>
                                <h5 style="color: var(--primary-color);">🔥 Streak Mechanics</h5>
                                <p>Escalating rewards for consistent engagement with "near-miss" notifications and limited-time seasonal rewards creating FOMO.</p>
                            </div>
                            <div>
                                <h5 style="color: var(--text-accent);">📈 Goal Progression</h5>
                                <p>Accelerated progression near tier thresholds with visual progress indicators boosting completion rates by 22%.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Token Economics & Sustainability -->
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                        <h4 style="color: var(--primary-color); margin-bottom: 20px;">📊 Token Economics & Sustainability</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
                            <div style="background: rgba(74, 144, 226, 0.1); padding: 20px; border-radius: 12px;">
                                <h5 style="color: var(--primary-color);">📈 Token Distribution</h5>
                                <ul style="margin: 0; padding-left: 20px;">
                                    <li><strong>40%</strong> - User rewards and mining pool</li>
                                    <li><strong>25%</strong> - Platform development and treasury</li>
                                    <li><strong>15%</strong> - Team and advisors (4-year vesting)</li>
                                    <li><strong>10%</strong> - Ecosystem partnerships</li>
                                    <li><strong>10%</strong> - Liquidity provisioning</li>
                                </ul>
                            </div>
                            <div style="background: rgba(46, 213, 115, 0.1); padding: 20px; border-radius: 12px;">
                                <h5 style="color: var(--secondary-color);">🔥 Inflation Control</h5>
                                <ul style="margin: 0; padding-left: 20px;">
                                    <li><strong>2%</strong> annual minting cap</li>
                                    <li><strong>0.5%</strong> token burn from platform revenue</li>
                                    <li>Dynamic conversion rates based on usage</li>
                                    <li>Algorithmic supply-demand balancing</li>
                                </ul>
                            </div>
                        </div>
                        <div style="background: rgba(255, 107, 107, 0.1); padding: 20px; border-radius: 12px;">
                            <h5 style="color: var(--accent-color); margin-bottom: 16px;">💡 Anti-Abuse & Balance Systems</h5>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                                <div>
                                    <strong>🛡️ Fraud Prevention</strong>
                                    <ul style="margin: 8px 0 0 20px; font-size: 14px;">
                                        <li>Behavioral analysis algorithms</li>
                                        <li>Hardware fingerprinting</li>
                                        <li>Social graph validation</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong>⚖️ Economic Stability</strong>
                                    <ul style="margin: 8px 0 0 20px; font-size: 14px;">
                                        <li>Daily caps on repetitive actions</li>
                                        <li>Quality-based multipliers</li>
                                        <li>Diminishing returns system</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Development Roadmap -->
                    <div style="background: var(--card-bg); padding: 24px; border-radius: 16px;">
                        <h4 style="color: var(--primary-color); margin-bottom: 20px;">🗺️ Development Roadmap</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
                            <div style="border-left: 4px solid var(--primary-color); padding-left: 16px;">
                                <h5 style="color: var(--primary-color);">Phase 1: Core System</h5>
                                <p style="margin: 8px 0;"><strong>Q3 2024 ✅</strong></p>
                                <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                                    <li>XP reward tracking</li>
                                    <li>Basic streak mechanics</li>
                                    <li>Creator reward pools (XP)</li>
                                    <li>Leaderboard implementation</li>
                                </ul>
                            </div>
                            <div style="border-left: 4px solid var(--secondary-color); padding-left: 16px;">
                                <h5 style="color: var(--secondary-color);">Phase 2: Token Integration</h5>
                                <p style="margin: 8px 0;"><strong>Q4 2024 🚀</strong></p>
                                <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                                    <li>$MINCHYN token deployment</li>
                                    <li>XP to token conversion</li>
                                    <li>Premium feature marketplace</li>
                                    <li>Anti-abuse systems</li>
                                </ul>
                            </div>
                            <div style="border-left: 4px solid var(--accent-color); padding-left: 16px;">
                                <h5 style="color: var(--accent-color);">Phase 3: Advanced Economy</h5>
                                <p style="margin: 8px 0;"><strong>Q1 2025 🎯</strong></p>
                                <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                                    <li>Live event integration</li>
                                    <li>Physical reward redemption</li>
                                    <li>Partnership integrations</li>
                                    <li>Advanced token economics</li>
                                </ul>
                            </div>
                            <div style="border-left: 4px solid var(--text-accent); padding-left: 16px;">
                                <h5 style="color: var(--text-accent);">Phase 4: Decentralization</h5>
                                <p style="margin: 8px 0;"><strong>Q2 2025 🌐</strong></p>
                                <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                                    <li>DAO implementation</li>
                                    <li>Decentralized distribution</li>
                                    <li>Cross-platform utility</li>
                                    <li>Open developer ecosystem</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                            <span class="feature-icon">🗳️</span>
                            <h4>Governance Rights</h4>
                            <p>Vote on platform decisions and proposals</p>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🎨</span>
                            <h4>NFT Integration</h4>
                            <p>Enhanced benefits for NFT holders</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function roadmap_shortcode($atts) {
        ob_start();
        ?>
        <div class="minchyn-roadmap" data-theme="light">
            <!-- Header Section -->
            <div class="ico-header">
                <div class="ico-header-content">
                    <div class="ico-badge">
                        <span>🗺️</span>
                        <span>Development Roadmap</span>
                    </div>
                    <h1 class="ico-title">Project Roadmap</h1>
                    <p class="ico-subtitle">
                        Our strategic timeline for building the future of decentralized entrepreneurship
                    </p>
                </div>
            </div>

            <div class="roadmap-container">
                <div class="roadmap-timeline">
                    <div class="roadmap-item">
                        <div class="roadmap-quarter">Q1 2025</div>
                        <h3 class="roadmap-title">Foundation & Launch</h3>
                        <p class="roadmap-description">
                            Establishing the core infrastructure and launching our initial platform features.
                        </p>
                        <ul class="roadmap-features">
                            <li>Smart contract deployment and auditing</li>
                            <li>ICO platform launch with token sales</li>
                            <li>Community building and early adopter program</li>
                            <li>Founding Members Club NFT collection</li>
                        </ul>
                    </div>
                    
                    <div class="roadmap-item">
                        <div class="roadmap-quarter">Q2 2025</div>
                        <h3 class="roadmap-title">Platform Development</h3>
                        <p class="roadmap-description">
                            Expanding platform capabilities and introducing advanced features for our community.
                        </p>
                        <ul class="roadmap-features">
                            <li>DEX listing and liquidity provision</li>
                            <li>MINCHYN staking platform with rewards</li>
                            <li>DAO governance implementation</li>
                            <li>Mobile app beta release</li>
                        </ul>
                    </div>
                    
                    <div class="roadmap-item">
                        <div class="roadmap-quarter">Q3 2025</div>
                        <h3 class="roadmap-title">Ecosystem Expansion</h3>
                        <p class="roadmap-description">
                            Scaling our ecosystem and establishing strategic partnerships worldwide.
                        </p>
                        <ul class="roadmap-features">
                            <li>Multi-chain integration (BSC, Polygon)</li>
                            <li>Enterprise partnership program</li>
                            <li>Advanced DeFi features and yield farming</li>
                            <li>International market expansion</li>
                        </ul>
                    </div>
                    
                    <div class="roadmap-item">
                        <div class="roadmap-quarter">Q4 2025</div>
                        <h3 class="roadmap-title">Innovation & Scale</h3>
                        <p class="roadmap-description">
                            Pioneering new technologies and scaling to serve millions of entrepreneurs globally.
                        </p>
                        <ul class="roadmap-features">
                            <li>AI-powered investment matching</li>
                            <li>Metaverse integration and virtual events</li>
                            <li>Global accelerator program launch</li>
                            <li>MINCHYN ecosystem marketplace</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function team_shortcode($atts) {
        ob_start();
        ?>
        <div class="minchyn-team" data-theme="light">
            <!-- Header Section -->
            <div class="ico-header">
                <div class="ico-header-content">
                    <div class="ico-badge">
                        <span>👥</span>
                        <span>Core Team</span>
                    </div>
                    <h1 class="ico-title">Meet Our Team</h1>
                    <p class="ico-subtitle">
                        Visionary leaders and innovators driving the future of decentralized entrepreneurship
                    </p>
                </div>
            </div>

            <div class="team-container">
                <div class="team-grid">
                    <div class="team-member">
                        <div class="member-avatar">👨‍💻</div>
                        <h3 class="member-name">John Smith</h3>
                        <p class="member-role">Founder & CEO</p>
                        <p class="member-bio">
                            Blockchain visionary with 10+ years in fintech. Led successful exits 
                            at two Web3 startups and passionate about democratizing entrepreneurship.
                        </p>
                        <div class="member-social">
                            <a href="#" class="social-link">🐦</a>
                            <a href="#" class="social-link">💼</a>
                            <a href="#" class="social-link">🌐</a>
                        </div>
                    </div>
                    
                    <div class="team-member">
                        <div class="member-avatar">👩‍💻</div>
                        <h3 class="member-name">Sarah Johnson</h3>
                        <p class="member-role">CTO & Co-Founder</p>
                        <p class="member-bio">
                            Full-stack blockchain developer and smart contract architect. Former senior 
                            engineer at leading DeFi protocols with expertise in security and scalability.
                        </p>
                        <div class="member-social">
                            <a href="#" class="social-link">🐦</a>
                            <a href="#" class="social-link">💼</a>
                            <a href="#" class="social-link">🌐</a>
                        </div>
                    </div>
                    
                    <div class="team-member">
                        <div class="member-avatar">👨‍💼</div>
                        <h3 class="member-name">Mike Davis</h3>
                        <p class="member-role">Head of Growth</p>
                        <p class="member-bio">
                            Growth strategist with proven track record in crypto marketing. 
                            Scaled multiple token projects from launch to 100M+ market cap.
                        </p>
                        <div class="member-social">
                            <a href="#" class="social-link">🐦</a>
                            <a href="#" class="social-link">💼</a>
                            <a href="#" class="social-link">🌐</a>
                        </div>
                    </div>
                    
                    <div class="team-member">
                        <div class="member-avatar">👩‍🎨</div>
                        <h3 class="member-name">Lisa Chen</h3>
                        <p class="member-role">Head of Design</p>
                        <p class="member-bio">
                            Award-winning UI/UX designer specializing in Web3 interfaces. 
                            Creates intuitive experiences that bridge traditional and decentralized worlds.
                        </p>
                        <div class="member-social">
                            <a href="#" class="social-link">🐦</a>
                            <a href="#" class="social-link">💼</a>
                            <a href="#" class="social-link">🌐</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    // Admin functions
    public function add_admin_menu() {
        add_options_page(
            'MINCHYN ICO Settings',
            'MINCHYN ICO',
            'manage_options',
            'minchyn-ico-settings',
            array($this, 'settings_page')
        );
    }
    
    public function settings_init() {
        register_setting('minchyn_ico_settings', 'minchyn_ico_settings');
        
        // Add settings sections and fields here
    }
    
    public function settings_page() {
        ?>
        <div class="wrap">
            <h1>MINCHYN ICO Platform Settings</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('minchyn_ico_settings');
                do_settings_sections('minchyn_ico_settings');
                submit_button();
                ?>
            </form>
            
            <div class="minchyn-ico-usage">
                <h2>Available Shortcodes</h2>
                <ul>
                    <li><code>[minchyn_ico_dashboard]</code> - Complete ICO dashboard</li>
                    <li><code>[minchyn_token_purchase]</code> - Token purchase interface</li>
                    <li><code>[minchyn_token_info]</code> - Token information and tokenomics</li>
                    <li><code>[minchyn_nft_mint]</code> - NFT minting interface</li>
                    <li><code>[minchyn_roadmap]</code> - Project roadmap timeline</li>
                    <li><code>[minchyn_team]</code> - Team member profiles</li>
                </ul>
            </div>
        </div>
        <?php
    }
    
    public function activate() {
        // Set default options
        $default_settings = array(
            'token_contract' => '0x...',
            'ico_contract' => '0x...',
            'nft_contract' => '0xa548Fa1d539CAB8d78163cb064F7b22E6EF34B2f',
            'token_price' => '0.0001',
            'rpc_url' => 'https://eth.llamarpc.com'
        );
        
        if (!get_option('minchyn_ico_settings')) {
            add_option('minchyn_ico_settings', $default_settings);
        }
    }
    
    public function deactivate() {
        // Cleanup if needed
    }
    
    private function render_nft_minting($atts) {
        // Simple NFT minting interface
        ob_start();
        ?>
        <div class="minchyn-nft-mint">
            <h3>🎨 Mint Ugly Unicorns NFT</h3>
            <p>Connect your wallet and mint exclusive NFTs!</p>
            <button id="mint-nft-simple" class="btn btn-mint">Mint NFT (0.08 ETH)</button>
        </div>
        <?php
        return ob_get_clean();
    }
}

// Initialize the plugin
new MinchynICOPlatform();