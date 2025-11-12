# Paris Tourism Website 🗼

A modern, interactive tourism website for Paris featuring AI-powered assistance, bilingual support, comprehensive travel information, and immersive experiences.

![Paris Tourism](https://img.shields.io/badge/Paris-Tourism-blue)
![Version](https://img.shields.io/badge/version-2.0-green)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌐 Live Demo

**Visit the live website:** [paris-tourism.netlify.app](https://paris-tourism.netlify.app/)

## ✨ Features

### Core Features
- **🤖 AI-Powered Chatbot** - Intelligent responses using Google Gemini API with context-aware conversations
- **🌍 Bilingual Support** - Complete English and French translation with instant language switching
- **🗺️ Interactive Maps** - Explore attraction locations with Leaflet.js integration
- **📊 Data Visualization** - Beautiful charts showing tourism statistics using ECharts
- **📱 Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **💾 Session Management** - Save and restore user itineraries across visits
- **☁️ Firebase Integration** - Cloud storage for user data, preferences, and itineraries
- **📧 Contact Forms** - Easy communication via Formspree integration

### Advanced Features
- **🌤️ Live Weather Widget** - Real-time Paris weather with 5-day forecast using OpenWeatherMap API
- **💱 Currency Converter** - Live exchange rates for 9+ currencies
- **🎯 Interactive Attractions** - Detailed modal views with ratings, prices, and booking information
- **🎨 Smooth Animations** - Beautiful scroll animations and transitions using Anime.js
- **🎭 Cultural Content** - Deep dive into French cuisine, wine, fashion, and art
- **🔖 User Itineraries** - Save favorite attractions and create personalized travel plans
- **📝 Newsletter Subscription** - Stay updated with latest Paris tourism news
- **🏷️ Booking System Integration** - Ready-to-use booking functionality for attractions

## 🚀 Quick Start

### Option 1: View Online
Simply visit [paris-tourism.netlify.app](https://paris-tourism.netlify.app/) to see the live website.

### Option 2: Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/HorizonHnk/Paris_Tourism.git
   cd Paris_Tourism
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys
   ```

3. **Run a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js
   npx http-server -p 8000
   ```

4. **Open in browser**
   Navigate to `http://localhost:8000`

For detailed setup instructions, see [SETUP.md](SETUP.md) and [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md).

## 📱 Pages

- **🏠 Home** (`index.html`) - Overview of Paris tourism with statistics and highlights
- **🗼 Attractions** (`attractions.html`) - Detailed information about 20+ iconic landmarks
- **🎭 Culture** (`culture.html`) - French culture, cuisine, wine, fashion, and traditions
- **📞 Contact** (`contact.html`) - Get in touch with tourism experts

## 🏗️ Architecture & Code Structure

### File Organization
```
Paris_Tourism/
├── index.html              # Main homepage
├── attractions.html        # Attractions page
├── culture.html           # Culture page
├── contact.html           # Contact page
├── main.js                # Main application logic
├── main-clean.js          # Cleaned version with optimizations
├── chatbot-improved.js    # Enhanced chatbot functionality
├── interactive-features.js # Modal system and interactions
├── weather-currency.js    # Weather widget and currency converter
├── booking-system.js      # Booking functionality
├── vr-ar-integration.js   # VR/AR features (future)
├── advanced-features.js   # Additional enhancements
├── ui-manager.js          # UI state management
├── firestore.rules        # Firebase security rules
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
└── resources/            # Images and media assets
    ├── hero-paris.jpg
    ├── eiffel-tower.jpg
    ├── louvre.jpg
    └── ...
```

### Key Components

#### LanguageManager Class
Handles bilingual content switching:
- Stores translations for English and French
- Updates all text elements with `data-translate` attributes
- Persists language preference in localStorage
- Provides seamless language switching without page reload

#### ParisChatbot Class
AI-powered chatbot with fallback responses:
- Integrates with Google Gemini API for intelligent conversations
- Provides context-aware responses about Paris tourism
- Falls back to predefined responses if API unavailable
- Supports bilingual conversations (English/French)
- Maintains conversation history

#### AnimationManager Class
Handles smooth scroll animations:
- Uses Intersection Observer API for performance
- Triggers animations on scroll
- Configurable animation timing and effects
- Supports multiple animation types (fade-in, slide-up, etc.)

#### WeatherWidget Class
Real-time weather information:
- Fetches live Paris weather from OpenWeatherMap
- Displays current conditions and 5-day forecast
- Caches data to reduce API calls
- Graceful fallback to demo data
- Auto-translates based on selected language

#### CurrencyConverter Class
Live currency exchange rates:
- Supports 9+ major currencies (EUR, USD, GBP, JPY, etc.)
- Real-time conversion using ExchangeRate-API
- Clean, intuitive interface
- Caching for performance
- Works with free API endpoints

#### SessionManager Class
User session tracking:
- Generates unique session IDs
- Tracks user preferences and behavior
- Stores itineraries in Firebase
- Analytics integration
- GDPR-compliant data handling

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend & APIs
- **Firebase Firestore** - NoSQL cloud database
- **Firebase Authentication** - User authentication (optional)
- **Google Gemini AI** - Conversational AI
- **OpenWeatherMap API** - Weather data
- **ExchangeRate API** - Currency conversion
- **Formspree** - Form handling

### Libraries & Frameworks
- **Leaflet.js** - Interactive maps
- **ECharts** - Data visualization
- **Anime.js** - JavaScript animation engine
- **Chart.js** - Additional charting
- **AOS (Animate On Scroll)** - Scroll animations

### Development Tools
- **Git** - Version control
- **Netlify** - Hosting and deployment
- **VS Code** - Development environment

## 🔑 API Keys Setup

**Important:** For security reasons, API keys are not included in this repository. You need to set up your own keys.

### Required APIs

1. **Google Gemini API** (for AI Chatbot)
   - Get it from: [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Free tier: 60 requests/minute

2. **Firebase** (for Database)
   - Create project at: [Firebase Console](https://console.firebase.google.com/)
   - Free tier: 1GB storage, 50K reads/day

3. **OpenWeatherMap API** (for Weather Widget)
   - Get it from: [OpenWeatherMap](https://openweathermap.org/api)
   - Free tier: 1,000 calls/day

4. **ExchangeRate API** (for Currency Converter - Optional)
   - Get it from: [ExchangeRate-API](https://www.exchangerate-api.com/)
   - Free tier: 1,500 requests/month
   - Can also use free endpoint without key

### Setup Instructions

1. Copy `.env.example` to `.env`
2. Add your API keys to `.env`
3. Update the keys in the respective JavaScript files:
   - Firebase config in `main-clean.js`
   - Gemini API key in chatbot initialization
   - Weather API key in `weather-currency.js`

See [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md) for detailed setup instructions.

## 📊 Key Attractions Featured

### Iconic Landmarks
- **🗼 Eiffel Tower** - The iconic iron lady (324m tall)
- **🎨 Louvre Museum** - World's largest art museum
- **⛪ Notre Dame Cathedral** - Gothic architectural masterpiece
- **🏛️ Arc de Triomphe** - Napoleon's triumphal monument
- **🕌 Sacré-Cœur** - Montmartre's stunning white basilica
- **👑 Palace of Versailles** - Royal opulence and grandeur

### Additional Attractions
- Champs-Élysées - World-famous avenue
- Latin Quarter - Historic student district
- Musée d'Orsay - Impressionist art collection
- Panthéon - Final resting place of French heroes
- Luxembourg Gardens - Beautiful public park
- Montmartre - Artistic neighborhood
- And 10+ more attractions!

## 🌍 Bilingual Content

All content available in:
- 🇺🇸 **English** - Complete English translation
- 🇫🇷 **Français** - Full French translation

**Features:**
- Instant language switching without page reload
- All UI elements translated
- Chatbot responds in selected language
- Weather widget auto-translates
- User preference saved in localStorage

Toggle language anytime with the language selector in the navigation bar.

## 📈 Performance Optimizations

- ✅ **Lazy Loading** - Images load on demand
- ✅ **Code Splitting** - Modular JavaScript files
- ✅ **CDN Hosting** - Fast library delivery
- ✅ **Caching Strategy** - Reduced API calls
- ✅ **Minification** - Compressed assets (production)
- ✅ **Responsive Images** - Optimized for all devices
- ✅ **Efficient Animations** - Hardware-accelerated CSS
- ✅ **Service Worker** - Offline functionality (future)

**Performance Metrics:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Lighthouse Score: 90+

## 🔒 Security

- ✅ **Firebase Security Rules** - Properly configured database access
- ✅ **API Key Protection** - Environment variables for sensitive data
- ✅ **CORS Compliance** - Secure cross-origin requests
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Input Sanitization** - Protection against XSS attacks
- ✅ **HTTPS Only** - Secure connection required
- ✅ **Rate Limiting** - API request throttling
- ✅ **No Sensitive Data in Git** - .gitignore properly configured

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Language switching works on all pages
- [ ] Chatbot responds appropriately
- [ ] Weather widget displays current data
- [ ] Currency converter calculates correctly
- [ ] Contact form submits successfully
- [ ] Attractions modal opens and displays data
- [ ] Maps load and are interactive
- [ ] Charts render properly
- [ ] Responsive design works on mobile
- [ ] All links and navigation function

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[API_SETUP_GUIDE.md](API_SETUP_GUIDE.md)** - API configuration guide
- **[CHANGES.md](CHANGES.md)** - Changelog and fixes applied
- **[DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md)** - Firebase deployment guide
- **[design.md](design.md)** - Design specifications
- **[interaction.md](interaction.md)** - Interaction patterns
- **[outline.md](outline.md)** - Project outline

## 🚧 Roadmap / Future Enhancements

### Planned Features
- [ ] **User Authentication** - Login/signup functionality
- [ ] **Advanced Booking System** - Real-time availability and payments
- [ ] **VR/AR Tours** - Immersive virtual reality experiences
- [ ] **Mobile App** - Native iOS and Android apps
- [ ] **Multi-language Support** - Spanish, German, Italian, Chinese
- [ ] **Social Features** - Share itineraries with friends
- [ ] **Review System** - User reviews and ratings
- [ ] **AI Trip Planner** - Personalized itinerary generation
- [ ] **Offline Mode** - Progressive Web App (PWA) features
- [ ] **Payment Integration** - Stripe/PayPal for bookings
- [ ] **Real-time Chat** - Live support chat
- [ ] **Push Notifications** - Updates and reminders

### Improvements
- [ ] Enhanced accessibility (WCAG 2.1 AAA)
- [ ] More attractions (50+ landmarks)
- [ ] Restaurant recommendations
- [ ] Hotel booking integration
- [ ] Transportation guides
- [ ] Event calendar
- [ ] Blog section
- [ ] User dashboard

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Update documentation for new features
- Test thoroughly before submitting PR
- Ensure no API keys are committed

## 📧 Contact & Social Media

**Developer:** HNK (Horizon)

### Get in Touch
- 📧 **Email:** [hhnk3693@gmail.com](mailto:hhnk3693@gmail.com)
- 💼 **GitHub:** [@HorizonHnk](https://github.com/HorizonHnk)
- 🎥 **YouTube:** [@HNK2005](https://youtube.com/@HNK2005)
- 🐦 **Twitter:** [@HnkHorizon](https://twitter.com/HnkHorizon)
- 📸 **Instagram:** [@hhnk.3693](https://instagram.com/hhnk.3693)
- 🎵 **TikTok:** [@codingfever](https://tiktok.com/@codingfever)
- 💬 **Discord:** hnk0422_76455

### Repository Links
- **GitHub:** [github.com/HorizonHnk/Paris_Tourism](https://github.com/HorizonHnk/Paris_Tourism)
- **Live Site:** [paris-tourism.netlify.app](https://paris-tourism.netlify.app/)
- **Report Issues:** [GitHub Issues](https://github.com/HorizonHnk/Paris_Tourism/issues)

## ⭐ Show Your Support

If you like this project, please consider:
- ⭐ **Star this repository** on GitHub
- 🍴 **Fork it** and create your own version
- 🐛 **Report bugs** or suggest features
- 📢 **Share** with others who might find it useful
- ☕ **Support** the development (optional)

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

© 2025 Paris Tourism. All rights reserved.

## 🙏 Acknowledgments

Special thanks to:
- **Paris Tourism Board** - For inspiration and tourism data
- **Google** - For Gemini AI and Firebase services
- **OpenWeatherMap** - For reliable weather data
- **Leaflet.js** - For beautiful interactive maps
- **ECharts** - For stunning data visualizations
- **Tailwind CSS** - For rapid UI development
- **Netlify** - For seamless hosting and deployment
- **Open Source Community** - For amazing libraries and tools
- **Paris** - The eternal City of Light 🇫🇷

### Technologies & Services
- Google Gemini AI
- Firebase / Google Cloud
- OpenWeatherMap API
- ExchangeRate-API
- Formspree
- Netlify
- Leaflet.js
- ECharts
- Anime.js
- Tailwind CSS

---

## 🌟 Project Statistics

- **Total Lines of Code:** 5,000+
- **JavaScript Files:** 10+
- **HTML Pages:** 4
- **Supported Languages:** 2 (EN, FR)
- **Featured Attractions:** 20+
- **API Integrations:** 5+
- **Development Time:** 1 day
- **Contributors:** Growing!

---

**Made with ❤️ for Paris lovers worldwide**

*"Paris is always a good idea." - Audrey Hepburn*

🗼 Explore Paris | 🤖 AI-Powered | 🌍 Bilingual | 📱 Responsive | ☁️ Cloud-Ready

---

**Last Updated:** January 2025
**Version:** 2.0.0
**Status:** Active Development
