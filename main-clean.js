// Paris Tourism Website - Main JavaScript (Clean Version)
// Basic functionality with chatbot, bilingual support, and animations

// Firebase Configuration
// IMPORTANT: Replace these with your own Firebase credentials
// See .env.example for setup instructions
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
}

// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('paris-lang') || 'en';
        this.translations = {
            en: {
                // Navigation
                home: 'Home',
                attractions: 'Attractions',
                culture: 'Culture',
                contact: 'Contact',

                // Hero Section
                heroTitle: 'Discover the Magic of Paris',
                heroSubtitle: 'Experience the City of Light like never before',
                heroButton: 'Start Your Journey',
                exploreMore: 'Explore More',
                learnMore: 'Learn More',
                viewDetails: 'View Details',
                bookNow: 'Book Now',

                // Statistics
                visitorsTitle: 'Annual Visitors',
                visitorsCount: '48.7M',
                revenueTitle: 'Tourism Revenue',
                revenueCount: '€71B',
                jobsTitle: 'Jobs Supported',
                jobsCount: '500K+',

                // Attractions
                eiffelTower: 'Eiffel Tower',
                louvre: 'Louvre Museum',
                notreDame: 'Notre Dame Cathedral',
                arcTriomphe: 'Arc de Triomphe',
                sacreCoeur: 'Sacré-Cœur',
                versailles: 'Palace of Versailles',
                topAttractions: 'Top Attractions',
                popularDestinations: 'Popular Destinations',
                mustSee: 'Must See in Paris',

                // Culture
                cuisine: 'French Cuisine',
                wine: 'Wine Culture',
                fashion: 'Paris Fashion',
                art: 'Art & Museums',
                exploreCulture: 'Explore French Culture',
                culturalExperiences: 'Cultural Experiences',

                // Weather & Currency
                weather: 'Weather',
                currentWeather: 'Current Weather',
                forecast: 'Forecast',
                temperature: 'Temperature',
                currency: 'Currency',
                currencyConverter: 'Currency Converter',
                convert: 'Convert',
                amount: 'Amount',
                from: 'From',
                to: 'To',

                // Chatbot
                chatbotTitle: 'Paris Assistant',
                chatbotPlaceholder: 'Ask me about Paris...',
                chatbotWelcome: 'Bonjour! I\'m your Paris guide. How can I help you?',
                askQuestion: 'Ask a Question',
                chatWithUs: 'Chat with Us',

                // Contact
                contactTitle: 'Contact Us',
                contactName: 'Your Name',
                contactEmail: 'Email Address',
                contactSubject: 'Subject',
                contactMessage: 'Message',
                contactSend: 'Send Message',
                contactSuccess: 'Message sent successfully!',
                contactError: 'Please fill in all fields.',
                getInTouch: 'Get in Touch',

                // Common
                search: 'Search',
                filter: 'Filter',
                category: 'Category',
                all: 'All',
                showMore: 'Show More',
                showLess: 'Show Less',
                readMore: 'Read More',
                share: 'Share',
                save: 'Save',
                download: 'Download',
                print: 'Print',
                close: 'Close',
                back: 'Back',
                next: 'Next',
                previous: 'Previous',
                loading: 'Loading...',

                // Footer
                copyright: '© 2025 Paris Tourism. All rights reserved.',
                quickLinks: 'Quick Links',
                resources: 'Resources',
                contactInfo: 'Contact Info',
                followUs: 'Follow Us',
                newsletter: 'Newsletter',
                subscribe: 'Subscribe',
                privacyPolicy: 'Privacy Policy',
                termsOfService: 'Terms of Service'
            },
            fr: {
                // Navigation
                home: 'Accueil',
                attractions: 'Attractions',
                culture: 'Culture',
                contact: 'Contact',

                // Hero Section
                heroTitle: 'Découvrez la Magie de Paris',
                heroSubtitle: 'Vivez la Ville Lumière comme jamais auparavant',
                heroButton: 'Commencez Votre Voyage',
                exploreMore: 'Explorer Plus',
                learnMore: 'En Savoir Plus',
                viewDetails: 'Voir les Détails',
                bookNow: 'Réserver Maintenant',

                // Statistics
                visitorsTitle: 'Visiteurs Annuels',
                visitorsCount: '48,7M',
                revenueTitle: 'Revenu du Tourisme',
                revenueCount: '71M€',
                jobsTitle: 'Emplois Créés',
                jobsCount: '500K+',

                // Attractions
                eiffelTower: 'Tour Eiffel',
                louvre: 'Musée du Louvre',
                notreDame: 'Cathédrale Notre-Dame',
                arcTriomphe: 'Arc de Triomphe',
                sacreCoeur: 'Sacré-Cœur',
                versailles: 'Château de Versailles',
                topAttractions: 'Attractions Principales',
                popularDestinations: 'Destinations Populaires',
                mustSee: 'Incontournables de Paris',

                // Culture
                cuisine: 'Cuisine Française',
                wine: 'Culture du Vin',
                fashion: 'Mode Parisienne',
                art: 'Art & Musées',
                exploreCulture: 'Explorer la Culture Française',
                culturalExperiences: 'Expériences Culturelles',

                // Weather & Currency
                weather: 'Météo',
                currentWeather: 'Météo Actuelle',
                forecast: 'Prévisions',
                temperature: 'Température',
                currency: 'Devise',
                currencyConverter: 'Convertisseur de Devises',
                convert: 'Convertir',
                amount: 'Montant',
                from: 'De',
                to: 'À',

                // Chatbot
                chatbotTitle: 'Assistant Parisien',
                chatbotPlaceholder: 'Demandez-moi sur Paris...',
                chatbotWelcome: 'Bonjour ! Je suis votre guide parisien. Comment puis-je vous aider ?',
                askQuestion: 'Poser une Question',
                chatWithUs: 'Discutez avec Nous',

                // Contact
                contactTitle: 'Nous Contacter',
                contactName: 'Votre Nom',
                contactEmail: 'Adresse Email',
                contactSubject: 'Sujet',
                contactMessage: 'Message',
                contactSend: 'Envoyer le Message',
                contactSuccess: 'Message envoyé avec succès !',
                contactError: 'Veuillez remplir tous les champs.',
                getInTouch: 'Contactez-Nous',

                // Common
                search: 'Rechercher',
                filter: 'Filtrer',
                category: 'Catégorie',
                all: 'Tous',
                showMore: 'Afficher Plus',
                showLess: 'Afficher Moins',
                readMore: 'Lire Plus',
                share: 'Partager',
                save: 'Sauvegarder',
                download: 'Télécharger',
                print: 'Imprimer',
                close: 'Fermer',
                back: 'Retour',
                next: 'Suivant',
                previous: 'Précédent',
                loading: 'Chargement...',

                // Footer
                copyright: '© 2025 Tourisme Paris. Tous droits réservés.',
                quickLinks: 'Liens Rapides',
                resources: 'Ressources',
                contactInfo: 'Informations de Contact',
                followUs: 'Suivez-Nous',
                newsletter: 'Newsletter',
                subscribe: 'S\'abonner',
                privacyPolicy: 'Politique de Confidentialité',
                termsOfService: 'Conditions d\'Utilisation'
            }
        };
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('paris-lang', lang);
        this.updateAllText();
        this.updateLanguageUI();
    }

    updateAllText() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
            }
        });
    }

    translate(key) {
        return this.translations[this.currentLang][key] || key;
    }

    updateLanguageUI() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }
}

