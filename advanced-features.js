// Advanced Features for Paris Tourism Website
// Real-time data, AI enhancements, and user experience improvements

class AdvancedFeatures {
    constructor() {
        this.userPreferences = this.loadUserPreferences();
        this.recommendationEngine = new RecommendationEngine();
        this.realTimeData = new RealTimeData();
        this.socialFeatures = new SocialFeatures();
        this.gamification = new Gamification();
        
        this.init();
    }

    init() {
        this.initializeRealTimeFeatures();
        this.initializeSmartRecommendations();
        this.initializeAdvancedChatbot();
        this.initializeSocialFeatures();
        this.initializeGamification();
        this.initializeVoiceFeatures();
        this.initializeOfflineMode();
    }

    // Real-time Data Integration
    initializeRealTimeFeatures() {
        this.setupWeatherAPI();
        this.setupEventCalendar();
        this.setupTransportUpdates();
        this.setupFlightStatus();
    }

    async setupWeatherAPI() {
        // Real-time weather integration
        try {
            const weatherData = await this.realTimeData.getWeather();
            this.updateWeatherDisplay(weatherData);
            this.scheduleWeatherUpdates();
        } catch (error) {
            console.log('Weather API not available, using fallback data');
        }
    }

    async setupEventCalendar() {
        // Real-time events and exhibitions
        const events = await this.realTimeData.getEvents();
        this.displayEvents(events);
    }

    async setupTransportUpdates() {
        // Live transport status
        const transportStatus = await this.realTimeData.getTransportStatus();
        this.updateTransportDisplay(transportStatus);
    }

    // AI-Powered Recommendation Engine
    initializeSmartRecommendations() {
        this.recommendationEngine.learnFromUserBehavior();
        this.setupPersonalizedDashboard();
    }

    setupPersonalizedDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'personalized-dashboard';
        dashboard.className = 'fixed top-20 right-6 bg-white rounded-lg shadow-lg p-4 w-80 z-40 hidden';
        dashboard.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-gray-800">Your Paris Dashboard</h3>
                <button id="close-dashboard" class="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div id="dashboard-content">
                <div class="mb-4">
                    <h4 class="font-semibold text-sm text-gray-600 mb-2">Recommended for You</h4>
                    <div id="personal-recommendations"></div>
                </div>
                <div class="mb-4">
                    <h4 class="font-semibold text-sm text-gray-600 mb-2">Your Progress</h4>
                    <div id="user-progress"></div>
                </div>
                <div>
                    <h4 class="font-semibold text-sm text-gray-600 mb-2">Achievements</h4>
                    <div id="user-achievements"></div>
                </div>
            </div>
        `;
        document.body.appendChild(dashboard);

        // Add dashboard toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'dashboard-toggle';
        toggleBtn.className = 'fixed top-4 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-colors';
        toggleBtn.innerHTML = '📊';
        toggleBtn.title = 'Your Paris Dashboard';
        document.body.appendChild(toggleBtn);

        // Event listeners
        toggleBtn.addEventListener('click', () => this.toggleDashboard());
        document.getElementById('close-dashboard').addEventListener('click', () => this.hideDashboard());
    }

    toggleDashboard() {
        const dashboard = document.getElementById('personalized-dashboard');
        dashboard.classList.toggle('hidden');
        if (!dashboard.classList.contains('hidden')) {
            this.updateDashboardContent();
        }
    }

    hideDashboard() {
        document.getElementById('personalized-dashboard').classList.add('hidden');
    }

    updateDashboardContent() {
        // Update personalized recommendations
        const recommendations = this.recommendationEngine.getPersonalizedRecommendations();
        this.displayPersonalizedRecommendations(recommendations);

        // Update user progress
        const progress = this.gamification.getUserProgress();
        this.displayUserProgress(progress);

        // Update achievements
        const achievements = this.gamification.getUserAchievements();
        this.displayUserAchievements(achievements);
    }

    // Advanced Chatbot Features
    initializeAdvancedChatbot() {
        this.addVoiceRecognition();
        this.addImageRecognition();
        this.addContextualAwareness();
    }

    addVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const input = document.getElementById('chatbot-input');
                if (input) {
                    input.value = transcript;
                    this.triggerSendMessage();
                }
            };

            this.recognition.onerror = (event) => {
                console.log('Speech recognition error:', event.error);
            };
        }
    }

    startVoiceRecognition() {
        if (this.recognition) {
            this.recognition.start();
        }
    }

    // Social Features
    initializeSocialFeatures() {
        this.setupPhotoSharing();
        this.setupReviewsSystem();
        this.setupTravelBuddyMatching();
    }

    setupPhotoSharing() {
        const photoUpload = document.createElement('div');
        photoUpload.id = 'photo-sharing';
        photoUpload.className = 'fixed bottom-24 right-6 bg-white rounded-lg shadow-lg p-4 w-64 z-40 hidden';
        photoUpload.innerHTML = `
            <h4 class="font-bold text-gray-800 mb-3">Share Your Paris Photos</h4>
            <input type="file" id="photo-input" accept="image/*" class="mb-3 w-full">
            <textarea id="photo-caption" placeholder="Add a caption..." class="w-full p-2 border rounded mb-3"></textarea>
            <button id="share-photo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Share</button>
        `;
        document.body.appendChild(photoUpload);

        // Add photo sharing button to chatbot
        const photoBtn = document.createElement('button');
        photoBtn.id = 'photo-share-btn';
        photoBtn.className = 'absolute bottom-16 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700';
        photoBtn.innerHTML = '📸';
        photoBtn.title = 'Share Photos';
        document.getElementById('chatbot-container').appendChild(photoBtn);

        photoBtn.addEventListener('click', () => this.togglePhotoSharing());
        document.getElementById('share-photo').addEventListener('click', () => this.sharePhoto());
    }

    togglePhotoSharing() {
        document.getElementById('photo-sharing').classList.toggle('hidden');
    }

    sharePhoto() {
        const fileInput = document.getElementById('photo-input');
        const caption = document.getElementById('photo-caption').value;
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            this.socialFeatures.sharePhoto(file, caption);
            
            // Reset form
            fileInput.value = '';
            document.getElementById('photo-caption').value = '';
            document.getElementById('photo-sharing').classList.add('hidden');
            
            // Show success message
            this.showNotification('Photo shared successfully! 📸', 'success');
        }
    }

    // Gamification System
    initializeGamification() {
        this.setupAchievementSystem();
        this.setupProgressTracking();
        this.setupLeaderboards();
    }

    setupAchievementSystem() {
        this.achievements = {
            'first-visit': {
                name: 'Welcome to Paris',
                description: 'First time visiting the website',
                icon: '🗼',
                points: 10
            },
            'itinerary-creator': {
                name: 'Trip Planner',
                description: 'Created your first itinerary',
                icon: '📋',
                points: 25
            },
            'culture-explorer': {
                name: 'Culture Explorer',
                description: 'Explored 5 cultural attractions',
                icon: '🎭',
                points: 50
            },
            'food-lover': {
                name: 'Food Lover',
                description: 'Discovered 10 French dishes',
                icon: '🥐',
                points: 30
            },
            'photo-master': {
                name: 'Photo Master',
                description: 'Shared 5 photos',
                icon: '📸',
                points: 40
            }
        };
    }

    checkAchievements() {
        const userStats = this.gamification.getUserStats();
        
        // Check each achievement
        for (const [key, achievement] of Object.entries(this.achievements)) {
            if (!this.gamification.hasAchievement(key) && this.meetsAchievementCriteria(key, userStats)) {
                this.gamification.unlockAchievement(key, achievement);
                this.showAchievementNotification(achievement);
            }
        }
    }

    meetsAchievementCriteria(achievementKey, userStats) {
        switch (achievementKey) {
            case 'first-visit':
                return true; // Always true for new users
            case 'itinerary-creator':
                return userStats.itineraryItems > 0;
            case 'culture-explorer':
                return userStats.culturalAttractions >= 5;
            case 'food-lover':
                return userStats.discoveredFoods >= 10;
            case 'photo-master':
                return userStats.sharedPhotos >= 5;
            default:
                return false;
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg z-50';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">${achievement.icon}</span>
                <div>
                    <div class="font-bold">Achievement Unlocked!</div>
                    <div class="text-sm">${achievement.name}</div>
                    <div class="text-xs opacity-90">${achievement.description}</div>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Voice Features
    initializeVoiceFeatures() {
        this.addVoiceNavigation();
        this.addVoiceSearch();
    }

    addVoiceNavigation() {
        // Voice commands for navigation
        const voiceCommands = {
            'go to attractions': () => window.location.href = 'attractions.html',
            'go to culture': () => window.location.href = 'culture.html',
            'go to contact': () => window.location.href = 'contact.html',
            'go home': () => window.location.href = 'index.html',
            'open chatbot': () => this.toggleChatbot(),
            'show dashboard': () => this.toggleDashboard()
        };

        // Add voice command listener
        if (this.recognition) {
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                
                // Check for voice commands
                for (const [command, action] of Object.entries(voiceCommands)) {
                    if (transcript.includes(command)) {
                        action();
                        return;
                    }
                }
                
                // If no command matched, treat as chatbot input
                const input = document.getElementById('chatbot-input');
                if (input) {
                    input.value = event.results[0][0].transcript;
                    this.triggerSendMessage();
                }
            };
        }
    }

    // Offline Mode
    initializeOfflineMode() {
        this.setupServiceWorker();
        this.cacheImportantContent();
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered successfully');
                })
                .catch(error => {
                    console.log('Service Worker registration failed');
                });
        }
    }

    cacheImportantContent() {
        // Cache essential content for offline use
        const cacheData = {
            attractions: this.getAttractionsData(),
            culturalInfo: this.getCulturalInfo(),
            basicPhrases: this.getBasicPhrases(),
            emergencyContacts: this.getEmergencyContacts()
        };

        localStorage.setItem('paris-offline-data', JSON.stringify(cacheData));
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    triggerSendMessage() {
        const sendBtn = document.getElementById('chatbot-send');
        if (sendBtn) {
            sendBtn.click();
        }
    }

    toggleChatbot() {
        const chatbot = window.parisApp?.chatbot;
        if (chatbot) {
            chatbot.toggleChatbot();
        }
    }

    loadUserPreferences() {
        const saved = localStorage.getItem('paris-advanced-preferences');
        return saved ? JSON.parse(saved) : {
            theme: 'light',
            language: 'en',
            notifications: true,
            location: null,
            interests: [],
            accessibility: false
        };
    }

    saveUserPreferences() {
        localStorage.setItem('paris-advanced-preferences', JSON.stringify(this.userPreferences));
    }
}

// Recommendation Engine
class RecommendationEngine {
    constructor() {
        this.userBehavior = this.loadUserBehavior();
        this.attractionsData = this.getAttractionsData();
        this.culturalData = this.getCulturalData();
    }

    learnFromUserBehavior() {
        // Track user interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.attraction-card, .culture-card')) {
                this.recordUserInterest(e.target.textContent);
            }
        });

        // Track chatbot interactions
        document.addEventListener('chatbotMessage', (e) => {
            this.recordUserInterest(e.detail.message);
        });
    }

    recordUserInterest(content) {
        const interests = this.extractInterestsFromContent(content);
        interests.forEach(interest => {
            this.userBehavior.interests[interest] = (this.userBehavior.interests[interest] || 0) + 1;
        });
        this.saveUserBehavior();
    }

    extractInterestsFromContent(content) {
        const interests = [];
        const keywords = {
            museums: ['museum', 'louvre', 'orsay', 'art', 'exhibition'],
            monuments: ['tower', 'eiffel', 'arc', 'cathedral', 'church'],
            food: ['restaurant', 'cafe', 'food', 'cuisine', 'wine'],
            shopping: ['shopping', 'store', 'fashion', 'boutique'],
            nature: ['park', 'garden', 'outdoor', 'nature'],
            nightlife: ['night', 'bar', 'club', 'evening', 'show']
        };

        const lowerContent = content.toLowerCase();
        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => lowerContent.includes(word))) {
                interests.push(category);
            }
        }

        return interests;
    }

    getPersonalizedRecommendations() {
        const topInterests = Object.entries(this.userBehavior.interests)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([interest]) => interest);

        const recommendations = [];
        topInterests.forEach(interest => {
            const items = this.getRecommendationsForInterest(interest);
            recommendations.push(...items);
        });

        return recommendations.slice(0, 5);
    }

    getRecommendationsForInterest(interest) {
        switch (interest) {
            case 'museums':
                return [
                    { name: 'Musée Rodin', type: 'Museum', rating: 4.8 },
                    { name: 'Musée Picasso', type: 'Museum', rating: 4.6 },
                    { name: 'Musée d\'Orsay', type: 'Museum', rating: 4.9 }
                ];
            case 'monuments':
                return [
                    { name: 'Sainte-Chapelle', type: 'Monument', rating: 4.7 },
                    { name: 'Panthéon', type: 'Monument', rating: 4.5 },
                    { name: 'Conciergerie', type: 'Monument', rating: 4.4 }
                ];
            case 'food':
                return [
                    { name: 'Le Comptoir du Relais', type: 'Restaurant', rating: 4.6 },
                    { name: 'L\'As du Fallafel', type: 'Restaurant', rating: 4.5 },
                    { name: 'Pierre Hermé', type: 'Patisserie', rating: 4.8 }
                ];
            default:
                return [];
        }
    }

    loadUserBehavior() {
        const saved = localStorage.getItem('paris-user-behavior');
        return saved ? JSON.parse(saved) : {
            interests: {},
            visitCount: 0,
            timeSpent: 0,
            pagesVisited: [],
            lastVisit: null
        };
    }

    saveUserBehavior() {
        localStorage.setItem('paris-user-behavior', JSON.stringify(this.userBehavior));
    }
}

// Real-time Data Integration
class RealTimeData {
    async getWeather() {
        // In a real implementation, this would connect to a weather API
        return {
            temperature: 22,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            forecast: [
                { day: 'Today', high: 24, low: 18, condition: 'Partly Cloudy' },
                { day: 'Tomorrow', high: 26, low: 19, condition: 'Sunny' },
                { day: 'Wednesday', high: 23, low: 17, condition: 'Cloudy' }
            ]
        };
    }

    async getEvents() {
        // Mock events data
        return [
            { name: 'Paris Fashion Week', date: '2025-09-15', type: 'Fashion' },
            { name: 'Nuit Blanche', date: '2025-10-07', type: 'Art' },
            { name: 'Paris Marathon', date: '2025-04-13', type: 'Sports' },
            { name: 'Bastille Day Celebrations', date: '2025-07-14', type: 'National' }
        ];
    }

    async getTransportStatus() {
        return {
            metro: 'Normal Service',
            rer: 'Minor Delays on RER B',
            bus: 'Normal Service',
            traffic: 'Moderate'
        };
    }
}

// Social Features
class SocialFeatures {
    async sharePhoto(file, caption) {
        // In a real implementation, this would upload to a server
        console.log('Sharing photo:', file.name, 'with caption:', caption);
        
        // Save to local storage for demo
        const photos = JSON.parse(localStorage.getItem('shared-photos') || '[]');
        photos.push({
            name: file.name,
            caption: caption,
            timestamp: Date.now(),
            url: URL.createObjectURL(file)
        });
        localStorage.setItem('shared-photos', JSON.stringify(photos));
    }

    async getUserReviews() {
        // Mock reviews data
        return [
            { user: 'Sarah M.', rating: 5, comment: 'Amazing experience at the Eiffel Tower!', date: '2025-11-10' },
            { user: 'John D.', rating: 4, comment: 'Louvre was incredible but very crowded', date: '2025-11-09' },
            { user: 'Maria L.', rating: 5, comment: 'Perfect romantic getaway in Paris', date: '2025-11-08' }
        ];
    }
}

// Gamification System
class Gamification {
    constructor() {
        this.userStats = this.loadUserStats();
        this.achievements = this.loadAchievements();
    }

    getUserStats() {
        return this.userStats;
    }

    getUserProgress() {
        return {
            level: this.calculateLevel(),
            points: this.userStats.totalPoints,
            nextLevelPoints: this.getNextLevelPoints(),
            completedAttractions: this.userStats.completedAttractions,
            sharedPhotos: this.userStats.sharedPhotos,
            createdItineraries: this.userStats.createdItineraries
        };
    }

    getUserAchievements() {
        return this.achievements;
    }

    hasAchievement(achievementKey) {
        return this.achievements.includes(achievementKey);
    }

    unlockAchievement(achievementKey, achievement) {
        if (!this.hasAchievement(achievementKey)) {
            this.achievements.push(achievementKey);
            this.userStats.totalPoints += achievement.points;
            this.saveUserStats();
            this.saveAchievements();
        }
    }

    calculateLevel() {
        return Math.floor(this.userStats.totalPoints / 100) + 1;
    }

    getNextLevelPoints() {
        const currentLevel = this.calculateLevel();
        return currentLevel * 100;
    }

    loadUserStats() {
        const saved = localStorage.getItem('paris-user-stats');
        return saved ? JSON.parse(saved) : {
            totalPoints: 0,
            completedAttractions: 0,
            sharedPhotos: 0,
            createdItineraries: 0,
            level: 1
        };
    }

    saveUserStats() {
        localStorage.setItem('paris-user-stats', JSON.stringify(this.userStats));
    }

    loadAchievements() {
        const saved = localStorage.getItem('paris-user-achievements');
        return saved ? JSON.parse(saved) : [];
    }

    saveAchievements() {
        localStorage.setItem('paris-user-achievements', JSON.stringify(this.achievements));
    }
}

// Initialize Advanced Features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.advancedFeatures = new AdvancedFeatures();
        console.log('🚀 Advanced features initialized');
    }, 1000);
});