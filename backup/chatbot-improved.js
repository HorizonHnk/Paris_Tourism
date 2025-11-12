// Enhanced Paris Tourism Chatbot with Advanced AI Integration
class EnhancedParisChatbot {
    constructor(geminiKey, languageManager, sessionManager) {
        this.geminiKey = geminiKey;
        this.langManager = languageManager;
        this.sessionManager = sessionManager;
        this.isOpen = false;
        this.conversationHistory = [];
        this.userContext = {};
        this.suggestions = this.initializeSuggestions();
        this.init();
    }

    init() {
        this.createEnhancedChatbotUI();
        this.bindEvents();
        this.loadConversationHistory();
    }

    initializeSuggestions() {
        return {
            en: [
                "Best time to visit Paris?",
                "Top attractions in Paris",
                "How to get around Paris?",
                "Best restaurants in Paris",
                "Paris travel budget",
                "Weather in Paris",
                "Shopping in Paris",
                "Paris nightlife",
                "Family activities in Paris",
                "Romantic spots in Paris",
                "Free things to do in Paris",
                "Paris museums and art",
                "Day trips from Paris",
                "Paris safety tips",
                "French phrases for tourists"
            ],
            fr: [
                "Meilleur moment pour visiter Paris ?",
                "Principales attractions à Paris",
                "Comment se déplacer à Paris ?",
                "Meilleurs restaurants à Paris",
                "Budget voyage Paris",
                "Météo à Paris",
                "Shopping à Paris",
                "Vie nocturne parisienne",
                "Activités familiales à Paris",
                "Endroits romantiques à Paris",
                "Activités gratuites à Paris",
                "Musées et art à Paris",
                "Excursions depuis Paris",
                "Conseils de sécurité à Paris",
                "Phrases françaises pour touristes"
            ]
        };
    }