// Chatbot functionality
class ParisChatbot {
    constructor(geminiKey, languageManager) {
        this.geminiKey = geminiKey;
        this.langManager = languageManager;
        this.isOpen = false;
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.bindEvents();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div id="chatbot-container" class="fixed bottom-6 right-6 z-50">
                <div id="chatbot-button" class="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </div>
                <div id="chatbot-window" class="hidden bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col mb-4">
                    <div class="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <h3 class="font-semibold" data-translate="chatbotTitle">Paris Assistant</h3>
                        <button id="chatbot-close" class="text-white hover:text-gray-200">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto"></div>
                    <div class="p-4 border-t">
                        <div class="flex gap-2">
                            <input id="chatbot-input" type="text" class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ask me about Paris...">
                            <button id="chatbot-send" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const button = document.getElementById('chatbot-button');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        button.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.closeChatbot());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        if (!this.isOpen) {
            window.classList.remove('hidden');
            button.style.display = 'none';
            this.isOpen = true;
            
            if (this.conversationHistory.length === 0) {
                this.addMessage(this.langManager.translate('chatbotWelcome'), 'bot');
            }
        }
    }

    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        window.classList.add('hidden');
        button.style.display = 'block';
        this.isOpen = false;
    }

    formatMarkdown(text) {
        // Convert markdown to HTML
        return text
            // Bold: **text** -> <strong>text</strong>
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Bullet points: * text or • text
            .replace(/^[•\*]\s+(.+)$/gm, '<div style="margin-left:12px">• $1</div>')
            // Newlines to <br>
            .replace(/\n/g, '<br>');
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-3 ${sender === 'user' ? 'text-right' : 'text-left'}`;

        const messageBubble = document.createElement('div');
        messageBubble.className = `inline-block px-4 py-2 rounded-lg max-w-xs ${
            sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
        }`;

        // Format markdown for bot messages, plain text for user
        if (sender === 'bot') {
            messageBubble.innerHTML = this.formatMarkdown(message);
        } else {
            messageBubble.textContent = message;
        }

        messageDiv.appendChild(messageBubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.conversationHistory.push({ message, sender });
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'mb-3 text-left';
        typingDiv.innerHTML = '<div class="inline-block px-4 py-2 rounded-lg bg-gray-100 text-gray-800">...</div>';
        document.getElementById('chatbot-messages').appendChild(typingDiv);
        
        try {
            const response = await this.getAIResponse(message);
            typingDiv.remove();
            this.addMessage(response, 'bot');
        } catch (error) {
            typingDiv.remove();
            this.addMessage('I apologize, but I\'m having trouble connecting. Please try again later.', 'bot');
            console.error('Chatbot error:', error);
        }
    }

    async callGeminiAPI(message) {
        try {
            // Updated to gemini-2.0-flash - Google's latest and fastest model supporting text and images
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiKey}`;
            const lang = this.langManager.currentLang;

            const systemPrompt = lang === 'fr'
                ? `Assistant Paris. MAX 30 mots. Format: **Titre**\n• Point 1\n• Point 2. Très bref!`
                : `Paris assistant. MAX 30 words. Format: **Title**\n• Point 1\n• Point 2. Very brief!`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${systemPrompt}\n\nUser question: ${message}`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Gemini API request failed');
            }

            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiResponse) {
                return aiResponse;
            }

            return null;
        } catch (error) {
            console.error('Gemini API error:', error);
            return null;
        }
    }

    async getAIResponse(message) {
        // Try Gemini API first
        try {
            const geminiResponse = await this.callGeminiAPI(message);
            if (geminiResponse) {
                return geminiResponse;
            }
        } catch (error) {
            console.log('Gemini API unavailable, using fallback responses');
        }

        // Fallback to predefined responses if Gemini fails
        const responses = {
            en: {
                'best time to visit': '**Best Time**\n• Spring (Mar-May)\n• Autumn (Sep-Nov)\n• Fewer crowds!',
                'eiffel tower': '**Eiffel Tower**\n• 9am-11:45pm daily\n• Book online!',
                'museums': '**Top Museums**\n• Louvre\n• Musée d\'Orsay\n• Pompidou',
                'food': '**Must-Try**\n• Croissants\n• Cheese & wine\n• Macarons',
                'transport': '**Transport**\n• Metro is best\n• Get Navigo pass',
                'money': '**Currency**\nEuro (€). Cards accepted.',
                'currency': '**Euro (€)**\n1 EUR ≈ $1.10',
                'exchange': '**Exchange**\nUse ATMs for best rates.',
                'atm': '**ATMs**\nEverywhere. Called "DAB".',
                'hello': '👋 Bonjour! How can I help?',
                'help': '**I can help with:**\n• Attractions\n• Food\n• Transport',
                'weather': '**Weather**\n• Spring: 15-20°C\n• Summer: 20-25°C'
            },
            fr: {
                'best time to visit': '**Meilleur Moment**\n• Printemps (mars-mai)\n• Automne (sep-nov)\n• Moins de monde!',
                'eiffel tower': '**Tour Eiffel**\n• 9h-23h45\n• Réservez en ligne!',
                'museums': '**Musées**\n• Louvre\n• Musée d\'Orsay\n• Pompidou',
                'food': '**À Goûter**\n• Croissants\n• Fromage & vin\n• Macarons',
                'transport': '**Transport**\n• Métro est idéal\n• Carte Navigo',
                'money': '**Monnaie**\nEuro (€). Cartes OK.',
                'currency': '**Euro (€)**\n1 EUR ≈ 1,10 USD',
                'exchange': '**Change**\nDAB = meilleurs taux.',
                'atm': '**DAB**\nPartout. Appelé "DAB".',
                'hello': '👋 Bonjour! Comment aider?',
                'help': '**Je peux aider:**\n• Attractions\n• Restaurants\n• Transport',
                'weather': '**Météo**\n• Printemps: 15-20°C\n• Été: 20-25°C'
            }
        };

        const lang = this.langManager.currentLang;
        const lowerMessage = message.toLowerCase();

        for (const [key, response] of Object.entries(responses[lang])) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return lang === 'fr'
            ? 'Je suis désolé, je ne comprends pas votre question. Pouvez-vous reformuler ?'
            : 'I\'m sorry, I don\'t understand your question. Could you please rephrase?';
    }
}

// Animation and Effects Manager
class AnimationManager {
    constructor() {
        this.initScrollAnimations();
        this.initTypewriter();
        this.initCounters();
    }

    initScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('fade-in-up')) {
                        anime({
                            targets: element,
                            translateY: [20, 0],
                            opacity: [0, 1],
                            duration: 600,
                            easing: 'easeOutQuad'
                        });
                    }
                    
                    if (element.classList.contains('stagger-children')) {
                        const children = element.children;
                        anime({
                            targets: children,
                            translateY: [20, 0],
                            opacity: [0, 1],
                            duration: 600,
                            delay: anime.stagger(100),
                            easing: 'easeOutQuad'
                        });
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.fade-in-up, .stagger-children').forEach(el => {
            observer.observe(el);
        });
    }

    initTypewriter() {
        const typewriterElement = document.getElementById('typewriter-text');
        if (typewriterElement && typeof Typed !== 'undefined') {
            new Typed('#typewriter-text', {
                strings: [
                    'Discover the Magic of Paris',
                    'Explore the City of Light',
                    'Experience French Culture',
                    'Create Unforgettable Memories'
                ],
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const countUp = (element, target) => {
            anime({
                targets: element,
                innerHTML: [0, target],
                duration: 2000,
                round: 1,
                easing: 'easeOutQuad'
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.dataset.target);
                    countUp(element, target);
                    observer.unobserve(element);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }
}

// Form Handler
class FormHandler {
    constructor(formspreeId, languageManager) {
        this.formspreeId = formspreeId;
        this.langManager = languageManager;
        this.init();
    }

    init() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        if (!isValid) {
            this.showMessage(this.langManager.translate('contactError'), 'error');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="animate-spin">⏳</span>';
        
        try {
            const response = await fetch(`https://formspree.io/f/${this.formspreeId}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showMessage(this.langManager.translate('contactSuccess'), 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            this.showMessage('An error occurred. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = this.langManager.translate('contactSend');
        }
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Session Management
class SessionManager {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userPreferences = this.loadUserPreferences();
        this.itinerary = this.loadItinerary();
        this.visitHistory = this.loadVisitHistory();
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    init() {
        this.startSession();
        this.trackPageVisit();
    }

