# 🚀 WordPress Plugin Installation Guide

## Quick Start - 5 Minutes to Launch!

### Step 1: Download & Install

1. **Zip the plugin folders:**
   - Right-click on `ugly-unicorns-nft-minting` folder → "Send to" → "Compressed folder"
   - Right-click on `minchyn-ico-platform` folder → "Send to" → "Compressed folder"

2. **Upload to WordPress:**
   - Go to your WordPress Admin Dashboard
   - Navigate to **Plugins** → **Add New** → **Upload Plugin**
   - Upload each zip file and click **Activate**

### Step 2: Configure Settings

#### For NFT Minting Plugin:
```
WordPress Admin → Settings → Ugly Unicorns NFT
```
- **Contract Address:** `0xa548Fa1d539CAB8d78163cb064F7b22E6EF34B2f`
- **RPC URL:** `https://eth.llamarpc.com`
- **OpenSea Collection:** `https://opensea.io/collection/ugly-unicorns-official`

#### For ICO Platform Plugin:
```
WordPress Admin → Settings → MINCHYN ICO
```
- **Token Contract:** Your MINCHYN token contract address
- **ICO Contract:** Your ICO contract address  
- **NFT Contract:** `0xa548Fa1d539CAB8d78163cb064F7b22E6EF34B2f`
- **Token Price:** `0.0001`

### Step 3: Add to Your Pages

#### Create an NFT Minting Page:
1. **Pages** → **Add New**
2. **Title:** "Mint Ugly Unicorns NFT"
3. **Content:** 
```
[ugly_unicorns_nft_mint theme="dark" show_stats="true" show_preview="true"]
```

#### Create a Complete ICO Landing Page:
1. **Pages** → **Add New**
2. **Title:** "MINCHYN ICO - Join the Revolution"
3. **Content:**
```
<!-- Hero Dashboard Section -->
[minchyn_ico_dashboard theme="dark" show_stats="true" show_progress="true"]

<!-- Token Information -->
<h2>About MINCHYN Token</h2>
[minchyn_token_info layout="grid" show_chart="true"]

<!-- Purchase Section -->
<h2>Purchase Tokens</h2>
[minchyn_token_purchase max_purchase="1000000" min_purchase="100"]

<!-- Project Roadmap -->
[minchyn_roadmap]

<!-- Team Section -->
[minchyn_team]

<!-- Collection Preview -->
<h2>Mint Exclusive NFTs</h2>
[ugly_unicorns_collection limit="8" columns="4" show_traits="true"]
```

## 🎨 Customization Examples

### Landing Page Layouts

#### Option 1: ICO-Focused Landing
```
[minchyn_ico_dashboard]
[minchyn_token_purchase]
[minchyn_roadmap]
```

#### Option 2: NFT-Focused Landing
```
[ugly_unicorns_nft_mint]
[ugly_unicorns_collection limit="12" columns="4"]
[minchyn_team]
```

#### Option 3: Complete Platform
```
[minchyn_ico_dashboard]
[minchyn_token_info]
[minchyn_token_purchase]
[ugly_unicorns_nft_mint theme="light"]
[minchyn_roadmap]
[minchyn_team]
```

### Theme Integration

#### Light Theme Example:
```
[minchyn_ico_dashboard theme="light"]
[ugly_unicorns_nft_mint theme="light" button_text="Mint Your Unicorn"]
```

#### Custom Styling:
Add to your theme's CSS:
```css
/* Custom brand colors */
.btn-primary {
    background: linear-gradient(135deg, #your-color1, #your-color2) !important;
}

/* Custom dashboard styling */
.minchyn-ico-dashboard[data-theme="dark"] {
    background: your-custom-gradient !important;
}
```

## 📱 Mobile Optimization

Both plugins are fully responsive and work on:
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers with MetaMask app
- ✅ Tablet devices
- ✅ Progressive Web Apps (PWA)

## 🔧 Advanced Integration

### Sidebar Widget Integration:
```php
// Add to your theme's functions.php
add_action('widgets_init', function() {
    register_sidebar(array(
        'name' => 'NFT Mint Widget',
        'id' => 'nft-mint-sidebar',
        'before_widget' => '<div class="nft-widget">',
        'after_widget' => '</div>',
    ));
});

// In your sidebar.php
if (is_active_sidebar('nft-mint-sidebar')) {
    echo do_shortcode('[ugly_unicorns_nft_mint theme="light" show_stats="false"]');
}
```

### Header Integration:
```php
// Add mint button to your theme's header.php
<div class="header-nft-mint">
    <?php echo do_shortcode('[ugly_unicorns_nft_mint show_preview="false" show_stats="false"]'); ?>
</div>
```

### Custom Page Templates:
```php
// Create page-ico.php in your theme
<?php get_header(); ?>
<div class="ico-page-content">
    <?php echo do_shortcode('[minchyn_ico_dashboard]'); ?>
    <?php echo do_shortcode('[minchyn_token_purchase]'); ?>
</div>
<?php get_footer(); ?>
```

## 🚀 Go-Live Checklist

### Before Launch:
- [ ] Test wallet connection on multiple browsers
- [ ] Verify contract addresses are correct
- [ ] Test token purchasing flow
- [ ] Test NFT minting functionality
- [ ] Check mobile responsiveness
- [ ] Ensure SSL certificate is active
- [ ] Test with different wallet addresses

### Security Considerations:
- [ ] Use HTTPS (SSL) for all pages
- [ ] Keep WordPress and plugins updated
- [ ] Use strong admin passwords
- [ ] Regular backups of your site
- [ ] Monitor for suspicious activity

### Performance Optimization:
- [ ] Enable caching (WP Rocket, W3 Total Cache)
- [ ] Optimize images on your pages
- [ ] Use a CDN for faster loading
- [ ] Monitor page load speeds

## 🆘 Troubleshooting

### Common Issues & Solutions:

#### "Connect Wallet" Button Not Working:
```
Solution: Check browser console for errors
- Ensure MetaMask is installed and unlocked
- Verify site is using HTTPS
- Clear browser cache and try again
```

#### Contract Connection Errors:
```
Solution: Verify contract settings
- Check contract addresses in plugin settings
- Ensure contracts are deployed on mainnet
- Verify RPC URL is working
```

#### Styling Issues:
```
Solution: CSS conflicts
- Check for theme CSS conflicts
- Add !important to custom styles
- Use browser developer tools to debug
```

#### Mobile Display Issues:
```
Solution: Responsive design
- Check viewport meta tag in theme
- Test on different screen sizes
- Ensure touch targets are large enough
```

## 📞 Support & Updates

### Getting Help:
- Check the plugin documentation
- Review browser console for errors
- Test with different browsers/devices
- Contact plugin developer for custom modifications

### Future Updates:
- Plugin updates will be provided
- New features and improvements
- Security patches and bug fixes
- Enhanced mobile experience

---

## 🎉 You're Ready to Launch!

Your WordPress site now has full ICO and NFT minting capabilities! 

### Next Steps:
1. ✅ Share your pages with your community
2. ✅ Promote on social media
3. ✅ Monitor analytics and user engagement
4. ✅ Collect feedback for improvements

**Welcome to the future of decentralized fundraising!** 🚀