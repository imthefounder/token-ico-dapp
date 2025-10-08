<?php
/**
 * Plugin Name: Ugly Unicorns NFT Minting
 * Plugin URI: https://yoursite.com/ugly-unicorns-nft-minting
 * Description: A WordPress plugin that allows users to mint Ugly Unicorns NFTs directly from your WordPress site using Web3 technology.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yoursite.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: ugly-unicorns-nft
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
define('UGLY_UNICORNS_NFT_VERSION', '1.0.0');
define('UGLY_UNICORNS_NFT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('UGLY_UNICORNS_NFT_PLUGIN_PATH', plugin_dir_path(__FILE__));

class UglyUnicornsNFTMinting {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('ugly_unicorns_nft_mint', array($this, 'nft_mint_shortcode'));
        add_shortcode('ugly_unicorns_collection', array($this, 'collection_preview_shortcode'));
        add_shortcode('nft_holders_marquee', array($this, 'nft_holders_marquee_shortcode'));
        add_shortcode('nft_preview_grid', array($this, 'nft_preview_grid_shortcode'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'settings_init'));
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        // Initialize plugin
        load_plugin_textdomain('ugly-unicorns-nft', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        // Enqueue Web3 and Ethers.js with fallback
        wp_enqueue_script('ethers-js', 'https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js', array(), '5.7.2', true);
        
        // Add fallback script loading
        wp_add_inline_script('ethers-js', '
            // Check if ethers loaded, if not try alternative CDN
            if (typeof window.ethers === "undefined") {
                console.warn("Primary ethers.js CDN failed, trying fallback...");
                var script = document.createElement("script");
                script.src = "https://unpkg.com/ethers@5.7.2/dist/ethers.umd.min.js";
                script.onload = function() {
                    console.log("Ethers.js loaded from fallback CDN");
                };
                script.onerror = function() {
                    console.error("Failed to load ethers.js from all CDNs");
                };
                document.head.appendChild(script);
            } else {
                console.log("Ethers.js loaded successfully from primary CDN");
            }
        ', 'after');
        
        // Enqueue plugin CSS - use modern styling
        wp_enqueue_style('ugly-unicorns-nft-style', UGLY_UNICORNS_NFT_PLUGIN_URL . 'assets/style-modern.css', array(), UGLY_UNICORNS_NFT_VERSION);
        
        // Enqueue plugin JS (load after ethers)
        wp_enqueue_script('ugly-unicorns-nft-script', UGLY_UNICORNS_NFT_PLUGIN_URL . 'assets/script.js', array('jquery', 'ethers-js'), UGLY_UNICORNS_NFT_VERSION, true);
        
        // Localize script with settings
        $settings = get_option('ugly_unicorns_nft_settings', array());
        wp_localize_script('ugly-unicorns-nft-script', 'uglyUnicornsNFT', array(
            'contractAddress' => isset($settings['contract_address']) ? $settings['contract_address'] : '0xa548Fa1d539CAB8d78163cb064F7b22E6EF34B2f',
            'mintPrice' => isset($settings['mint_price']) ? $settings['mint_price'] : '0.08',
            'maxSupply' => isset($settings['max_supply']) ? $settings['max_supply'] : '22222',
            'rpcUrl' => isset($settings['rpc_url']) ? $settings['rpc_url'] : 'https://eth.llamarpc.com',
            'openseaCollection' => isset($settings['opensea_collection']) ? $settings['opensea_collection'] : 'https://opensea.io/collection/ugly-unicorns-official',
            'nonce' => wp_create_nonce('ugly_unicorns_nft_nonce'),
            'ajaxUrl' => admin_url('admin-ajax.php')
        ));
    }
    
    public function nft_mint_shortcode($atts) {
        $atts = shortcode_atts(array(
            'theme' => 'dark',
            'button_text' => 'Mint NFT',
            'show_stats' => 'true',
            'show_preview' => 'true'
        ), $atts);
        
        ob_start();
        ?>
        <div class="ugly-unicorns-nft-minting" data-theme="<?php echo esc_attr($atts['theme']); ?>">
            
            <!-- Hero Section with Description -->
            <div class="nft-hero-section">
                <div class="hero-content">
                    <div class="hero-badge">
                        <span class="badge-icon">🦄</span>
                        <span class="badge-text">Exclusive NFT Collection</span>
                    </div>
                    
                    <h1 class="hero-title">Ugly Unicorns NFT</h1>
                    <h2 class="hero-subtitle">Your Gateway to the Founding Members Club</h2>
                    
                    <div class="hero-description">
                        <p class="lead-text">
                            Join an exclusive community of visionary entrepreneurs and crypto pioneers. 
                            Each Ugly Unicorns NFT is your membership pass to our Founding Members Club.
                        </p>
                        
                        <div class="benefits-grid">
                            <div class="benefit-item">
                                <div class="benefit-icon">🎯</div>
                                <div class="benefit-content">
                                    <h4>Co-Founder Status</h4>
                                    <p>Gain equity and voting rights in our revolutionary startup ecosystem</p>
                                </div>
                            </div>
                            
                            <div class="benefit-item">
                                <div class="benefit-icon">💰</div>
                                <div class="benefit-content">
                                    <h4>Daily $MINCHYN Rewards</h4>
                                    <p>Earn 100 $MINCHYN tokens initially + 10 tokens daily for each NFT you hold</p>
                                </div>
                            </div>
                            
                            <div class="benefit-item">
                                <div class="benefit-icon">🌟</div>
                                <div class="benefit-content">
                                    <h4>Exclusive Access</h4>
                                    <p>Private Discord channels, early project access, and founder-only events</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="value-proposition">
                            <div class="value-item">
                                <span class="value-number">22,222</span>
                                <span class="value-label">Limited Supply</span>
                            </div>
                            <div class="value-item">
                                <span class="value-number">0.08 ETH</span>
                                <span class="value-label">Mint Price</span>
                            </div>
                            <div class="value-item">
                                <span class="value-number">∞</span>
                                <span class="value-label">$MINCHYN Rewards</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MetaMask Check -->
            <div id="metamask-check" class="metamask-check">
                <div class="wallet-status">
                    <div id="wallet-not-connected" class="wallet-message">
                        <h3>🦄 Connect Your Wallet to Join the Club</h3>
                        <p>Connect your MetaMask wallet to mint your Ugly Unicorns NFT and become a founding member!</p>
                        <button id="connect-wallet-btn" class="btn btn-primary">Connect MetaMask</button>
                    </div>
                    <div id="wallet-connected" class="wallet-message" style="display: none;">
                        <h3>✅ Wallet Connected</h3>
                        <div class="wallet-info">
                            <span>Address: <span id="wallet-address"></span></span>
                            <span>Balance: <span id="wallet-balance"></span> ETH</span>
                            <span>Your NFTs: <span id="user-balance">0</span></span>
                        </div>
                    </div>
                </div>
            </div>

            <?php if ($atts['show_stats'] === 'true'): ?>
            <!-- NFT Stats -->
            <div class="nft-stats">
                <h3 class="stats-title">Collection Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <h4>Total Minted</h4>
                            <span id="total-minted" class="stat-value">Loading...</span>
                            <small>Unique NFTs Created</small>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-content">
                            <h4>Max Supply</h4>
                            <span id="max-supply" class="stat-value">22,222</span>
                            <small>Limited Edition</small>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">💎</div>
                        <div class="stat-content">
                            <h4>Mint Price</h4>
                            <span id="mint-price" class="stat-value">0.08 ETH</span>
                            <small>Per NFT</small>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">🏆</div>
                        <div class="stat-content">
                            <h4>Your Collection</h4>
                            <span id="user-balance" class="stat-value">0</span>
                            <small>NFTs Owned</small>
                        </div>
                    </div>
                </div>
            </div>
            <?php endif; ?>

            <!-- Minting Interface -->
            <div class="minting-interface">
                <div class="mint-header">
                    <h3>🎨 Mint Your Ugly Unicorns NFT</h3>
                    <p>Each NFT grants you immediate access to our exclusive Founding Members Club</p>
                </div>
                
                <div class="mint-controls">
                    <div class="quantity-section">
                        <div class="quantity-selector">
                            <label for="mint-quantity" class="quantity-label">Select Quantity</label>
                            <div class="quantity-input-group">
                                <button id="quantity-minus" class="quantity-btn btn-minus">−</button>
                                <input type="number" id="mint-quantity" min="1" max="10" value="1" class="quantity-input">
                                <button id="quantity-plus" class="quantity-btn btn-plus">+</button>
                            </div>
                            <small class="quantity-note">Maximum 10 NFTs per transaction</small>
                        </div>
                        
                        <div class="cost-breakdown">
                            <div class="cost-item">
                                <span class="cost-label">Price per NFT:</span>
                                <span class="cost-value">0.08 ETH</span>
                            </div>
                            <div class="cost-item total">
                                <span class="cost-label">Total Cost:</span>
                                <span class="cost-value" id="total-cost">0.08 ETH</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mint-action">
                        <button id="mint-nft-btn" class="btn btn-mint" disabled>
                            <span class="btn-icon">🦄</span>
                            <span class="btn-text"><?php echo esc_html($atts['button_text']); ?></span>
                            <span class="btn-arrow">→</span>
                        </button>
                        
                        <div class="security-note">
                            <div class="security-icon">🔒</div>
                            <small>Secure transaction via MetaMask • Your wallet, your control</small>
                        </div>
                    </div>
                </div>
                
                <div class="minting-status" id="minting-status" style="display: none;">
                    <div class="status-container">
                        <div class="status-icon">
                            <div class="spinner"></div>
                        </div>
                        <div class="status-content">
                            <h4 id="status-title">Processing Transaction</h4>
                            <p id="status-text">Preparing your NFT mint...</p>
                            <div class="progress-bar">
                                <div class="progress-fill" id="progress-fill"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <?php if ($atts['show_preview'] === 'true'): ?>
            <!-- Collection Preview -->
            <div class="collection-preview">
                <h3>Collection Preview</h3>
                <div class="nft-grid" id="nft-preview-grid">
                    <div class="loading-message">Loading collection preview...</div>
                </div>
            </div>
            <?php endif; ?>

            <!-- Success/Error Messages -->
            <div id="transaction-result" class="transaction-result" style="display: none;">
                <div class="result-content">
                    <div id="success-message" class="success-message" style="display: none;">
                        <h3>🎉 Minting Successful!</h3>
                        <p>Your Ugly Unicorn NFT has been minted successfully!</p>
                        <div class="transaction-links">
                            <a id="etherscan-link" href="#" target="_blank" class="btn btn-secondary">View on Etherscan</a>
                            <a id="opensea-link" href="#" target="_blank" class="btn btn-secondary">View on OpenSea</a>
                        </div>
                    </div>
                    <div id="error-message" class="error-message" style="display: none;">
                        <h3>❌ Minting Failed</h3>
                        <p id="error-text">An error occurred during minting.</p>
                        <button id="retry-btn" class="btn btn-primary">Try Again</button>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function collection_preview_shortcode($atts) {
        $atts = shortcode_atts(array(
            'limit' => '4',
            'columns' => '4',
            'show_traits' => 'true'
        ), $atts);
        
        ob_start();
        ?>
        <div class="ugly-unicorns-collection-preview">
            <div class="collection-grid" data-columns="<?php echo esc_attr($atts['columns']); ?>">
                <div id="collection-loading">Loading collection...</div>
            </div>
        </div>
        
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            loadCollectionPreview(<?php echo intval($atts['limit']); ?>, <?php echo $atts['show_traits'] === 'true' ? 'true' : 'false'; ?>);
        });
        </script>
        <?php
        return ob_get_clean();
    }
    
    public function nft_holders_marquee_shortcode($atts) {
        $atts = shortcode_atts(array(
            'speed' => '50',
            'direction' => 'left',
            'limit' => '20'
        ), $atts);
        
        // Read CSV data
        $csv_file = UGLY_UNICORNS_NFT_PLUGIN_PATH . 'assets/export-token-0xa548fa1d539cab8d78163cb064f7b22e6ef34b2f.csv';
        $holders_data = array();
        
        if (file_exists($csv_file)) {
            $handle = fopen($csv_file, 'r');
            $header = fgetcsv($handle); // Skip header
            $count = 0;
            
            while (($data = fgetcsv($handle)) !== FALSE && $count < intval($atts['limit'])) {
                $holders_data[] = array(
                    'rank' => $data[0],
                    'address' => $data[1],
                    'name' => !empty($data[2]) ? $data[2] : 'Anonymous',
                    'quantity' => $data[3],
                    'percentage' => $data[4]
                );
                $count++;
            }
            fclose($handle);
        }
        
        ob_start();
        ?>
        <div class="nft-holders-marquee-container">
            <style>
                .nft-holders-marquee-container {
                    width: 100%;
                    overflow: hidden;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 20px 0;
                    margin: 20px 0;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
                
                .marquee-header {
                    text-align: center;
                    color: white;
                    margin-bottom: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                
                .holders-marquee {
                    display: flex;
                    animation: scroll-<?php echo esc_attr($atts['direction']); ?> <?php echo esc_attr($atts['speed']); ?>s linear infinite;
                    gap: 30px;
                    padding: 0 20px;
                }
                
                .holder-item {
                    display: flex;
                    align-items: center;
                    background: rgba(255,255,255,0.15);
                    backdrop-filter: blur(10px);
                    padding: 12px 20px;
                    border-radius: 25px;
                    min-width: 280px;
                    border: 1px solid rgba(255,255,255,0.2);
                    transition: transform 0.3s ease;
                }
                
                .holder-item:hover {
                    transform: translateY(-3px);
                    background: rgba(255,255,255,0.25);
                }
                
                .holder-rank {
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    color: #333;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-weight: bold;
                    font-size: 14px;
                    margin-right: 15px;
                    min-width: 35px;
                    text-align: center;
                    box-shadow: 0 2px 8px rgba(255,215,0,0.3);
                }
                
                .holder-info {
                    flex: 1;
                    color: white;
                }
                
                .holder-name {
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 4px;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                }
                
                .holder-address {
                    font-size: 12px;
                    opacity: 0.8;
                    font-family: monospace;
                }
                
                .holder-stats {
                    text-align: right;
                    color: white;
                }
                
                .holder-quantity {
                    font-size: 18px;
                    font-weight: bold;
                    color: #FFD700;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                }
                
                .holder-percentage {
                    font-size: 12px;
                    opacity: 0.8;
                }
                
                @keyframes scroll-left {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                
                @keyframes scroll-right {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @media (max-width: 768px) {
                    .holder-item {
                        min-width: 250px;
                        padding: 10px 15px;
                    }
                    
                    .holder-name {
                        font-size: 14px;
                    }
                    
                    .holder-quantity {
                        font-size: 16px;
                    }
                }
            </style>
            
            <div class="marquee-header">
                🦄 Top NFT Holders • Live on Blockchain
            </div>
            
            <div class="holders-marquee">
                <?php foreach ($holders_data as $holder): ?>
                    <div class="holder-item">
                        <div class="holder-rank">#<?php echo esc_html($holder['rank']); ?></div>
                        <div class="holder-info">
                            <div class="holder-name"><?php echo esc_html($holder['name']); ?></div>
                            <div class="holder-address"><?php echo esc_html(substr($holder['address'], 0, 10) . '...' . substr($holder['address'], -8)); ?></div>
                        </div>
                        <div class="holder-stats">
                            <div class="holder-quantity"><?php echo esc_html($holder['quantity']); ?> NFTs</div>
                            <div class="holder-percentage"><?php echo esc_html($holder['percentage']); ?></div>
                        </div>
                    </div>
                <?php endforeach; ?>
                
                <!-- Duplicate items for seamless loop -->
                <?php foreach ($holders_data as $holder): ?>
                    <div class="holder-item">
                        <div class="holder-rank">#<?php echo esc_html($holder['rank']); ?></div>
                        <div class="holder-info">
                            <div class="holder-name"><?php echo esc_html($holder['name']); ?></div>
                            <div class="holder-address"><?php echo esc_html(substr($holder['address'], 0, 10) . '...' . substr($holder['address'], -8)); ?></div>
                        </div>
                        <div class="holder-stats">
                            <div class="holder-quantity"><?php echo esc_html($holder['quantity']); ?> NFTs</div>
                            <div class="holder-percentage"><?php echo esc_html($holder['percentage']); ?></div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function nft_preview_grid_shortcode($atts) {
        $atts = shortcode_atts(array(
            'limit' => '4',
            'show_stats' => 'true'
        ), $atts);
        
        // Read CSV data for top holders
        $csv_file = UGLY_UNICORNS_NFT_PLUGIN_PATH . 'assets/export-token-0xa548fa1d539cab8d78163cb064f7b22e6ef34b2f.csv';
        $holders_data = array();
        
        if (file_exists($csv_file)) {
            $handle = fopen($csv_file, 'r');
            $header = fgetcsv($handle); // Skip header
            $count = 0;
            
            while (($data = fgetcsv($handle)) !== FALSE && $count < intval($atts['limit'])) {
                $holders_data[] = array(
                    'rank' => $data[0],
                    'address' => $data[1],
                    'name' => !empty($data[2]) ? $data[2] : 'Anonymous Holder',
                    'quantity' => $data[3],
                    'percentage' => $data[4]
                );
                $count++;
            }
            fclose($handle);
        }
        
        // Sample NFT images
        $nft_images = array(
            UGLY_UNICORNS_NFT_PLUGIN_URL . 'assets/img/unicorn1.avif',
            UGLY_UNICORNS_NFT_PLUGIN_URL . 'assets/img/unicorn2.avif',
            UGLY_UNICORNS_NFT_PLUGIN_URL . 'assets/img/unicorn3.avif',
            UGLY_UNICORNS_NFT_PLUGIN_URL . 'assets/img/unicorn4.avif'
        );
        
        ob_start();
        ?>
        <div class="nft-preview-grid-container">
            <style>
                .nft-preview-grid-container {
                    padding: 30px 0;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    border-radius: 20px;
                    margin: 20px 0;
                }
                
                .grid-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                
                .grid-title {
                    font-size: 28px;
                    font-weight: bold;
                    color: #2d3748;
                    margin-bottom: 10px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .grid-subtitle {
                    font-size: 16px;
                    color: #718096;
                    margin-bottom: 0;
                }
                
                .nft-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 25px;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }
                
                .nft-card {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .nft-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.2);
                }
                
                .nft-image-container {
                    position: relative;
                    height: 280px;
                    overflow: hidden;
                }
                
                .nft-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }
                
                .nft-card:hover .nft-image {
                    transform: scale(1.05);
                }
                
                .nft-rank-badge {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    color: #333;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-weight: bold;
                    font-size: 14px;
                    box-shadow: 0 4px 15px rgba(255,215,0,0.4);
                }
                
                .nft-card-content {
                    padding: 25px;
                }
                
                .holder-profile {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }
                
                .holder-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 18px;
                    margin-right: 15px;
                    box-shadow: 0 4px 15px rgba(102,126,234,0.3);
                }
                
                .holder-details h3 {
                    margin: 0 0 5px 0;
                    font-size: 18px;
                    color: #2d3748;
                    font-weight: bold;
                }
                
                .holder-address {
                    font-size: 12px;
                    color: #718096;
                    font-family: monospace;
                }
                
                .nft-stats {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    border-top: 1px solid #e2e8f0;
                    border-bottom: 1px solid #e2e8f0;
                    margin: 15px 0;
                }
                
                .stat-item {
                    text-align: center;
                    flex: 1;
                }
                
                .stat-value {
                    font-size: 20px;
                    font-weight: bold;
                    color: #667eea;
                    display: block;
                }
                
                .stat-label {
                    font-size: 12px;
                    color: #718096;
                    text-transform: uppercase;
                    margin-top: 5px;
                }
                
                .view-collection-btn {
                    width: 100%;
                    padding: 12px 20px;
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                    text-align: center;
                }
                
                .view-collection-btn:hover {
                    background: linear-gradient(45deg, #5a67d8, #6b46c1);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(102,126,234,0.3);
                    color: white;
                    text-decoration: none;
                }
                
                @media (max-width: 768px) {
                    .nft-grid {
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 20px;
                        padding: 0 15px;
                    }
                    
                    .grid-title {
                        font-size: 24px;
                    }
                    
                    .nft-card-content {
                        padding: 20px;
                    }
                }
            </style>
            
            <div class="grid-header">
                <h2 class="grid-title">🏆 Top NFT Holders Collection</h2>
                <p class="grid-subtitle">Discover the most valuable collections from our community leaders</p>
            </div>
            
            <div class="nft-grid">
                <?php foreach ($holders_data as $index => $holder): ?>
                    <div class="nft-card">
                        <div class="nft-image-container">
                            <img src="<?php echo esc_url($nft_images[$index % count($nft_images)]); ?>" 
                                 alt="Ugly Unicorn NFT #<?php echo esc_attr($holder['rank']); ?>" 
                                 class="nft-image">
                            <div class="nft-rank-badge">Rank #<?php echo esc_html($holder['rank']); ?></div>
                        </div>
                        
                        <div class="nft-card-content">
                            <div class="holder-profile">
                                <div class="holder-avatar">
                                    <?php echo esc_html(strtoupper(substr($holder['name'], 0, 1))); ?>
                                </div>
                                <div class="holder-details">
                                    <h3><?php echo esc_html($holder['name']); ?></h3>
                                    <div class="holder-address"><?php echo esc_html(substr($holder['address'], 0, 10) . '...' . substr($holder['address'], -8)); ?></div>
                                </div>
                            </div>
                            
                            <?php if ($atts['show_stats'] === 'true'): ?>
                            <div class="nft-stats">
                                <div class="stat-item">
                                    <span class="stat-value"><?php echo esc_html($holder['quantity']); ?></span>
                                    <div class="stat-label">NFTs Owned</div>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-value"><?php echo esc_html(str_replace('%', '', $holder['percentage'])); ?>%</span>
                                    <div class="stat-label">Portfolio</div>
                                </div>
                            </div>
                            <?php endif; ?>
                            
                            <a href="https://opensea.io/<?php echo esc_attr($holder['address']); ?>" 
                               target="_blank" 
                               class="view-collection-btn">
                                View Collection on OpenSea
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function add_admin_menu() {
        add_options_page(
            'Ugly Unicorns NFT Settings',
            'Ugly Unicorns NFT',
            'manage_options',
            'ugly-unicorns-nft-settings',
            array($this, 'settings_page')
        );
    }
    
    public function settings_init() {
        register_setting('ugly_unicorns_nft_settings', 'ugly_unicorns_nft_settings');
        
        add_settings_section(
            'ugly_unicorns_nft_contract_section',
            'Contract Settings',
            array($this, 'contract_section_callback'),
            'ugly_unicorns_nft_settings'
        );
        
        add_settings_field(
            'contract_address',
            'Contract Address',
            array($this, 'contract_address_callback'),
            'ugly_unicorns_nft_settings',
            'ugly_unicorns_nft_contract_section'
        );
        
        add_settings_field(
            'rpc_url',
            'RPC URL',
            array($this, 'rpc_url_callback'),
            'ugly_unicorns_nft_settings',
            'ugly_unicorns_nft_contract_section'
        );
        
        add_settings_field(
            'opensea_collection',
            'OpenSea Collection URL',
            array($this, 'opensea_collection_callback'),
            'ugly_unicorns_nft_settings',
            'ugly_unicorns_nft_contract_section'
        );
    }
    
    public function contract_section_callback() {
        echo '<p>Configure your NFT contract settings below:</p>';
    }
    
    public function contract_address_callback() {
        $settings = get_option('ugly_unicorns_nft_settings');
        $value = isset($settings['contract_address']) ? $settings['contract_address'] : '0xa548Fa1d539CAB8d78163cb064F7b22E6EF34B2f';
        echo '<input type="text" name="ugly_unicorns_nft_settings[contract_address]" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">Your NFT contract address on Ethereum mainnet. Current default is a placeholder - replace with your actual deployed contract address to show real-time data.</p>';
        echo '<p class="description"><strong>Note:</strong> The plugin will attempt to auto-detect contract functions. Check browser console for debugging information about contract compatibility.</p>';
    }
    
    public function rpc_url_callback() {
        $settings = get_option('ugly_unicorns_nft_settings');
        $value = isset($settings['rpc_url']) ? $settings['rpc_url'] : 'https://eth.llamarpc.com';
        echo '<input type="url" name="ugly_unicorns_nft_settings[rpc_url]" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">The RPC URL for connecting to the Ethereum network.</p>';
    }
    
    public function opensea_collection_callback() {
        $settings = get_option('ugly_unicorns_nft_settings');
        $value = isset($settings['opensea_collection']) ? $settings['opensea_collection'] : 'https://opensea.io/collection/ugly-unicorns-official';
        echo '<input type="url" name="ugly_unicorns_nft_settings[opensea_collection]" value="' . esc_attr($value) . '" class="regular-text" />';
        echo '<p class="description">The OpenSea collection URL for your NFTs.</p>';
    }
    
    public function settings_page() {
        ?>
        <div class="wrap">
            <h1>Ugly Unicorns NFT Settings</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('ugly_unicorns_nft_settings');
                do_settings_sections('ugly_unicorns_nft_settings');
                submit_button();
                ?>
            </form>
            
            <div class="ugly-unicorns-usage">
                <h2>How to Use</h2>
                <h3>Shortcodes:</h3>
                <p><strong>Basic NFT Minting:</strong></p>
                <code>[ugly_unicorns_nft_mint]</code>
                
                <p><strong>Custom NFT Minting:</strong></p>
                <code>[ugly_unicorns_nft_mint theme="light" button_text="Mint Unicorn" show_stats="true" show_preview="false"]</code>
                
                <p><strong>Collection Preview Only:</strong></p>
                <code>[ugly_unicorns_collection limit="6" columns="3" show_traits="true"]</code>
                
                <p><strong>NFT Holders Marquee:</strong></p>
                <code>[nft_holders_marquee speed="50" direction="left" limit="20"]</code>
                
                <p><strong>NFT Preview Grid (Top Holders):</strong></p>
                <code>[nft_preview_grid limit="4" show_stats="true"]</code>
                
                <h3>Parameters:</h3>
                <ul>
                    <li><strong>theme:</strong> "dark" or "light" (default: dark)</li>
                    <li><strong>button_text:</strong> Custom text for mint button (default: "Mint NFT")</li>
                    <li><strong>show_stats:</strong> Show collection statistics (default: true)</li>
                    <li><strong>show_preview:</strong> Show collection preview (default: true)</li>
                    <li><strong>limit:</strong> Number of NFTs to show in preview (default: 4)</li>
                    <li><strong>columns:</strong> Number of columns in grid (default: 4)</li>
                    <li><strong>show_traits:</strong> Show NFT traits (default: true)</li>
                    <li><strong>speed:</strong> Marquee animation speed in seconds (default: 50)</li>
                    <li><strong>direction:</strong> Marquee scroll direction "left" or "right" (default: left)</li>
                </ul>
                
                <h3>New Features:</h3>
                <p><strong>NFT Holders Marquee:</strong> Displays a scrolling marquee of top NFT holders from real blockchain data. Shows holder rank, name/ENS, wallet address, NFT quantity, and percentage of total supply.</p>
                
                <p><strong>NFT Preview Grid:</strong> Shows a 4-card grid featuring the top NFT holders with their collection previews, stats, and direct links to their OpenSea collections. Uses real holder data from the blockchain.</p>
            </div>
        </div>
        <?php
    }
    
    public function activate() {
        // Set default options
        $default_settings = array(
            'contract_address' => '0xa548Fa1d539CAB8d78163cb064F7b22E6EF34B2f',
            'rpc_url' => 'https://eth.llamarpc.com',
            'opensea_collection' => 'https://opensea.io/collection/ugly-unicorns-official',
            'mint_price' => '0.08',
            'max_supply' => '22222'
        );
        
        if (!get_option('ugly_unicorns_nft_settings')) {
            add_option('ugly_unicorns_nft_settings', $default_settings);
        }
    }
    
    public function deactivate() {
        // Cleanup if needed
    }
}

// Initialize the plugin
new UglyUnicornsNFTMinting();