    startSession() {
        if (!localStorage.getItem('paris-session-id')) {
            localStorage.setItem('paris-session-id', this.sessionId);
            localStorage.setItem('paris-session-start', Date.now().toString());
        } else {
            this.sessionId = localStorage.getItem('paris-session-id');
        }
    }

    loadUserPreferences() {
        const prefs = localStorage.getItem('paris-user-preferences');
        return prefs ? JSON.parse(prefs) : {
            language: 'en',
            theme: 'light',
            newsletter: false,
            chatbotWelcomed: false
        };
    }

    saveUserPreferences() {
        localStorage.setItem('paris-user-preferences', JSON.stringify(this.userPreferences));
    }

    loadItinerary() {
        const itinerary = localStorage.getItem('paris-itinerary');
        return itinerary ? JSON.parse(itinerary) : [];
    }

    saveItinerary() {
        localStorage.setItem('paris-itinerary', JSON.stringify(this.itinerary));
    }

    loadVisitHistory() {
        const history = localStorage.getItem('paris-visit-history');
        return history ? JSON.parse(history) : [];
    }

    saveVisitHistory() {
        localStorage.setItem('paris-visit-history', JSON.stringify(this.visitHistory));
    }

    trackPageVisit() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const visit = {
            page: currentPage,
            timestamp: Date.now(),
            sessionId: this.sessionId
        };
        
