# 🛡️ reCAPTCHA v2 Setup Guide for Formspree Protection

## Step 1: Get reCAPTCHA Keys from Google

1. Go to [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin/create)
2. Click "Create" (or "+" if you have existing sites)
3. Fill out the form:
   - **Label**: "PrivaPulse Contact Form"
   - **reCAPTCHA type**: Select "reCAPTCHA v2" → "I'm not a robot" Checkbox
   - **Domains**: Add your domains:
     - `privapulse.com`
     - `www.privapulse.com` 
     - `localhost` (for testing)
   - Accept the Terms of Service
4. Click "Submit"

You'll get:
- **Site Key** (public, goes in your frontend code)
- **Secret Key** (private, goes in Formspree settings)

## Step 2: Configure Formspree 

1. Go to [Formspree Dashboard](https://formspree.io/forms)
2. Find your form `mgvlonvn` 
3. Go to "Settings" → "Spam Protection"
4. Enable "reCAPTCHA v2"
5. Enter your **Secret Key** from Google
6. Save settings

## Step 3: Add reCAPTCHA to Your Site

The code implementation will be done automatically via our React integration.

## Environment Variables Needed

Add these to your production environment:
```bash
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
```

## Testing

1. Test on localhost first
2. Deploy and test on production domain
3. Check Formspree form submissions include reCAPTCHA verification
4. Monitor spam reduction

## Security Benefits

- ✅ Blocks automated bot submissions  
- ✅ Reduces spam by 95%+
- ✅ Maintains good user experience
- ✅ GDPR compliant (Google reCAPTCHA)
- ✅ Works with all modern browsers
