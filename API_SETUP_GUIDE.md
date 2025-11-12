# API Setup Guide - Weather & Currency Features

## Overview

Your Paris Tourism website now includes **live weather** and **live currency conversion** features! Follow these steps to activate them with real API keys.

---

## 🌤️ **WEATHER API SETUP**

### Step 1: Get OpenWeatherMap API Key (FREE)

1. **Visit**: https://openweathermap.org/api
2. **Click**: "Sign Up" (top right)
3. **Create Account**: Use email `hhnk3693@gmail.com` or your preferred email
4. **Verify Email**: Check inbox for verification link
5. **Get API Key**:
   - Login to your account
   - Go to: https://home.openweathermap.org/api_keys
   - Your default API key is already generated!
   - Copy the API key (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Step 2: Add API Key to Your Website

**Method 1: Direct Edit (Easiest)**

Open `weather-currency.js` and replace this line:

```javascript
// Line 2
window.weatherWidget = new WeatherWidget(); // Add OpenWeatherMap API key as parameter
```

With:

```javascript
window.weatherWidget = new WeatherWidget('YOUR_API_KEY_HERE');
```

**Example**:
```javascript
window.weatherWidget = new WeatherWidget('a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6');
```

**Method 2: Environment Variable (Production)**

Create a `.env` file:
```env
OPENWEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

Update `weather-currency.js`:
```javascript
window.weatherWidget = new WeatherWidget(process.env.OPENWEATHER_API_KEY || 'demo');
```

### Step 3: Test the Weather Widget

1. Open your website: `index.html`
2. Scroll to "Plan Your Visit" section
3. You should see:
   - **Current Weather**: Real-time Paris weather
   - **5-Day Forecast**: Next 5 days
   - **Temperature, humidity, wind speed**

### Free Tier Limits

- **Free Tier**: 1,000 API calls per day
- **Updates**: Every 10 minutes (built-in caching)
- **Cost**: $0 (100% free for this usage)

---

## 💱 **CURRENCY API SETUP**

### Option 1: Free ExchangeRate-API (Recommended)

#### Step 1: Get API Key

1. **Visit**: https://www.exchangerate-api.com/
2. **Click**: "Get Free Key"
3. **Sign Up**: Use email `hhnk3693@gmail.com`
4. **Verify Email**: Check inbox
5. **Get API Key**: Available in dashboard

#### Step 2: Update Your Code

**Current Code**:
```javascript
const url = `https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`;
```

**New Code** (with API key):
```javascript
const url = `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${this.baseCurrency}`;
```

**OR** (in constructor):
```javascript
window.currencyConverter = new CurrencyConverter('YOUR_API_KEY_HERE');
```

#### Free Tier Limits
- **Free Tier**: 1,500 requests per month
- **Updates**: Every hour (built-in caching)
- **Cost**: $0

### Option 2: Use Current Free Endpoint (No Key Required)

The currency converter already works without an API key using:
```
https://api.exchangerate-api.com/v4/latest/EUR
```

This is 100% free but:
- May have rate limits
- No guaranteed uptime
- Good for development/testing

---

## ✅ **TESTING CHECKLIST**

### Weather Widget
- [ ] Shows current temperature in °C
- [ ] Displays weather icon (sunny, cloudy, etc.)
- [ ] Shows "Feels like" temperature
- [ ] Displays humidity percentage
- [ ] Shows wind speed
- [ ] 5-day forecast appears below
- [ ] Updates after 10 minutes

### Currency Converter
- [ ] Shows 9 currencies (EUR, USD, GBP, JPY, CHF, CAD, AUD, CNY, INR)
- [ ] Default: 100 USD to EUR
- [ ] Can enter custom amount
- [ ] Dropdown menus work
- [ ] "Convert" button calculates correctly
- [ ] Result displays in large blue text
- [ ] Conversion updates in real-time

---

## 🔧 **TROUBLESHOOTING**

### Weather Not Loading

**Problem**: Widget shows demo data
**Solution**:
1. Check API key is correct (no spaces, complete)
2. Verify you're using the key from https://home.openweathermap.org/api_keys
3. New keys take 10-15 minutes to activate
4. Check browser console for errors (F12)

**Error**: `Invalid API key`
- Double-check the key
- Make sure it's from OpenWeatherMap, not another service

**Error**: `City not found`
- Current code is hardcoded to "Paris, FR"
- No action needed unless you want to change cities

### Currency Not Converting

**Problem**: Shows "demo rates"
**Solution**:
1. Check internet connection
2. Open browser console (F12) for errors
3. Verify API endpoint is accessible
4. Try the free v4 endpoint first (no key needed)

**Error**: `429 Too Many Requests`
- You've exceeded the free tier limit
- Wait for the limit to reset (monthly for ExchangeRate-API)
- OR upgrade to paid plan

### Translation Not Working

**Problem**: French toggle doesn't translate weather/currency
**Solution**:
The weather and currency widgets already have `data-translate` attributes. If translation isn't working:
1. Ensure `main-clean.js` is loaded AFTER `weather-currency.js`
2. Check that `langManager` is initialized
3. The widgets will auto-translate when language changes

---

## 🚀 **ADVANCED SETUP**

### Custom Weather Location

Edit `weather-currency.js`:

```javascript
class WeatherWidget {
    constructor(apiKey = 'demo') {
        this.apiKey = apiKey;
        this.city = 'Paris'; // Change this!
        this.country = 'FR'; // Change this!
        // ...
    }
}
```

### Custom Base Currency

Edit `weather-currency.js`:

```javascript
class CurrencyConverter {
    constructor(apiKey = 'demo') {
        this.apiKey = apiKey;
        this.baseCurrency = 'EUR'; // Change this!
        // ...
    }
}
```

### Add More Currencies

Edit the `currencies` array in `renderConverter()`:

```javascript
const currencies = [
    'EUR', 'USD', 'GBP', 'JPY', 'CHF',
    'CAD', 'AUD', 'CNY', 'INR',
    'BRL', 'MXN', 'RUB', 'KRW' // Add more here!
];
```

---

## 📊 **MONITORING USAGE**

### OpenWeatherMap Dashboard
- **URL**: https://home.openweathermap.org/statistics
- **Check**:
  - Daily API calls
  - Remaining free tier quota
  - Response times

### ExchangeRate-API Dashboard
- **URL**: https://app.exchangerate-api.com/dashboard
- **Check**:
  - Monthly requests used
  - Remaining quota
  - Plan details

---

## 💰 **UPGRADE OPTIONS** (Optional)

### When to Upgrade OpenWeatherMap

**Upgrade if**:
- You get 1,000+ visitors per day
- You want hourly forecasts
- You need air quality data
- You want more frequent updates

**Pricing**: $40/month for 2,000 calls/min

### When to Upgrade ExchangeRate-API

**Upgrade if**:
- You exceed 1,500 requests/month
- You need historical data
- You want more currencies
- You need sub-hourly updates

**Pricing**: Starting at $10/month

---

## 🎯 **QUICK START SUMMARY**

### Minimum Setup (Keep Demo Mode)
✅ **Already working!** Both widgets function with demo data.

### Recommended Setup (15 minutes)
1. Get OpenWeatherMap key (5 min)
2. Add key to `weather-currency.js` (2 min)
3. Test weather widget (3 min)
4. Currency converter works without key (already!)
5. Done! ✅

### Professional Setup (30 minutes)
1. Get both API keys
2. Set up environment variables
3. Configure caching
4. Monitor usage
5. Test thoroughly

---

## 📞 **SUPPORT**

### API Issues
- **OpenWeatherMap Support**: https://openweathermap.org/faq
- **ExchangeRate-API Support**: support@exchangerate-api.com

### Website Issues
- **Email**: hhnk3693@gmail.com
- **GitHub**: https://github.com/HorizonHnk/Paris_Tourism/issues

---

## ✅ **FINAL CHECKLIST**

Before deploying to production:

- [ ] API keys are obtained and saved securely
- [ ] Keys are added to `weather-currency.js` or `.env` file
- [ ] Weather widget displays real Paris weather
- [ ] Currency converter calculates accurately
- [ ] Translation works for both widgets
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] No console errors
- [ ] Demo mode removed (optional)
- [ ] Usage monitoring set up

---

**Congratulations!** 🎉

Your Paris Tourism website now has professional-grade weather and currency features, just like the Cape Town tourism platform!

**Current Status**:
- ✅ Weather Widget: WORKING (demo mode or with API key)
- ✅ Currency Converter: WORKING (free endpoint)
- ✅ Responsive Design: YES
- ✅ Translation Support: YES
- ✅ Auto-refresh: YES

**Next Steps**: See `NEW_FEATURES_FROM_CAPETOWN.md` for 30+ additional features to implement!

---

**Last Updated**: 2025-11-11
**Version**: 1.0
**Author**: HNK
**Contact**: hhnk3693@gmail.com