        this.visitHistory.push(visit);
        
        // Keep only last 50 visits
        if (this.visitHistory.length > 50) {
            this.visitHistory = this.visitHistory.slice(-50);
        }
        
        this.saveVisitHistory();
    }

    addToItinerary(item) {
        if (!this.itinerary.find(i => i.id === item)) {
            const itineraryItem = {
                id: item,
                addedAt: Date.now(),
                sessionId: this.sessionId
            };
            this.itinerary.push(itineraryItem);
            this.saveItinerary();

            // Save to Firebase if available
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                try {
                    firebase.firestore().collection('itineraries').doc(this.sessionId).set({
                        items: this.itinerary,
                        lastUpdated: Date.now()
                    }).catch(err => console.log('Firebase save error:', err));
                } catch (error) {
                    console.log('Firebase not available:', error);
                }
            }

            return true;
        }
        return false;
    }

    removeFromItinerary(item) {
        this.itinerary = this.itinerary.filter(i => i.id !== item);
        this.saveItinerary();
    }

    getItinerary() {
        return this.itinerary.map(item => item.id);
    }

    updatePreference(key, value) {
        this.userPreferences[key] = value;
        this.saveUserPreferences();
    }

    getSessionDuration() {
        const startTime = parseInt(localStorage.getItem('paris-session-start') || '0');
        return Date.now() - startTime;
    }

    getTotalVisits() {
        return this.visitHistory.length;
    }

    getMostVisitedPages() {
        const pageCounts = {};
        this.visitHistory.forEach(visit => {
            pageCounts[visit.page] = (pageCounts[visit.page] || 0) + 1;
        });
        
        return Object.entries(pageCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    }

    clearSession() {
        localStorage.removeItem('paris-session-id');
        localStorage.removeItem('paris-session-start');
        localStorage.removeItem('paris-user-preferences');
        localStorage.removeItem('paris-itinerary');
        localStorage.removeItem('paris-visit-history');
    }

    exportSessionData() {
        return {
            sessionId: this.sessionId,
            sessionStart: localStorage.getItem('paris-session-start'),
            preferences: this.userPreferences,
            itinerary: this.itinerary,
            visitHistory: this.visitHistory
        };
    }
}

