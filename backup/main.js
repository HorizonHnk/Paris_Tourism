// Paris Tourism Website - Main JavaScript
// Bilingual support, chatbot, animations, and interactive components

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
                
                // Culture
                cuisine: 'French Cuisine',
                wine: 'Wine Culture',
                fashion: 'Paris Fashion',
                art: 'Art & Museums',
                
                // Chatbot
                chatbotTitle: 'Paris Assistant',
                chatbotPlaceholder: 'Ask me about Paris...',
                chatbotWelcome: 'Bonjour! I\'m your Paris guide. How can I help you?',
                chatbotMinimize: 'Minimize',
                chatbotClose: 'Close',
                chatbotVoice: 'Voice input',
                chatbotAlwaysHere: 'Always here to help',
                chatbotSuggestions: 'Quick suggestions',
                chatbotError: 'I apologize, but I\'m having trouble connecting. Please try again later.',
                chatbotRephrase: 'I\'m sorry, I don\'t understand your question. Could you please rephrase or choose one of the quick suggestions?',
                chatbotVoiceComingSoon: 'Voice input feature coming soon! 🎤',
                chatbotClear: 'Clear conversation',
                chatbotExport: 'Export chat',
                
                // Contact
                contactTitle: 'Contact Us',
                contactName: 'Your Name',
                contactEmail: 'Email Address',
                contactSubject: 'Subject',
                contactMessage: 'Message',
                contactSend: 'Send Message',
                contactSuccess: 'Message sent successfully!',
                contactError: 'Please fill in all fields.',
                
                // Footer
                copyright: '© 2025 Paris Tourism. All rights reserved.'
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
                
                // Culture
                cuisine: 'Cuisine Française',
                wine: 'Culture du Vin',
                fashion: 'Mode Parisienne',
                art: 'Art & Musées',
                
                // Chatbot
                chatbotTitle: 'Assistant Parisien',
                chatbotPlaceholder: 'Demandez-moi sur Paris...',
                chatbotWelcome: 'Bonjour ! Je suis votre guide parisien. Comment puis-je vous aider ?',
                chatbotMinimize: 'Réduire',
                chatbotClose: 'Fermer',
                chatbotVoice: 'Entrée vocale',
                chatbotAlwaysHere: 'Toujours là pour vous aider',
                chatbotSuggestions: 'Suggestions rapides',
                chatbotError: 'Je suis désolé, j\'ai des difficultés de connexion. Veuillez réessayer plus tard.',
                chatbotRephrase: 'Je suis désolé, je ne comprends pas votre question. Pouvez-vous reformuler ou choisir l\'une des suggestions rapides ?',
                chatbotVoiceComingSoon: 'Fonctionnalité d\'entrée vocale à venir ! 🎤',
                chatbotClear: 'Effacer la conversation',
                chatbotExport: 'Exporter le chat',
                
                // Contact
                contactTitle: 'Nous Contacter',
                contactName: 'Votre Nom',
                contactEmail: 'Adresse Email',
                contactSubject: 'Sujet',
                contactMessage: 'Message',
                contactSend: 'Envoyer le Message',
                contactSuccess: 'Message envoyé avec succès !',
                contactError: 'Veuillez remplir tous les champs.',
                
                // Footer
                copyright: '© 2025 Tourisme Paris. Tous droits réservés.'
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
        console.log(`Updating ${elements.length} elements to ${this.currentLang}`);
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
                console.log(`Updated ${key}: ${element.textContent}`);
            } else {
                console.warn(`Missing translation for key: ${key} in language: ${this.currentLang}`);
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

// Enhanced Chatbot functionality - Imported from chatbot-improved.js
class EnhancedParisChatbot {
    constructor(geminiKey, languageManager, sessionManager = null) {
        this.geminiKey = geminiKey;
        this.langManager = languageManager;
        this.sessionManager = sessionManager;
        this.isOpen = false;
        this.isMinimized = false;
        this.conversationHistory = [];
        this.unreadCount = 0;
        this.currentSuggestions = [];
        this.weatherData = null;
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.bindEvents();
        this.loadConversationHistory();
    }

    createChatbotUI() {
        const chatbotHTML = `
            <div id="chatbot-container" class="fixed bottom-6 right-6 z-50">
                <!-- Chat Button -->
                <div id="chatbot-button" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 relative">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span id="unread-badge" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
                </div>

                <!-- Chat Window -->
                <div id="chatbot-window" class="hidden bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col mb-4 transition-all duration-300 ease-in-out transform scale-95 opacity-0">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer" id="chatbot-header">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-semibold text-sm" data-translate="chatbotTitle">Paris Assistant</h3>
                                <p class="text-xs opacity-80">Always here to help</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button id="chatbot-minimize" class="text-white hover:text-gray-200 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                                </svg>
                            </button>
                            <button id="chatbot-close" class="text-white hover:text-gray-200 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Messages Container -->
                    <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                        <!-- Welcome message will be added here -->
                    </div>

                    <!-- Quick Suggestions -->
                    <div id="quick-suggestions" class="px-4 py-2 bg-gray-100 border-t border-gray-200">
                        <div class="flex flex-wrap gap-2" id="suggestions-container">
                            <!-- Quick suggestion buttons will be added here -->
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="p-4 border-t bg-white">
                        <div class="flex items-center space-x-2">
                            <button id="chatbot-voice" class="text-gray-400 hover:text-blue-600 transition-colors p-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                </svg>
                            </button>
                            <div class="flex-1 relative">
                                <textarea 
                                    id="chatbot-input" 
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    placeholder="Ask me about Paris..."
                                    rows="1"
                                    maxlength="500"
                                ></textarea>
                                <div class="absolute bottom-2 right-2 text-xs text-gray-400">
                                    <span id="char-count">0</span>/500
                                </div>
                            </div>
                            <button id="chatbot-send" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        const minimizeBtn = document.getElementById('chatbot-minimize');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const voiceBtn = document.getElementById('chatbot-voice');
        const header = document.getElementById('chatbot-header');

        button.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.closeChatbot());
        minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        header.addEventListener('click', (e) => {
            if (e.target === header || e.target.closest('#chatbot-header')) {
                this.toggleMinimize();
            }
        });
        sendBtn.addEventListener('click', () => this.sendMessage());
        voiceBtn.addEventListener('click', () => this.toggleVoiceInput());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        input.addEventListener('input', () => this.updateCharCount());
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.shiftKey) {
                // Allow shift+enter for new line
                return;
            }
        });

        // Auto-resize textarea
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = input.scrollHeight + 'px';
        });
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        if (!this.isOpen) {
            window.classList.remove('hidden');
            button.classList.add('hidden');
            
            // Animate in
            setTimeout(() => {
                window.classList.remove('scale-95', 'opacity-0');
                window.classList.add('scale-100', 'opacity-100');
            }, 10);
            
            this.isOpen = true;
            this.unreadCount = 0;
            this.updateUnreadBadge();
            
            if (this.conversationHistory.length === 0) {
                this.showWelcomeMessage();
            }
        }
    }

    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        window.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            window.classList.add('hidden');
            button.classList.remove('hidden');
        }, 300);
        
        this.isOpen = false;
        this.isMinimized = false;
    }

    toggleMinimize() {
        const window = document.getElementById('chatbot-window');
        
        if (this.isMinimized) {
            window.style.height = '500px';
            window.querySelector('#chatbot-messages').style.display = 'block';
            window.querySelector('#quick-suggestions').style.display = 'block';
            window.querySelector('.border-t').style.display = 'flex';
        } else {
            window.style.height = '60px';
            window.querySelector('#chatbot-messages').style.display = 'none';
            window.querySelector('#quick-suggestions').style.display = 'none';
            window.querySelector('.border-t').style.display = 'none';
        }
        
        this.isMinimized = !this.isMinimized;
    }

    showWelcomeMessage() {
        const welcomeMessage = this.langManager.translate('chatbotWelcome');
        this.addMessage(welcomeMessage, 'bot');
        this.showQuickSuggestions();
    }

    showQuickSuggestions() {
        const suggestionsContainer = document.getElementById('suggestions-container');
        const suggestions = this.langManager.currentLang === 'fr' ? [
            { text: 'Planifier itinéraire', query: 'créer itinéraire' },
            { text: 'Recommandations', query: 'recommandations attractions' },
            { text: 'Meilleur moment', query: 'best time to visit' },
            { text: 'Tour Eiffel', query: 'eiffel tower' },
            { text: 'Musées', query: 'museums' },
            { text: 'Cuisine', query: 'food' },
            { text: 'Transport', query: 'transport' },
            { text: 'Budget', query: 'budget tips' }
        ] : [
            { text: 'Plan itinerary', query: 'create itinerary' },
            { text: 'Recommendations', query: 'attraction recommendations' },
            { text: 'Best time to visit', query: 'best time to visit' },
            { text: 'Eiffel Tower', query: 'eiffel tower' },
            { text: 'Museums', query: 'museums' },
            { text: 'Food', query: 'food' },
            { text: 'Transport', query: 'transport' },
            { text: 'Budget tips', query: 'budget tips' }
        ];

        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors whitespace-nowrap';
            button.textContent = suggestion.text;
            button.addEventListener('click', () => {
                document.getElementById('chatbot-input').value = suggestion.query;
                this.sendMessage();
            });
            suggestionsContainer.appendChild(button);
        });
    }

    updateCharCount() {
        const input = document.getElementById('chatbot-input');
        const charCount = document.getElementById('char-count');
        const count = input.value.length;
        charCount.textContent = count;
        charCount.style.color = count > 450 ? '#ef4444' : '#9ca3af';
    }

    toggleVoiceInput() {
        // Placeholder for voice input functionality
        this.addMessage('Voice input feature coming soon! 🎤', 'bot');
    }

    addMessage(message, sender, options = {}) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageWrapper = document.createElement('div');
        messageWrapper.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            sender === 'user' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'bg-white text-gray-800 shadow-sm border border-gray-200'
        }`;
        
        // Add timestamp
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageDiv.innerHTML = `
            <div class="text-sm">${message}</div>
            <div class="text-xs ${sender === 'user' ? 'text-blue-100' : 'text-gray-400'} mt-1">${timestamp}</div>
        `;
        
        messageWrapper.appendChild(messageDiv);
        messagesContainer.appendChild(messageWrapper);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store in conversation history
        this.conversationHistory.push({ 
            message, 
            sender, 
            timestamp: Date.now(),
            ...options 
        });
        
        // Update unread count if chat is closed
        if (!this.isOpen) {
            this.unreadCount++;
            this.updateUnreadBadge();
        }
        
        // Save conversation
        this.saveConversationHistory();
    }

    updateUnreadBadge() {
        const badge = document.getElementById('unread-badge');
        if (this.unreadCount > 0) {
            badge.textContent = this.unreadCount;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const sendBtn = document.getElementById('chatbot-send');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Disable send button temporarily
        sendBtn.disabled = true;
        
        this.addMessage(message, 'user');
        input.value = '';
        this.updateCharCount();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            const response = await this.getAIResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            this.showQuickSuggestions();
        } catch (error) {
            this.hideTypingIndicator();
            const errorMessage = this.langManager.currentLang === 'fr' 
                ? 'Je suis désolé, j\'ai des difficultés de connexion. Veuillez réessayer plus tard.'
                : 'I apologize, but I\'m having trouble connecting. Please try again later.';
            this.addMessage(errorMessage, 'bot');
            console.error('Chatbot error:', error);
        } finally {
            sendBtn.disabled = false;
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex justify-start mb-3';
        typingDiv.innerHTML = `
            <div class="bg-white text-gray-800 shadow-sm border border-gray-200 px-4 py-2 rounded-lg">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async getAIResponse(message) {
        // Enhanced AI response system with context awareness and itinerary planning
        const lang = this.langManager.currentLang;
        const lowerMessage = message.toLowerCase();
        
        // Weather integration
        if (lowerMessage.includes('weather') || lowerMessage.includes('météo') || lowerMessage.includes('temperature')) {
            return this.getWeatherResponse(lang);
        }
        
        // Booking assistance
        if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('ticket') || 
            lowerMessage.includes('réserver') || lowerMessage.includes('billet')) {
            return this.getBookingResponse(lang, lowerMessage);
        }
        
        // Itinerary and recommendation system
        if (this.sessionManager) {
            const itinerary = this.sessionManager.getItinerary();
            
            // Itinerary management
            if (lowerMessage.includes('itinerary') || lowerMessage.includes('plan') || lowerMessage.includes('itinéraire')) {
                if (itinerary.length > 0) {
                    return lang === 'fr' 
                        ? `Votre itinéraire actuel inclut : ${itinerary.join(', ')}. Souhaitez-vous ajouter d'autres attractions ou optimiser votre parcours ?`
                        : `Your current itinerary includes: ${itinerary.join(', ')}. Would you like to add more attractions or optimize your route?`;
                } else {
                    return lang === 'fr'
                        ? 'Je peux vous aider à créer un itinéraire personnalisé. Quels types d\'attractions vous intéressent ? (musées, monuments, shopping, gastronomie)'
                        : 'I can help you create a personalized itinerary. What types of attractions interest you? (museums, monuments, shopping, gastronomy)';
                }
            }
            
            // Attraction recommendations
            if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('recommand')) {
                const preferences = this.sessionManager.userPreferences;
                let recommendations = [];
                
                if (lowerMessage.includes('museum') || lowerMessage.includes('musée')) {
                    recommendations = lang === 'fr' 
                        ? ['Le Louvre', 'Musée d\'Orsay', 'Centre Pompidou', 'Musée Rodin']
                        : ['The Louvre', 'Musée d\'Orsay', 'Centre Pompidou', 'Musée Rodin'];
                } else if (lowerMessage.includes('monument') || lowerMessage.includes('tower') || lowerMessage.includes('tour')) {
                    recommendations = lang === 'fr'
                        ? ['Tour Eiffel', 'Arc de Triomphe', 'Sacré-Cœur', 'Notre-Dame']
                        : ['Eiffel Tower', 'Arc de Triomphe', 'Sacré-Cœur', 'Notre-Dame'];
                } else if (lowerMessage.includes('park') || lowerMessage.includes('garden') || lowerMessage.includes('jardin')) {
                    recommendations = lang === 'fr'
                        ? ['Jardin du Luxembourg', 'Jardin des Tuileries', 'Parc des Buttes-Chaumont', 'Bois de Boulogne']
                        : ['Luxembourg Gardens', 'Tuileries Garden', 'Buttes-Chaumont Park', 'Bois de Boulogne'];
                } else {
                    recommendations = lang === 'fr'
                        ? ['Tour Eiffel', 'Le Louvre', 'Champs-Élysées', 'Montmartre']
                        : ['Eiffel Tower', 'The Louvre', 'Champs-Élysées', 'Montmartre'];
                }
                
                return lang === 'fr'
                    ? `Je recommande : ${recommendations.join(', ')}. Souhaitez-vous que je les ajoute à votre itinéraire ?`
                    : `I recommend: ${recommendations.join(', ')}. Would you like me to add them to your itinerary?`;
            }
            
            // Add to itinerary functionality
            if (lowerMessage.includes('add') || lowerMessage.includes('ajouter')) {
                const attractions = ['eiffel', 'louvre', 'notre-dame', 'arc de triomphe', 'sacre-coeur', 'versailles', 'orsay', 'pompidou'];
                const foundAttractions = attractions.filter(attraction => lowerMessage.includes(attraction));
                
                if (foundAttractions.length > 0) {
                    foundAttractions.forEach(attraction => {
                        this.sessionManager.addToItinerary(attraction);
                    });
                    
                    return lang === 'fr'
                        ? `Parfait ! J'ai ajouté ${foundAttractions.join(', ')} à votre itinéraire. Vous avez maintenant ${itinerary.length + foundAttractions.length} attractions planifiées.`
                        : `Perfect! I've added ${foundAttractions.join(', ')} to your itinerary. You now have ${itinerary.length + foundAttractions.length} attractions planned.`;
                }
            }
        }
        
        // Enhanced responses with itinerary and recommendation context
        const responses = {
            en: {
                'best time to visit': 'The best time to visit Paris is during spring (March-May) or autumn (September-November) when the weather is pleasant and crowds are smaller. I can help you plan your itinerary based on your travel dates!',
                'eiffel tower': 'The Eiffel Tower is open daily from 9am to 11:45pm. Book tickets online in advance to avoid long queues. Would you like me to add this to your itinerary?',
                'museums': 'Paris has over 130 museums! The Louvre, Musée d\'Orsay, and Centre Pompidou are must-visits. Many offer free entry on the first Sunday of each month. I can create a museum itinerary for you!',
                'food': 'Don\'t miss trying croissants, macarons, French cheese, and wine. Visit local markets for authentic experiences. I can recommend food tours and restaurants!',
                'transport': 'The Paris Métro is the most efficient way to get around. Consider getting a Navigo pass for unlimited travel. I can help you plan the best routes for your itinerary!',
                'hello': 'Bonjour! Welcome to Paris! I\'m your personal guide and can help you plan the perfect itinerary. What would you like to explore first?',
                'help': 'I can help you with information about attractions, culture, food, transportation, and even create a personalized itinerary! What interests you most?',
                'weather': 'Paris has a temperate climate. Spring and autumn are ideal with mild temperatures. Summer can be warm (20-25°C), and winter is chilly (3-8°C). I can suggest indoor activities for rainy days!',
                'itinerary': 'I can create a personalized itinerary based on your interests, available time, and preferences. Just tell me what you\'d like to see and do!',
                'romantic': 'For romantic experiences, I recommend: Seine river cruise, sunset at Sacré-Cœur, dinner in Montmartre, and evening stroll along the Champs-Élysées.',
                'family': 'Great for families: Luxembourg Gardens with puppet shows, Cité des Sciences museum, boat rides on the Seine, and the Paris Zoo in Vincennes.',
                'budget': 'Budget-friendly tips: Many museums are free first Sundays, picnic in parks, use the Velib bike system, and enjoy free events at Hôtel de Ville.'
            },
            fr: {
                'best time to visit': 'Le meilleur moment pour visiter Paris est au printemps (mars-mai) ou en automne (septembre-novembre) avec un temps agréable et moins de monde. Je peux vous aider à planifier votre itinéraire selon vos dates de voyage !',
                'eiffel tower': 'La Tour Eiffel est ouverte tous les jours de 9h à 23h45. Réservez vos billets en ligne pour éviter les files d\'attente. Souhaitez-vous que je l\'ajoute à votre itinéraire ?',
                'museums': 'Paris compte plus de 130 musées ! Le Louvre, le Musée d\'Orsay et le Centre Pompidou sont incontournables. Je peux créer un itinéraire musée pour vous !',
                'food': 'Ne manquez pas les croissants, macarons, fromages français et vin. Visitez les marchés locaux pour une expérience authentique. Je peux recommander des visites gastronomiques !',
                'transport': 'Le métro parisien est le moyen le plus efficace de se déplacer. Pensez à la carte Navigo pour voyager en illimité. Je peux vous aider à planifier les meilleurs itinéraires !',
                'hello': 'Bonjour ! Bienvenue à Paris ! Je suis votre guide personnel et je peux vous aider à planifier l\'itinéraire parfait. Que souhaitez-vous explorer en premier ?',
                'help': 'Je peux vous aider avec des informations sur les attractions, la culture, la gastronomie, les transports, et même créer un itinéraire personnalisé ! Qu\'est-ce qui vous intéresse le plus ?',
                'weather': 'Paris a un climat tempéré. Le printemps et l\'automne sont idéaux avec des températures douces. L\'été peut être chaud (20-25°C), et l\'hiver est frais (3-8°C). Je peux suggérer des activités intérieures pour les jours de pluie !',
                'itinerary': 'Je peux créer un itinéraire personnalisé basé sur vos intérêts, votre temps disponible et vos préférences. Dites-moi ce que vous aimeriez voir et faire !',
                'romantic': 'Pour des expériences romantiques, je recommande : croisière sur la Seine, coucher de soleil au Sacré-Cœur, dîner à Montmartre, et promenade nocturne sur les Champs-Élysées.',
                'family': 'Parfait pour les familles : Jardin du Luxembourg avec spectacles de marionnettes, Cité des Sciences, promenades en bateau sur la Seine, et le Zoo de Paris à Vincennes.',
                'budget': 'Conseils économiques : nombreux musées gratuits les premiers dimanches, pique-nique dans les parcs, utiliser le système Vélib\', et profiter des événements gratuits à l\'Hôtel de Ville.'
            }
        };
        
        // Check predefined responses
        for (const [key, response] of Object.entries(responses[lang])) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Default response with helpful suggestions
        return lang === 'fr' 
            ? 'Je suis désolé, je ne comprends pas votre question. Pouvez-vous reformuler ou choisir l\'une des suggestions rapides ? Je peux vous aider avec les itinéraires, les recommandations, et bien plus !'
            : 'I\'m sorry, I don\'t understand your question. Could you please rephrase or choose one of the quick suggestions? I can help with itineraries, recommendations, and much more!';
    }

    saveConversationHistory() {
        if (this.sessionManager) {
            localStorage.setItem('paris-chat-history', JSON.stringify(this.conversationHistory));
        }
    }

    loadConversationHistory() {
        if (this.sessionManager) {
            const saved = localStorage.getItem('paris-chat-history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
            }
        }
    }

    clearConversation() {
        this.conversationHistory = [];
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = '';
        this.saveConversationHistory();
    }

    async getBookingResponse(lang, message) {
        const bookingInfo = {
            eiffel: {
                en: {
                    name: 'Eiffel Tower',
                    info: 'Book online at www.toureiffel.paris. Advance booking recommended to avoid queues. Prices: €16.60 for summit access, €10.40 for 2nd floor.',
                    tips: 'Best times: early morning (9am) or late evening (after 8pm) for shorter queues.'
                },
                fr: {
                    name: 'Tour Eiffel',
                    info: 'Réservez en ligne sur www.toureiffel.paris. Réservation recommandée pour éviter les files d\'attente. Prix : 16,60€ pour l\'accès au sommet, 10,40€ pour le 2ème étage.',
                    tips: 'Meilleurs horaires : tôt le matin (9h) ou tard le soir (après 20h) pour des files d\'attente plus courtes.'
                }
            },
            louvre: {
                en: {
                    name: 'Louvre Museum',
                    info: 'Book online at www.louvre.fr. €17 for permanent collections. Free first Saturday of each month from 6pm.',
                    tips: 'Consider the Paris Museum Pass for multiple attractions. Wednesday and Friday late openings are less crowded.'
                },
                fr: {
                    name: 'Musée du Louvre',
                    info: 'Réservez en ligne sur www.louvre.fr. 17€ pour les collections permanentes. Gratuit le premier samedi de chaque mois à partir de 18h.',
                    tips: 'Pensez au Paris Museum Pass pour plusieurs attractions. Les nocturnes du mercredi et vendredi sont moins fréquentées.'
                }
            },
            versailles: {
                en: {
                    name: 'Palace of Versailles',
                    info: 'Book at www.chateauversailles.fr. Passport ticket: €20 for palace, gardens, and Trianon.',
                    tips: 'Closed Mondays. Musical Fountain Shows on weekends (April-October) require supplement.'
                },
                fr: {
                    name: 'Château de Versailles',
                    info: 'Réservez sur www.chateauversailles.fr. Passeport : 20€ pour le château, les jardins et le Trianon.',
                    tips: 'Fermé le lundi. Les Grandes Eaux Musicales les week-ends (avril-octobre) nécessitent un supplément.'
                }
            }
        };
        
        // Check which attraction they're asking about
        for (const [key, info] of Object.entries(bookingInfo)) {
            if (message.includes(key)) {
                return `${info[lang].name}\n\n${info[lang].info}\n\n💡 ${info[lang].tips}`;
            }
        }
        
        // General booking information
        return lang === 'fr'
            ? 'Je peux vous aider avec les réservations ! Pour quelle attraction souhaitez-vous réserver ? (Tour Eiffel, Louvre, Versailles, etc.)\n\n💡 Conseil : Réservez en ligne à l\'avance pour éviter les files d\'attente et bénéficier des meilleurs tarifs.'
            : 'I can help with bookings! For which attraction would you like to make a reservation? (Eiffel Tower, Louvre, Versailles, etc.)\n\n💡 Tip: Book online in advance to avoid queues and get the best prices.';
    }

    async getWeatherResponse(lang) {
        // Simulated weather data for Paris
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // 1-12
        
        let weatherInfo;
        
        // Seasonal weather patterns for Paris
        if (month >= 3 && month <= 5) { // Spring
            weatherInfo = {
                temp: '15-20°C',
                condition: lang === 'fr' ? 'Printemps' : 'Spring',
                description: lang === 'fr' 
                    ? 'Températures douces, parfait pour les promenades. Apportez une veste légère.'
                    : 'Mild temperatures, perfect for walking. Bring a light jacket.',
                activities: lang === 'fr'
                    ? 'Idéal pour : Jardins, croisières sur la Seine, terrasses de café'
                    : 'Perfect for: Gardens, Seine cruises, café terraces'
            };
        } else if (month >= 6 && month <= 8) { // Summer
            weatherInfo = {
                temp: '20-25°C',
                condition: lang === 'fr' ? 'Été' : 'Summer',
                description: lang === 'fr'
                    ? 'Chaud et ensoleillé. Parfait pour les activités en plein air.'
                    : 'Warm and sunny. Perfect for outdoor activities.',
                activities: lang === 'fr'
                    ? 'Idéal pour : Pique-niques, plages de Paris, festivals en plein air'
                    : 'Perfect for: Picnics, Paris beaches, outdoor festivals'
            };
        } else if (month >= 9 && month <= 11) { // Autumn
            weatherInfo = {
                temp: '12-18°C',
                condition: lang === 'fr' ? 'Automne' : 'Autumn',
                description: lang === 'fr'
                    ? 'Frais et agréable. Magnifiques couleurs d\'automne dans les parcs.'
                    : 'Cool and pleasant. Beautiful autumn colors in the parks.',
                activities: lang === 'fr'
                    ? 'Idéal pour : Musées, galeries, cafés chauds'
                    : 'Perfect for: Museums, galleries, cozy cafés'
            };
        } else { // Winter
            weatherInfo = {
                temp: '3-8°C',
                condition: lang === 'fr' ? 'Hiver' : 'Winter',
                description: lang === 'fr'
                    ? 'Frais avec possibilité de pluie. Apportez un parapluie et des vêtements chauds.'
                    : 'Cool with possible rain. Bring an umbrella and warm clothes.',
                activities: lang === 'fr'
                    ? 'Idéal pour : Musées, marchés de Noël, chocolat chaud'
                    : 'Perfect for: Museums, Christmas markets, hot chocolate'
            };
        }
        
        return lang === 'fr'
            ? `Météo actuelle à Paris : ${weatherInfo.temp}, ${weatherInfo.condition}. ${weatherInfo.description} ${weatherInfo.activities}`
            : `Current weather in Paris: ${weatherInfo.temp}, ${weatherInfo.condition}. ${weatherInfo.description} ${weatherInfo.activities}`;
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
        if (!this.itinerary.includes(item)) {
            this.itinerary.push({
                id: item,
                addedAt: Date.now(),
                sessionId: this.sessionId
            });
            this.saveItinerary();
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
        
        // Initialize enhanced chatbot
        // IMPORTANT: Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
        this.chatbot = new EnhancedParisChatbot('YOUR_GEMINI_API_KEY', this.langManager, this.sessionManager);
        
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
            // Restore itinerary items if needed
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