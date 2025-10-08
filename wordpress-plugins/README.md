# WordPress Plugins for Ugly Unicorns & MINCHYN ICO

This directory contains two WordPress plugins that allow you to integrate your ICO and NFT minting functionality directly into any WordPress website.

## 🎨 Plugin 1: Ugly Unicorns NFT Minting

**Directory:** `ugly-unicorns-nft-minting/`

A standalone WordPress plugin specifically for NFT minting functionality.

### Features:
- ✅ MetaMask wallet integration
- ✅ NFT minting interface with quantity selection
- ✅ Collection preview with sample NFTs
- ✅ Real-time statistics (total minted, price, user balance)
- ✅ Transaction status tracking
- ✅ Mobile-responsive design
- ✅ Light/dark theme support
- ✅ Admin settings panel
- ✅ Shortcode support for easy integration

### Installation:

1. **Upload the plugin:**
   - Zip the `ugly-unicorns-nft-minting` folder
   - Go to WordPress Admin → Plugins → Add New → Upload Plugin
   - Upload the zip file and activate

2. **Configure settings:**
   - Go to Settings → Ugly Unicorns NFT
   - Enter your contract address (default: `0xa548Fa1d539CAB8d78163cb064F7b22E6EF34B2f`)
   - Configure RPC URL and OpenSea collection URL

3. **Add to your pages:**
   ```
   [ugly_unicorns_nft_mint]
   ```

### Shortcode Options:

```php
// Basic minting interface
[ugly_unicorns_nft_mint]

// Customized version
[ugly_unicorns_nft_mint theme="light" button_text="Mint Unicorn" show_stats="true" show_preview="false"]

// Collection preview only
[ugly_unicorns_collection limit="6" columns="3" show_traits="true"]
```

## 🚀 Plugin 2: MINCHYN ICO Platform

**Directory:** `minchyn-ico-platform/`

A comprehensive ICO platform with token purchasing, NFT minting, and dashboard functionality.

### Features:
- ✅ Complete ICO dashboard
- ✅ Token purchasing interface
- ✅ Real-time ICO statistics and progress
- ✅ Tokenomics information display
- ✅ Project roadmap timeline
- ✅ Team member profiles
- ✅ NFT minting integration
- ✅ MetaMask integration
- ✅ Multiple shortcodes for different sections

### Installation:

1. **Upload the plugin:**
   - Zip the `minchyn-ico-platform` folder
   - Go to WordPress Admin → Plugins → Add New → Upload Plugin
   - Upload the zip file and activate

2. **Configure settings:**
   - Go to Settings → MINCHYN ICO
   - Enter your contract addresses
   - Configure token price and RPC settings

3. **Add to your pages:**
   ```
   [minchyn_ico_dashboard]
   ```

### Available Shortcodes:

```php
// Complete ICO dashboard
[minchyn_ico_dashboard theme="dark" show_stats="true" show_progress="true"]

// Token purchase interface
[minchyn_token_purchase max_purchase="1000000" min_purchase="100"]

// Token information and tokenomics
[minchyn_token_info layout="grid" show_chart="true"]

// NFT minting (simplified)
[minchyn_nft_mint]

// Project roadmap
[minchyn_roadmap]

// Team profiles
[minchyn_team]
```

## 🛠️ Technical Requirements

### WordPress Requirements:
- WordPress 5.0 or higher
- PHP 7.4 or higher
- Modern browser with JavaScript enabled

### User Requirements:
- MetaMask browser extension
- Ethereum wallet with ETH for transactions
- Connection to Ethereum mainnet

## 📱 Mobile Support

Both plugins are fully responsive and work on:
- Desktop browsers
- Mobile browsers with MetaMask mobile app
- Tablet devices

## 🎨 Customization

### CSS Customization:
You can override the plugin styles by adding custom CSS to your theme:

```css
/* Dark theme customizations */
.ugly-unicorns-nft-minting[data-theme="dark"] {
    background: your-custom-gradient;
}

/* Button customizations */
.btn-mint {
    background: your-custom-color;
}
```

### Theme Integration:
The plugins automatically adapt to your theme's color scheme when using `theme="light"` parameter.

## 🔧 Configuration Examples

### Basic NFT Page Setup:
```php
// Create a page called "Mint NFTs"
[ugly_unicorns_nft_mint theme="dark" show_stats="true"]
```

### Complete ICO Landing Page:
```php
// Hero section
[minchyn_ico_dashboard]

// Token information
[minchyn_token_info]

// Purchase section  
[minchyn_token_purchase]

// Roadmap
[minchyn_roadmap]

// Team
[minchyn_team]
```

### Collection Gallery Page:
```php
[ugly_unicorns_collection limit="12" columns="4" show_traits="true"]
```

## 🚀 Advanced Usage

### Embedding in Theme Templates:

```php
// In your theme's PHP files
echo do_shortcode('[ugly_unicorns_nft_mint]');
echo do_shortcode('[minchyn_ico_dashboard]');
```

### Multiple Instances:
You can use multiple shortcodes on the same page for different sections.

## 🆘 Troubleshooting

### Common Issues:

1. **MetaMask not connecting:**
   - Ensure MetaMask is installed and unlocked
   - Check if website is on the correct network (Ethereum Mainnet)

2. **Styling issues:**
   - Check for CSS conflicts with your theme
   - Try adding `!important` to custom styles

3. **Contract errors:**
   - Verify contract addresses in settings
   - Ensure contracts are deployed and verified

4. **Transaction failures:**
   - Check user has sufficient ETH for gas
   - Verify contract mint conditions are met

## 📞 Support

For technical support or customization requests, please contact the plugin developer.

## 📄 License

Both plugins are licensed under GPL v2 or later, same as WordPress.

---

**Ready to launch your ICO on WordPress!** 🚀