// Main Application Initialization
class ParisTourismApp {
    constructor() {
        this.langManager = new LanguageManager();
        this.chatbot = null;
        this.animationManager = null;
        this.formHandler = null;
        this.sessionManager = null;
        
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Initialize session manager first
        this.sessionManager = new SessionManager();
        
        // Initialize language system
        this.langManager.updateAllText();
        this.langManager.updateLanguageUI();
        
        // Initialize chatbot
        // IMPORTANT: Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
        this.chatbot = new ParisChatbot('YOUR_GEMINI_API_KEY', this.langManager);
        
        // Initialize animations
        this.animationManager = new AnimationManager();
        
        // Initialize form handler
        this.formHandler = new FormHandler('mwpaegrz', this.langManager);
        
        // Bind language switcher events
        this.bindLanguageEvents();
        
        // Initialize other interactive components
        this.initInteractiveComponents();
        
        // Initialize session-related features
        this.initSessionFeatures();
        
        console.log('Paris Tourism Website initialized successfully!');
        console.log('Session ID:', this.sessionManager.sessionId);
        console.log('Session Duration:', Math.floor(this.sessionManager.getSessionDuration() / 1000), 'seconds');
    }

    initSessionFeatures() {
        // Restore user's language preference
        const savedLang = this.sessionManager.userPreferences.language;
        if (savedLang && savedLang !== this.langManager.currentLang) {
            this.langManager.switchLanguage(savedLang);
        }
        
        // Track language preference changes
        const originalSwitchLanguage = this.langManager.switchLanguage.bind(this.langManager);
        this.langManager.switchLanguage = (lang) => {
            originalSwitchLanguage(lang);
            this.sessionManager.updatePreference('language', lang);
        };
        
        // Initialize itinerary from session
        this.restoreUserItinerary();
        
        // Add session info to chatbot context
        if (this.chatbot) {
            this.chatbot.sessionManager = this.sessionManager;
        }
    }

