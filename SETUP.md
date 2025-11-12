# Paris Tourism Website - Setup Guide

## Overview
This Paris tourism website features:
- Bilingual support (English/French)
- AI-powered chatbot using Gemini API
- Firebase backend for data storage
- Interactive maps and charts
- Session management and user itineraries
- Responsive design with smooth animations

## Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for CDN resources
- Firebase project (already configured)
- Gemini API key (already configured)

## Installation

### 1. File Structure
```
project/
├── index.html
├── attractions.html
├── culture.html
├── contact.html
├── main-clean.js
├── firestore.rules
├── resources/
│   ├── hero-paris.jpg
│   ├── eiffel-tower.jpg
│   ├── louvre.jpg
│   └── ...
```

### 2. Firebase Setup
Configure the website with your Firebase project:
- **Project ID**: YOUR_PROJECT_ID
- **API Key**: YOUR_FIREBASE_API_KEY (see .env.example)

#### Deploy Firebase Rules:
1. Install Firebase CLI if not already installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```

4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

The `firestore.rules` file contains properly configured security rules for:
- Contact form submissions
- User itineraries
- Newsletter subscriptions
- Analytics data

### 3. Gemini API Setup
Configure the Gemini API with your own key:
- **API Key**: YOUR_GEMINI_API_KEY (see .env.example and API_SETUP_GUIDE.md)

The chatbot will:
1. First try to use Gemini API for intelligent responses
2. Fall back to predefined responses if API is unavailable
3. Support both English and French languages

### 4. Formspree Setup
Contact form is configured with:
- **Formspree Endpoint**: https://formspree.io/f/mwpaegrz

No additional setup needed - forms will be sent to: hhnk3693@gmail.com

## Running the Website

### Option 1: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

### Option 2: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Direct File Opening
Simply double-click `index.html` to open in your browser.
Note: Some features (like Firebase) may require a web server.

## Features

### 1. Interactive Chatbot
- Click the chat icon in bottom-right corner
- Ask questions about Paris tourism
- Get AI-powered responses from Gemini
- Supports English and French

### 2. Bilingual Support
- Toggle between English (🇺🇸 EN) and French (🇫🇷 FR)
- All content translates automatically
- User preference saved in localStorage

### 3. Attraction Pages
- Filter attractions by category
- View detailed information in modals
- Add attractions to personal itinerary
- Interactive maps with locations

### 4. User Itinerary
- Save favorite attractions
- Stored locally and in Firebase
- Persists across sessions
- Export functionality

### 5. Session Management
- Tracks user visits and preferences
- Stores browsing history
- Manages itinerary items
- Session analytics

## Performance Optimizations

### Implemented:
1. **Lazy Loading**: Images load only when visible
2. **Single Script Load**: Removed duplicate JavaScript files
3. **CDN Resources**: Fast loading from global CDNs
4. **Efficient Animations**: Hardware-accelerated CSS/JS animations
5. **Caching**: LocalStorage for user data and preferences

### Tips for Better Performance:
- Keep image files optimized (under 500KB each)
- Use WebP format for images when possible
- Enable browser caching
- Use CDN for hosting if deploying to production

## Troubleshooting

### Chatbot not responding:
- Check browser console for API errors
- Verify Gemini API key is valid
- Check internet connection
- Falls back to predefined responses if API fails

### Firebase not saving data:
- Verify Firebase rules are deployed
- Check browser console for permission errors
- Ensure project ID matches in main-clean.js
- Test Firebase connection in console:
  ```javascript
  firebase.firestore().collection('test').add({test: true})
  ```

### Images not loading:
- Verify all image files exist in `resources/` folder
- Check file names match exactly (case-sensitive)
- Ensure proper file paths in HTML

### Contact form not working:
- Verify Formspree endpoint is correct
- Check network tab for form submission
- Ensure all required fields are filled
- Check spam folder for confirmation emails

## Deployment

### GitHub Pages:
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select branch and folder
4. Wait for deployment

### Netlify:
1. Connect GitHub repository
2. Set build command: (none needed)
3. Set publish directory: `/`
4. Deploy automatically on push

### Firebase Hosting:
```bash
firebase init hosting
firebase deploy --only hosting
```

## Maintenance

### Regular Updates:
- Monitor Firebase usage in console
- Check Gemini API quota usage
- Update content and images regularly
- Review analytics data

### Security:
- Firebase rules are restrictive by default
- API keys are client-side (normal for web apps)
- Monitor for unusual activity in Firebase console
- Rotate keys if compromised

## Support

For issues or questions:
- Email: hhnk3693@gmail.com
- GitHub Issues: https://github.com/HorizonHnk/Paris_Tourism/issues
- YouTube: https://youtube.com/@HNK2005

## Credits

- Developer: HNK
- Google Maps: Location data
- OpenStreetMap: Map tiles
- Tailwind CSS: Styling framework
- Anime.js: Animations
- ECharts: Data visualization
- Splide: Image carousels

## License

© 2025 Paris Tourism. All rights reserved.

---

Last updated: 2025-11-11
Version: 1.0