    createEnhancedChatbotUI() {
        const chatbotHTML = `
            <div id="chatbot-container" class="fixed bottom-6 right-6 z-50">
                <!-- Chat Button -->
                <div id="chatbot-button" class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center">
                    <div class="relative">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        <div id="chatbot-notification" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full hidden animate-pulse"></div>
                    </div>
                </div>
                
                <!-- Chat Window -->
                <div id="chatbot-window" class="hidden bg-white rounded-xl shadow-2xl w-96 h-[500px] flex flex-col mb-4 border border-gray-200">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl flex justify-between items-center">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <span class="text-sm font-bold">🗼</span>
                            </div>
                            <div>
                                <h3 class="font-semibold" data-translate="chatbotTitle">Paris Assistant</h3>
                                <p class="text-xs text-blue-100">Always here to help</p>
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
                    
                    <!-- Quick Suggestions -->
                    <div id="quick-suggestions" class="p-3 bg-gray-50 border-b border-gray-200">
                        <p class="text-xs text-gray-600 mb-2">Quick questions:</p>
                        <div id="suggestion-buttons" class="flex flex-wrap gap-2">
                            <!-- Suggestion buttons will be populated here -->
                        </div>
                    </div>
                    
                    <!-- Messages Container -->
                    <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto space-y-4">
                        <!-- Welcome message -->
                        <div class="message bot-message">
                            <div class="flex items-start space-x-3">
                                <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span class="text-white text-xs">🗼</span>
                                </div>
                                <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                                    <p class="text-sm text-gray-800">Bonjour! I'm your Paris guide. How can I help you plan your perfect Parisian adventure?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Typing Indicator -->
                    <div id="typing-indicator" class="hidden px-4 py-2">
                        <div class="flex items-center space-x-2 text-sm text-gray-500">
                            <div class="flex space-x-1">
                                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            </div>
                            <span>Paris Assistant is typing...</span>
                        </div>
                    </div>
                    
                    <!-- Input Area -->
                    <div class="p-4 border-t border-gray-200">
                        <div class="flex items-end space-x-3">
                            <textarea 
                                id="chatbot-input" 
                                placeholder="Ask me about Paris..."
                                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                rows="1"
                                maxlength="500"
                            ></textarea>
                            <button id="chatbot-send" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <span id="character-count" class="text-xs text-gray-500">0/500</span>
                            <button id="chatbot-voice" class="text-gray-400 hover:text-blue-600 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Minimized Chat Indicator -->
                <div id="chatbot-minimized" class="hidden bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg cursor-pointer">
                    <div class="flex items-center space-x-2">
                        <span>🗼</span>
                        <span class="text-sm">Chat with Paris Assistant</span>
                        <span id="unread-count" class="bg-red-500 text-white text-xs rounded-full px-2 py-1 hidden">0</span>
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
        const minimized = document.getElementById('chatbot-minimized');
        const voiceBtn = document.getElementById('chatbot-voice');

        button.addEventListener('click', () => this.toggleChatbot());
        closeBtn.addEventListener('click', () => this.closeChatbot());
        minimizeBtn.addEventListener('click', () => this.minimizeChatbot());
        minimized.addEventListener('click', () => this.restoreChatbot());
        sendBtn.addEventListener('click', () => this.sendMessage());
        voiceBtn.addEventListener('click', () => this.toggleVoiceInput());

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        input.addEventListener('input', () => {
            this.updateCharacterCount();
            this.autoResizeInput();
        });

        // Populate quick suggestions
        this.populateQuickSuggestions();

        // Handle suggestion clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-btn')) {
                const suggestion = e.target.textContent;
                input.value = suggestion;
                this.sendMessage();
            }
        });
    }

    populateQuickSuggestions() {
        const suggestionsContainer = document.getElementById('suggestion-buttons');
        const currentLang = this.langManager.currentLang;
        const suggestions = this.suggestions[currentLang].slice(0, 6);

        suggestionsContainer.innerHTML = suggestions.map(suggestion => 
            `<button class="suggestion-btn bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">
                ${suggestion}
            </button>`
        ).join('');
    }

    updateCharacterCount() {
        const input = document.getElementById('chatbot-input');
        const counter = document.getElementById('character-count');
        const length = input.value.length;
        counter.textContent = `${length}/500`;
        counter.className = length > 450 ? 'text-xs text-red-500' : 'text-xs text-gray-500';
    }

    autoResizeInput() {
        const input = document.getElementById('chatbot-input');
        input.style.height = 'auto';
        const newHeight = Math.min(input.scrollHeight, 120);
        input.style.height = newHeight + 'px';
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        const minimized = document.getElementById('chatbot-minimized');
        
        if (!this.isOpen && minimized.classList.contains('hidden')) {
            window.classList.remove('hidden');
            button.style.display = 'none';
            this.isOpen = true;
            this.hideNotification();
            
            // Focus input
            setTimeout(() => {
                document.getElementById('chatbot-input').focus();
            }, 100);
        }
    }

    minimizeChatbot() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        const minimized = document.getElementById('chatbot-minimized');
        
        window.classList.add('hidden');
        minimized.classList.remove('hidden');
        button.style.display = 'block';
        this.isOpen = false;
    }

    restoreChatbot() {
        const window = document.getElementById('chatbot-window');
        const minimized = document.getElementById('chatbot-minimized');
        const button = document.getElementById('chatbot-button');
        
        window.classList.remove('hidden');
        minimized.classList.add('hidden');
        button.style.display = 'none';
        this.isOpen = true;
        this.hideNotification();
        
        // Focus input
        setTimeout(() => {
            document.getElementById('chatbot-input').focus();
        }, 100);
    }

    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        const minimized = document.getElementById('chatbot-minimized');
        
        window.classList.add('hidden');
        minimized.classList.add('hidden');
        button.style.display = 'block';
        this.isOpen = false;
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        this.updateCharacterCount();
        this.autoResizeInput();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            
            // Save conversation
            this.saveConversation(message, response);
            
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage("I apologize, but I'm having trouble connecting. Please try again later.", 'bot');
            console.error('Chatbot error:', error);
        }
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="flex items-end justify-end space-x-3">
                    <div class="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                        <p class="text-sm">${this.escapeHtml(message)}</p>
                        <span class="text-xs text-blue-200 opacity-75">${timestamp}</span>
                    </div>
                    <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-gray-600 text-xs">👤</span>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs">🗼</span>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p class="text-sm text-gray-800">${this.escapeHtml(message)}</p>
                        <span class="text-xs text-gray-500 opacity-75">${timestamp}</span>
                    </div>
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.conversationHistory.push({ message, sender, timestamp });
        
        // Keep only last 50 messages
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        indicator.classList.remove('hidden');
        
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        indicator.classList.add('hidden');
    }

    async getAIResponse(message) {
        // For demo purposes, using enhanced predefined responses
        // In production, this would connect to Gemini API or similar
        
        const lang = this.langManager.currentLang;
        const lowerMessage = message.toLowerCase();
        
        // Enhanced response system with context awareness
        const responses = this.getEnhancedResponses(lang);
        
        // Check for specific keywords
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Context-aware responses based on user session
        if (this.sessionManager) {
            const itinerary = this.sessionManager.getItinerary();
            if (itinerary.length > 0 && lowerMessage.includes('itinerary')) {
                return lang === 'fr' 
                    ? `Votre itinéraire contient ${itinerary.length} attractions. Je peux vous aider à planifier la meilleure route pour les visiter.`
                    : `Your itinerary contains ${itinerary.length} attractions. I can help you plan the best route to visit them.`;
            }
        }
        
        // Default contextual response
        const defaultResponses = {
            en: [
                "That's a great question! Let me help you with that.",
                "I'd be happy to assist you with your Paris travel plans.",
                "Interesting! Here's what I know about that...",
                "Let me provide you with some helpful information.",
                "I can definitely help you with that question."
            ],
            fr: [
                "C'est une excellente question ! Permettez-moi de vous aider.",
                "Je serais ravi de vous aider avec vos projets de voyage à Paris.",
                "Intéressant ! Voici ce que je sais à ce sujet...",
                "Permettez-moi de vous fournir des informations utiles.",
                "Je peux certainement vous aider avec cette question."
            ]
        };
        
        const randomIndex = Math.floor(Math.random() * defaultResponses[lang].length);
        return defaultResponses[lang][randomIndex];
    }

    getEnhancedResponses(lang) {
        if (lang === 'fr') {
            return {
                'meilleur moment': 'Le meilleur moment pour visiter Paris est au printemps (mars-mai) ou en automne (septembre-novembre) avec un temps agréable et moins de monde.',
                'attractions': 'Les principales attractions incluent la Tour Eiffel, le Louvre, Notre-Dame, l\'Arc de Triomphe et le Sacré-Cœur. Chacune offre une expérience unique !',
                'se déplacer': 'Le métro parisien est le moyen le plus efficace de se déplacer. Pensez à la carte Navigo pour voyager en illimité. Le vélo et la marche sont aussi excellents !',
                'restaurants': 'Paris offre une cuisine exceptionnelle ! Essayez les bistros traditionnels, les brasseries et les marchés locaux. Ne manquez pas les croissants et les macarons !',
                'budget': 'Un budget moyen pour Paris est d\'environ 150-200€ par jour incluant hébergement, repas et attractions. Les musées gratuits le premier dimanche du mois !',
                'météo': 'Paris a un climat tempéré. Printemps/automne : 10-20°C, Été : 20-30°C, Hiver : 0-10°C. Préparez-vous à de la pluie toute l\'année !',
                'shopping': 'Les Champs-Élysées pour le luxe, le Marais pour la mode vintage, Saint-Germain pour l\'artisanat. Les grands magasins comme Galeries Lafayette valent le détour !',
                'vie nocturne': 'Paris s\'éveille la nuit ! Essayez les bars à vin, les clubs sur les Champs-Élysées, les spectacles de cabaret à Montmartre ou une croisière sur la Seine.',
                'famille': 'Paris est idéal pour les familles ! Visitez Disneyland Paris, le Jardin du Luxembourg, le zoo, les musées interactifs et profitez des nombreux parcs.',
                'romantique': 'Paris, la ville de l\'amour ! Promenez-vous sur les quais de la Seine, montez à la Tour Eiffel au coucher du soleil, dînez dans un bistro intimiste.',
                'gratuit': 'Beaucoup d\'activités gratuites : parcs, musées gratuits certains jours, balades dans les quartiers historiques, marchés et observation de la Tour Eiffel !',
                'musées': 'Le Louvre est incontournable, mais essayez aussi le Musée d\'Orsay, le Centre Pompidou, et les petits musées comme le Musée Rodin.',
                'excursions': 'Versailles est incontournable ! Chartres, Reims, Fontainebleau ou Giverny offrent d\'excellentes escapades depuis Paris.',
                'sécurité': 'Paris est généralement sûr. Méfiez-vous des pickpockets dans les transports et attractions. Gardez vos affaires près de vous et évitez les zones mal éclairées la nuit.',
                'phrases françaises': 'Bonjour (Hello), Merci (Thank you), S\'il vous plaît (Please), Excusez-moi (Excuse me), Où est...? (Where is...?), Combien ça coûte ? (How much does it cost?)'
            };
        } else {
            return {
                'best time': 'The best time to visit Paris is during spring (March-May) or autumn (September-November) when the weather is pleasant and crowds are smaller.',
                'attractions': 'Top attractions include the Eiffel Tower, Louvre Museum, Notre Dame Cathedral, Arc de Triomphe, and Sacré-Cœur. Each offers a unique experience!',
                'get around': 'The Paris Métro is the most efficient way to get around. Consider a Navigo pass for unlimited travel. Walking and biking are also excellent options!',
                'restaurants': 'Paris offers exceptional cuisine! Try traditional bistros, brasseries, and local markets. Don\'t miss the croissants and macarons!',
                'budget': 'A typical Paris budget is around €150-200 per day including accommodation, meals, and attractions. Many museums are free on the first Sunday of the month!',
                'weather': 'Paris has a temperate climate. Spring/Autumn: 50-68°F, Summer: 68-86°F, Winter: 32-50°F. Be prepared for rain year-round!',
                'shopping': 'Champs-Élysées for luxury, Le Marais for vintage fashion, Saint-Germain for crafts. Department stores like Galeries Lafayette are worth visiting!',
                'nightlife': 'Paris comes alive at night! Try wine bars, clubs on Champs-Élysées, cabaret shows in Montmartre, or a Seine river cruise.',
                'family': 'Paris is great for families! Visit Disneyland Paris, Luxembourg Gardens, the zoo, interactive museums, and enjoy the many parks.',
                'romantic': 'Paris, the city of love! Stroll along the Seine, visit the Eiffel Tower at sunset, dine in an intimate bistro.',
                'free': 'Many free activities: parks, free museum days, historic neighborhood walks, markets, and Eiffel Tower viewing!',
                'museums': 'The Louvre is a must, but also try Musée d\'Orsay, Centre Pompidou, and smaller museums like Musée Rodin.',
                'day trips': 'Versailles is essential! Chartres, Reims, Fontainebleau, or Giverny offer excellent escapes from Paris.',
                'safety': 'Paris is generally safe. Watch for pickpockets on transport and at attractions. Keep belongings close and avoid poorly lit areas at night.',
                'french phrases': 'Bonjour (Hello), Merci (Thank you), S\'il vous plaît (Please), Excusez-moi (Excuse me), Où est...? (Where is...?), Combien ça coûte ? (How much does it cost?)'
            };
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    toggleVoiceInput() {
        // Voice input functionality (placeholder for future implementation)
        this.showNotification('Voice input feature coming soon!', 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('chatbot-notification');
        notification.classList.remove('hidden');
        
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }

    hideNotification() {
        const notification = document.getElementById('chatbot-notification');
        notification.classList.add('hidden');
    }

    saveConversation(userMessage, botResponse) {
        if (this.sessionManager) {
            const conversation = {
                userMessage,
                botResponse,
                timestamp: Date.now(),
                language: this.langManager.currentLang
            };
            
            // Save to session storage
            let conversations = JSON.parse(localStorage.getItem('paris-chat-conversations') || '[]');
            conversations.push(conversation);
            
            // Keep only last 20 conversations
            if (conversations.length > 20) {
                conversations = conversations.slice(-20);
            }
            
            localStorage.setItem('paris-chat-conversations', JSON.stringify(conversations));
        }
    }

    loadConversationHistory() {
        const conversations = JSON.parse(localStorage.getItem('paris-chat-conversations') || '[]');
        if (conversations.length > 0) {
            console.log(`Loaded ${conversations.length} previous conversations`);
        }
    }

    // Method to clear conversation history
    clearConversationHistory() {
        localStorage.removeItem('paris-chat-conversations');
        this.conversationHistory = [];
        
        // Clear UI
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span class="text-white text-xs">🗼</span>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p class="text-sm text-gray-800">Bonjour! I'm your Paris guide. How can I help you plan your perfect Parisian adventure?</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Method to export conversation data
    exportConversations() {
        return {
            conversations: JSON.parse(localStorage.getItem('paris-chat-conversations') || '[]'),
            currentSession: this.conversationHistory,
            userContext: this.userContext
        };
    }
}

// Initialize the enhanced chatbot
if (typeof window !== 'undefined') {
    window.EnhancedParisChatbot = EnhancedParisChatbot;
}