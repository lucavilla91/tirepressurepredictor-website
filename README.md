# Tire Pressure Predictor - Landing Page

Professional landing page for the Tire Pressure Predictor desktop application.

## Structure

```
website/
├── index.html                          # Home page
├── race-car-tyre-pressure-predictor/   # SEO Technical Guide page
│   └── index.html
├── styles.css                          # Responsive CSS
├── script.js                           # Form validation, smooth scroll
├── images/                             # Screenshots
│   ├── app-main.png
│   ├── app-bleed.png
│   ├── app-setup.png
│   └── app-processing.png
├── logo.svg                            # Logo
├── favicon.svg / favicon.ico           # Favicons
├── robots.txt                          # SEO
├── sitemap.xml                         # SEO
├── site.webmanifest                    # PWA manifest
├── netlify.toml                        # Netlify config
├── _redirects                          # Netlify redirects
└── README.md                           # This file
```

## Features

- Mobile-first responsive design
- Ferrari red (#DC0000) accent color
- SVG workflow diagram
- Contact form with validation
- Smooth scroll navigation
- Intersection Observer animations
- No external dependencies (except Google Fonts)

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Deploy to Netlify

### Option 1: Drag & Drop (Fastest)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up / Log in
3. Drag the `website` folder to the deploy area
4. Done! You'll get a random URL like `random-name.netlify.app`

### Option 2: GitHub Integration

1. Push the `website` folder to a GitHub repository
2. Go to Netlify > "Add new site" > "Import an existing project"
3. Connect your GitHub account
4. Select the repository
5. Set build settings:
   - Base directory: `website` (if website is in a subfolder)
   - Publish directory: `.` or `website`
6. Click "Deploy site"

### Option 3: Netlify CLI

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy (from website folder)
cd website
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Custom Domain Setup

1. In Netlify dashboard, go to "Domain management"
2. Click "Add custom domain"
3. Enter your domain: `tirepressurepredictor.com`
4. Follow DNS configuration instructions:
   - Add CNAME record pointing to your Netlify URL
   - Or use Netlify DNS (recommended)
5. Enable HTTPS (automatic with Let's Encrypt)

### DNS Records (if using external registrar)

```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

## Form Backend

The contact form uses [FormSubmit.co](https://formsubmit.co) for serverless form handling.

Current setup:
- Action: `https://formsubmit.co/lvillaengineering@gmail.com`
- Anti-spam honeypot enabled
- CAPTCHA disabled (can enable if needed)
- Redirects to `?success=true` after submission

### Alternative Form Services

1. **Netlify Forms** (free with Netlify hosting)
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```

2. **Formspree** (formspree.io)
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```

3. **EmailJS** (client-side, no backend)
   ```javascript
   emailjs.send('service_id', 'template_id', params);
   ```

## Performance Checklist

- [x] Minimal CSS (no framework)
- [x] Vanilla JavaScript (no libraries)
- [x] SVG icons (no icon fonts)
- [x] Google Fonts with preconnect
- [ ] Add favicon (ico + png)
- [ ] Minify CSS/JS for production
- [ ] Add Open Graph image
- [ ] Test with Lighthouse

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Customization

### Colors (in styles.css)

```css
:root {
    --ferrari-red: #DC0000;      /* Primary accent */
    --ferrari-red-dark: #b30000; /* Hover state */
    --dark: #1a1a2e;             /* Dark sections */
}
```

### Content

- Edit `index.html` to modify text content
- Update email in form action for contact submissions
- Modify workflow diagram SVG in "How It Works" section

## License

Copyright 2025 LVilla Engineering. All rights reserved.