    restoreUserItinerary() {
        const savedItinerary = this.sessionManager.getItinerary();
        if (savedItinerary.length > 0) {
            console.log('Restored itinerary:', savedItinerary);
        }
    }

    // Public method to access session manager
    getSessionManager() {
        return this.sessionManager;
    }

    // Method to get user insights
    getUserInsights() {
        return {
            sessionDuration: this.sessionManager.getSessionDuration(),
            totalVisits: this.sessionManager.getTotalVisits(),
            mostVisitedPages: this.sessionManager.getMostVisitedPages(),
            currentLanguage: this.langManager.currentLang,
            itineraryCount: this.sessionManager.getItinerary().length,
            preferences: this.sessionManager.userPreferences
        };
    }

    bindLanguageEvents() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.langManager.switchLanguage(lang);
            });
        });
    }

    initInteractiveComponents() {
        // Initialize hover effects
        this.initHoverEffects();
        
        // Initialize mobile menu
        this.initMobileMenu();
        
        // Initialize smooth scrolling
        this.initSmoothScrolling();
    }

    initHoverEffects() {
        const cards = document.querySelectorAll('.attraction-card, .culture-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.05,
                    rotateY: 5,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    rotateY: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    initMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize the application
const app = new ParisTourismApp();

// Make app globally accessible
window.parisApp = app;

// Add session debug info (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('=== Paris Tourism Session Debug Info ===');
            console.log('User Insights:', app.getUserInsights());
            console.log('Session Data:', app.getSessionManager().exportSessionData());
            console.log('=====================================');
        }, 2000);
    });
}