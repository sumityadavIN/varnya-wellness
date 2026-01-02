# GitHub Pages Deployment Guide
## Varnya Wellness Website

**Date:** 2026-01-02
**Status:** Ready for Deployment

---

## Prerequisites

- GitHub account
- Git installed on your computer
- All website files ready in `c:\xampp\htdocs\Varnya`

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `varnya-wellness` (or your preferred name)
   - Description: "Varnya Wellness - Integrated Ayurvedic & Aesthetic Treatments"
   - Set to **Public** (required for free GitHub Pages)
   - ❌ Do NOT initialize with README, .gitignore, or license

2. **What NOT to upload:**
   - `archive/` folder - Not needed for production
   - `.git/` folder (if exists) - Will be created fresh
   - Any local development files

### Step 2: Initialize Git (Local Computer)

Open Command Prompt or Terminal in `c:\xampp\htdocs\Varnya` and run:

```bash
# Initialize git repository
git init

# Add all files (excluding archive)
git add .

# Create initial commit
git commit -m "Initial commit: Varnya Wellness website with SEO optimization"

# Link to GitHub repository (replace USERNAME and REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `USERNAME` with your GitHub username and `REPO` with your repository name.

### Step 3: Create .gitignore File

Before adding files, create a `.gitignore` file in the root directory:

```
# Exclude archive folder
archive/

# Exclude local development files
.DS_Store
Thumbs.db
*.log
.vscode/
.idea/

# Exclude any local config
*.local

# Exclude node_modules if you add them later
node_modules/
```

Save this as `.gitignore` in `c:\xampp\htdocs\Varnya\.gitignore`

Then run:
```bash
git add .gitignore
git commit -m "Add .gitignore to exclude development files"
git push
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

**Wait 1-2 minutes** for GitHub to build your site.

### Step 5: Access Your Website

Your site will be available at:
```
https://USERNAME.github.io/REPO/
```

For example:
- If username is `varnyawellness` and repo is `website`
- URL: `https://varnyawellness.github.io/website/`

---

## 📝 Important Notes

### URLs on GitHub Pages

✅ **Your links are already GitHub Pages compatible!**

- All internal links use `.html` extensions (e.g., `medifacials.html`)
- This works perfectly with GitHub Pages
- No changes needed to your HTML files

**Example working URLs:**
- Homepage: `https://USERNAME.github.io/REPO/`
- About: `https://USERNAME.github.io/REPO/about.html`
- Services: `https://USERNAME.github.io/REPO/medifacials.html`

### Custom Domain (Optional)

If you want to use `varnyawellness.com` instead of GitHub URL:

1. **In GitHub Repository Settings → Pages:**
   - Enter your custom domain: `varnyawellness.com`
   - Save

2. **In Your Domain Registrar (GoDaddy, Namecheap, etc.):**
   Add these DNS records:

   **For apex domain (varnyawellness.com):**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153
   ```

   **For www subdomain (www.varnyawellness.com):**
   ```
   Type: CNAME
   Name: www
   Value: USERNAME.github.io
   ```

3. **Enable HTTPS:**
   - In GitHub Pages settings
   - Check "Enforce HTTPS"
   - Wait 24 hours for certificate

### Update URLs in Your Files

Once you have your GitHub Pages URL, update these files:

#### 1. sitemap.xml
Replace `https://varnyawellness.com` with your GitHub Pages URL:
```xml
<loc>https://USERNAME.github.io/REPO/</loc>
<loc>https://USERNAME.github.io/REPO/about.html</loc>
<!-- etc. -->
```

#### 2. robots.txt
```
Sitemap: https://USERNAME.github.io/REPO/sitemap.xml
```

#### 3. All HTML files
Update canonical URLs and Open Graph URLs in the `<head>` section:
```html
<!-- Change from: -->
<link rel="canonical" href="https://varnyawellness.com/">
<meta property="og:url" content="https://varnyawellness.com/">

<!-- To: -->
<link rel="canonical" href="https://USERNAME.github.io/REPO/">
<meta property="og:url" content="https://USERNAME.github.io/REPO/">
```

**Files to update:**
- index.html
- about.html
- medifacials.html
- laser-treatments.html
- aesthetic-services.html
- traditional-therapies.html
- contact.html
- specialized-programs.html
- panchakarma.html

---

## 🔄 Updating Your Website

After initial deployment, to update your website:

```bash
# Make changes to your files

# Add changed files
git add .

# Commit with descriptive message
git commit -m "Update: description of changes"

# Push to GitHub
git push

# GitHub will automatically rebuild your site (1-2 minutes)
```

---

## ✅ Post-Deployment Checklist

After deploying to GitHub Pages:

- [ ] Visit your GitHub Pages URL and verify site loads
- [ ] Test all navigation links
- [ ] Test all service page links
- [ ] Check responsive design on mobile
- [ ] Verify images load correctly
- [ ] Test contact form (if applicable)
- [ ] Update Google Search Console with new URL
- [ ] Update Bing Webmaster Tools with new URL
- [ ] Submit updated sitemap to search engines
- [ ] Test social media sharing (Open Graph)
- [ ] Verify Schema.org markup with Rich Results Test
- [ ] Check page load speed with PageSpeed Insights

---

## 🛠️ Troubleshooting

### Site not loading?
- Wait 2-3 minutes after enabling GitHub Pages
- Check Settings → Pages shows "Your site is published at..."
- Clear browser cache and try again

### Images not showing?
- Check that image paths are relative (not absolute)
- Verify images are committed to repository
- Check case sensitivity (image.jpg vs Image.JPG)

### Links broken?
- All links should use `.html` extension
- Use relative paths, not absolute
- Example: `href="about.html"` not `href="/about.html"`

### Custom domain not working?
- DNS changes can take 24-48 hours
- Verify DNS records with DNS checker tool
- Make sure CNAME file exists in repository root

---

## 📊 Monitoring & Analytics

### Add Google Analytics

1. Create Google Analytics 4 property
2. Get measurement ID (G-XXXXXXXXXX)
3. Add to all HTML pages before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Monitor Performance

**Free Tools:**
- Google Search Console: Track search rankings
- Google Analytics: Track visitor behavior
- PageSpeed Insights: Monitor site speed
- GTmetrix: Performance analysis
- Uptime Robot: Monitor site availability

---

## 🎯 SEO After Deployment

### 1. Submit to Search Engines

**Google Search Console:**
```
1. Go to https://search.google.com/search-console
2. Add property: https://USERNAME.github.io/REPO
3. Verify ownership (HTML file method)
4. Submit sitemap: https://USERNAME.github.io/REPO/sitemap.xml
5. Request indexing for all pages
```

**Bing Webmaster Tools:**
```
1. Go to https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap
```

### 2. Update Business Listings

Update your website URL on:
- Google Business Profile
- Facebook Page
- Instagram Bio
- LinkedIn Company Page
- Practo, Justdial listings
- Any other directories

### 3. Test Schema Markup

Validate structured data:
```
Google Rich Results Test:
https://search.google.com/test/rich-results

Enter your homepage URL and check for errors
```

---

## 🔐 Security Best Practices

### Enable HTTPS
- Always use HTTPS in production
- GitHub Pages provides free SSL
- Enable "Enforce HTTPS" in settings

### Update robots.txt
Make sure no sensitive files are indexed

### Regular Updates
```bash
# Keep your site updated
git pull  # Get latest changes
# Make updates
git add .
git commit -m "Security update"
git push
```

---

## 📈 Performance Optimization

### Image Optimization
- Use WebP format where possible
- Compress images (TinyPNG, ImageOptim)
- Add `loading="lazy"` to images below fold
- Use responsive images with `srcset`

### Minification (Optional)
For better performance, minify:
- CSS files
- JavaScript files
- HTML (optional)

Tools: HTMLMinifier, CSSNano, UglifyJS

---

## 💡 Tips for Success

1. **Always test locally first** before pushing to GitHub
2. **Use descriptive commit messages** for easy tracking
3. **Keep backups** of your repository
4. **Monitor site speed** regularly
5. **Update content** regularly for better SEO
6. **Collect user feedback** and iterate
7. **Track analytics** to understand visitor behavior

---

## 📚 Additional Resources

- **GitHub Pages Documentation:** https://docs.github.com/pages
- **Custom Domain Setup:** https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
- **GitHub Pages Limits:** 1GB repo size, 100GB bandwidth/month
- **Build Time:** Usually 1-2 minutes

---

## 🆘 Need Help?

If you encounter issues:

1. Check GitHub Pages status: https://www.githubstatus.com/
2. Review GitHub Pages docs
3. Check repository settings
4. Verify file paths and naming
5. Clear browser cache
6. Wait a few minutes and retry

---

## ✨ Next Steps After Deployment

1. **Share your website:**
   - Social media announcement
   - Email signature update
   - Business cards update
   - Print materials update

2. **Start content marketing:**
   - Blog posts about treatments
   - Patient success stories
   - Health tips and guides
   - Video content

3. **Build backlinks:**
   - Directory listings
   - Partner websites
   - Guest blog posts
   - Social media profiles

4. **Collect reviews:**
   - Google Business Profile
   - Facebook recommendations
   - Patient testimonials
   - Case studies

---

**Deployment Ready!** 🚀

Your Varnya Wellness website is fully optimized and ready to deploy to GitHub Pages. Follow the steps above for a smooth deployment.

**Remember:** GitHub Pages is free, fast, and reliable. Perfect for your professional wellness website!

---

**Generated:** 2026-01-02
**For:** Varnya Wellness Website
**Deployment Platform:** GitHub Pages
