// UI Manager for Paris Tourism Website
// Handles responsive layout and organizes all UI elements properly

class UIManager {
    constructor() {
        this.screenSize = this.detectScreenSize();
        this.uiElements = new Map();
        this.init();
    }

    init() {
        this.createResponsiveLayout();
        this.organizeUIElements();
        this.setupResponsiveHandlers();
        this.initializeAccessibility();
    }

    detectScreenSize() {
        const width = window.innerWidth;
        if (width < 480) return 'xs';      // Very small (mobile)
        if (width < 768) return 'sm';      // Small (mobile)
        if (width < 1024) return 'md';     // Medium (tablet)
        if (width < 1440) return 'lg';     // Large (desktop)
        return 'xl';                        // Very large (large desktop)
    }

    createResponsiveLayout() {
        // Create main UI container
        const uiContainer = document.createElement('div');
        uiContainer.id = 'ui-container';
        uiContainer.className = 'fixed inset-0 pointer-events-none z-50';
        document.body.appendChild(uiContainer);

        // Create organized UI sections
        this.createTopBar();
        this.createSidePanel();
        this.createBottomBar();
        this.createFloatingElements();
    }

    createTopBar() {
        const topBar = document.createElement('div');
        topBar.id = 'ui-top-bar';
        topBar.className = 'absolute top-0 left-0 right-0 h-16 bg-white shadow-lg pointer-events-auto';
        topBar.innerHTML = `
            <div class="h-full px-4 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="text-xl font-bold text-blue-600">ParisTourism</div>
                    <div class="hidden md:flex items-center space-x-2">
                        <button id="top-bar-dashboard" class="p-2 text-gray-600 hover:text-blue-600 transition-colors" title="Dashboard">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </button>
                        <button id="top-bar-vr" class="p-2 text-gray-600 hover:text-purple-600 transition-colors" title="Virtual Tours">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-9a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </button>
                        <button id="top-bar-ar" class="p-2 text-gray-600 hover:text-orange-600 transition-colors" title="AR Navigation">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="flex items-center space-x-2">
                    <button id="top-bar-booking" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium hidden md:block" title="Book Experiences">
                        Book Now
                    </button>
                    <button id="top-bar-notifications" class="p-2 text-gray-600 hover:text-red-600 transition-colors relative" title="Notifications">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span id="notification-badge" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center hidden">0</span>
                    </button>
                    <button id="top-bar-menu" class="p-2 text-gray-600 hover:text-blue-600 transition-colors md:hidden" title="Menu">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.getElementById('ui-container').appendChild(topBar);
        this.uiElements.set('topBar', topBar);
    }

    createSidePanel() {
        const sidePanel = document.createElement('div');
        sidePanel.id = 'ui-side-panel';
        sidePanel.className = 'absolute top-16 left-0 w-80 h-full bg-white shadow-lg pointer-events-auto transform -translate-x-full transition-transform duration-300 md:translate-x-0 md:relative md:top-0 md:h-auto md:w-64';
        sidePanel.innerHTML = `
            <div class="h-full flex flex-col">
                <!-- Side Panel Header -->
                <div class="p-4 border-b">
                    <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-gray-800">Quick Access</h3>
                        <button id="close-side-panel" class="md:hidden text-gray-500 hover:text-gray-700">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Side Panel Content -->
                <div class="flex-1 overflow-y-auto p-4">
                    <!-- Weather Widget -->
                    <div class="weather-widget bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-4 text-white mb-4">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm opacity-90">Paris Weather</span>
                            <span class="text-2xl">🌤️</span>
                        </div>
                        <div class="text-2xl font-bold mb-1">22°C</div>
                        <div class="text-sm opacity-90">Partly Cloudy</div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="quick-actions mb-6">
                        <h4 class="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                        <div class="space-y-2">
                            <button id="side-booking" class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                                <span class="text-xl">🎫</span>
                                <span class="font-medium">Book Experiences</span>
                            </button>
                            <button id="side-itinerary" class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                                <span class="text-xl">📋</span>
                                <span class="font-medium">My Itinerary</span>
                            </button>
                            <button id="side-photos" class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                                <span class="text-xl">📸</span>
                                <span class="font-medium">Photo Gallery</span>
                            </button>
                            <button id="side-achievements" class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                                <span class="text-xl">🏆</span>
                                <span class="font-medium">Achievements</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Recent Activity -->
                    <div class="recent-activity">
                        <h4 class="font-semibold text-gray-800 mb-3">Recent Activity</h4>
                        <div class="space-y-3">
                            <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <span class="text-green-600 text-sm">✓</span>
                                <div class="text-sm">
                                    <div class="font-medium">Eiffel Tower booked</div>
                                    <div class="text-gray-600 text-xs">2 hours ago</div>
                                </div>
                            </div>
                            <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <span class="text-blue-600 text-sm">📍</span>
                                <div class="text-sm">
                                    <div class="font-medium">Added Louvre to itinerary</div>
                                    <div class="text-gray-600 text-xs">1 day ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Side Panel Footer -->
                <div class="p-4 border-t">
                    <div class="flex items-center justify-between text-sm text-gray-600">
                        <span>Paris Tourism</span>
                        <span>v2.0</span>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('ui-container').appendChild(sidePanel);
        this.uiElements.set('sidePanel', sidePanel);
    }

    createBottomBar() {
        const bottomBar = document.createElement('div');
        bottomBar.id = 'ui-bottom-bar';
        bottomBar.className = 'absolute bottom-0 left-0 right-0 h-16 bg-white border-t pointer-events-auto md:hidden';
        bottomBar.innerHTML = `
            <div class="h-full px-4 flex items-center justify-around">
                <button id="bottom-home" class="flex flex-col items-center space-y-1 text-blue-600" title="Home">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span class="text-xs">Home</span>
                </button>
                
                <button id="bottom-search" class="flex flex-col items-center space-y-1 text-gray-600" title="Search">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span class="text-xs">Search</span>
                </button>
                
                <button id="bottom-booking" class="flex flex-col items-center space-y-1 text-gray-600" title="Book">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                    </svg>
                    <span class="text-xs">Book</span>
                </button>
                
                <button id="bottom-chat" class="flex flex-col items-center space-y-1 text-gray-600" title="Chat">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span class="text-xs">Chat</span>
                </button>
                
                <button id="bottom-profile" class="flex flex-col items-center space-y-1 text-gray-600" title="Profile">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span class="text-xs">Profile</span>
                </button>
            </div>
        `;

        document.getElementById('ui-container').appendChild(bottomBar);
        this.uiElements.set('bottomBar', bottomBar);
    }

    createFloatingElements() {
        // Chatbot - Keep as floating but positioned better
        const chatbotContainer = document.getElementById('chatbot-container');
        if (chatbotContainer) {
            chatbotContainer.className = 'fixed bottom-20 right-4 z-40 md:bottom-6';
        }

        // Dashboard toggle - Add to top bar instead of floating
        const dashboardToggle = document.createElement('button');
        dashboardToggle.id = 'dashboard-floating-toggle';
        dashboardToggle.className = 'fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-700 transition-colors z-30 hidden md:block';
        dashboardToggle.innerHTML = '⚡';
        dashboardToggle.title = 'Quick Dashboard';
        document.body.appendChild(dashboardToggle);

        // VR/AR buttons - Move to organized sections
        this.organizeFeatureButtons();
    }

    organizeFeatureButtons() {
        // Move VR button to top bar
        const vrBtn = document.getElementById('vr-tour-btn');
        if (vrBtn) {
            vrBtn.remove();
        }

        // Move AR button to top bar  
        const arBtn = document.getElementById('ar-nav-btn');
        if (arBtn) {
            arBtn.remove();
        }

        // Move 360 photo button to organized location
        const photo360Btn = document.getElementById('photo-360-btn');
        if (photo360Btn) {
            photo360Btn.remove();
        }
    }

    setupResponsiveHandlers() {
        // Handle window resize
        window.addEventListener('resize', () => {
            const newScreenSize = this.detectScreenSize();
            if (newScreenSize !== this.screenSize) {
                this.screenSize = newScreenSize;
                this.updateLayoutForScreenSize();
            }
        });

        // Handle mobile menu toggle
        document.getElementById('top-bar-menu')?.addEventListener('click', () => {
            this.toggleSidePanel();
        });

        document.getElementById('close-side-panel')?.addEventListener('click', () => {
            this.hideSidePanel();
        });

        // Handle bottom navigation
        this.setupBottomNavigation();

        // Handle feature buttons
        this.setupFeatureButtons();
    }

    setupBottomNavigation() {
        document.getElementById('bottom-home')?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        document.getElementById('bottom-search')?.addEventListener('click', () => {
            this.showSearchInterface();
        });

        document.getElementById('bottom-booking')?.addEventListener('click', () => {
            if (window.bookingSystem) {
                window.bookingSystem.showBookingInterface();
            }
        });

        document.getElementById('bottom-chat')?.addEventListener('click', () => {
            if (window.parisApp?.chatbot) {
                window.parisApp.chatbot.toggleChatbot();
            }
        });

        document.getElementById('bottom-profile')?.addEventListener('click', () => {
            this.showProfileInterface();
        });
    }

    setupFeatureButtons() {
        // Top bar buttons
        document.getElementById('top-bar-dashboard')?.addEventListener('click', () => {
            if (window.advancedFeatures) {
                window.advancedFeatures.toggleDashboard();
            }
        });

        document.getElementById('top-bar-vr')?.addEventListener('click', () => {
            if (window.vrArExperience) {
                window.vrArExperience.showVRTours();
            }
        });

        document.getElementById('top-bar-ar')?.addEventListener('click', () => {
            if (window.vrArExperience) {
                window.vrArExperience.showARInterface();
            }
        });

        document.getElementById('top-bar-booking')?.addEventListener('click', () => {
            if (window.bookingSystem) {
                window.bookingSystem.showBookingInterface();
            }
        });

        // Dashboard floating toggle
        document.getElementById('dashboard-floating-toggle')?.addEventListener('click', () => {
            if (window.advancedFeatures) {
                window.advancedFeatures.toggleDashboard();
            }
        });

        // Side panel buttons
        document.getElementById('side-booking')?.addEventListener('click', () => {
            if (window.bookingSystem) {
                window.bookingSystem.showBookingInterface();
            }
        });

        document.getElementById('side-itinerary')?.addEventListener('click', () => {
            this.showItineraryInterface();
        });

        document.getElementById('side-photos')?.addEventListener('click', () => {
            if (window.vrArExperience) {
                window.vrArExperience.show360PhotoGallery();
            }
        });

        document.getElementById('side-achievements')?.addEventListener('click', () => {
            this.showAchievementsInterface();
        });
    }

    updateLayoutForScreenSize() {
        const topBar = this.uiElements.get('topBar');
        const sidePanel = this.uiElements.get('sidePanel');
        const bottomBar = this.uiElements.get('bottomBar');

        switch (this.screenSize) {
            case 'xs':
            case 'sm':
                // Mobile layout - show bottom bar, hide side panel
                sidePanel?.classList.add('-translate-x-full');
                bottomBar?.classList.remove('hidden');
                break;
            case 'md':
                // Tablet layout - side panel visible, bottom bar hidden
                sidePanel?.classList.remove('-translate-x-full');
                bottomBar?.classList.add('hidden');
                break;
            case 'lg':
            case 'xl':
                // Desktop layout - full side panel, no bottom bar
                sidePanel?.classList.remove('-translate-x-full');
                bottomBar?.classList.add('hidden');
                break;
        }
    }

    toggleSidePanel() {
        const sidePanel = this.uiElements.get('sidePanel');
        sidePanel?.classList.toggle('-translate-x-full');
    }

    hideSidePanel() {
        const sidePanel = this.uiElements.get('sidePanel');
        sidePanel?.classList.add('-translate-x-full');
    }

    showSearchInterface() {
        // Create search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.id = 'search-overlay';
        searchOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        searchOverlay.innerHTML = `
            <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full">
                <div class="p-6">
                    <div class="flex items-center space-x-4 mb-4">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input type="text" placeholder="Search attractions, hotels, restaurants..." class="flex-1 p-3 border-0 focus:outline-none text-lg">
                        <button id="close-search" class="text-gray-500 hover:text-gray-700">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="space-y-2">
                        <div class="text-sm text-gray-600">Popular searches:</div>
                        <div class="flex flex-wrap gap-2">
                            <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">Eiffel Tower</button>
                            <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">Louvre Museum</button>
                            <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">Seine Cruise</button>
                            <button class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">French Restaurants</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(searchOverlay);

        // Focus on input
        searchOverlay.querySelector('input').focus();

        // Close handlers
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.remove();
            }
        });

        searchOverlay.querySelector('#close-search').addEventListener('click', () => {
            searchOverlay.remove();
        });
    }

    showProfileInterface() {
        // Create profile interface
        const profileInterface = document.createElement('div');
        profileInterface.id = 'profile-interface';
        profileInterface.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        profileInterface.innerHTML = `
            <div class="bg-white rounded-lg shadow-2xl max-w-md w-full">
                <div class="p-6 border-b">
                    <h2 class="text-2xl font-bold text-gray-800">Profile</h2>
                </div>
                <div class="p-6">
                    <div class="text-center mb-6">
                        <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-3xl">👤</span>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800">Welcome to Paris Tourism</h3>
                        <p class="text-gray-600">Manage your preferences and bookings</p>
                    </div>
                    
                    <div class="space-y-4">
                        <button class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                            <span class="text-xl">🎫</span>
                            <span class="font-medium">My Bookings</span>
                        </button>
                        <button class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                            <span class="text-xl">⚙️</span>
                            <span class="font-medium">Settings</span>
                        </button>
                        <button class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                            <span class="text-xl">❓</span>
                            <span class="font-medium">Help & Support</span>
                        </button>
                        <button class="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                            <span class="text-xl">🔒</span>
                            <span class="font-medium">Privacy & Security</span>
                        </button>
                    </div>
                </div>
                <div class="p-6 border-t">
                    <button class="close-profile w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(profileInterface);

        profileInterface.querySelector('.close-profile').addEventListener('click', () => {
            profileInterface.remove();
        });

        profileInterface.addEventListener('click', (e) => {
            if (e.target === profileInterface) {
                profileInterface.remove();
            }
        });
    }

    showItineraryInterface() {
        if (window.advancedFeatures?.sessionManager) {
            const itinerary = window.advancedFeatures.sessionManager.getItinerary();
            // Show itinerary interface
            console.log('Showing itinerary:', itinerary);
        }
    }

    showAchievementsInterface() {
        if (window.advancedFeatures?.gamification) {
            const achievements = window.advancedFeatures.gamification.getUserAchievements();
            // Show achievements interface
            console.log('Showing achievements:', achievements);
        }
    }

    initializeAccessibility() {
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.toggleSidePanel();
                        break;
                    case '2':
                        e.preventDefault();
                        if (window.bookingSystem) {
                            window.bookingSystem.showBookingInterface();
                        }
                        break;
                    case '3':
                        e.preventDefault();
                        if (window.parisApp?.chatbot) {
                            window.parisApp.chatbot.toggleChatbot();
                        }
                        break;
                    case '4':
                        e.preventDefault();
                        if (window.advancedFeatures) {
                            window.advancedFeatures.toggleDashboard();
                        }
                        break;
                }
            }
        });

        // Add screen reader support
        this.addARIALabels();
    }

    addARIALabels() {
        // Add ARIA labels for better accessibility
        const elements = {
            'top-bar-menu': 'Toggle navigation menu',
            'top-bar-dashboard': 'Open personal dashboard',
            'top-bar-vr': 'Start virtual reality tour',
            'top-bar-ar': 'Start augmented reality navigation',
            'top-bar-booking': 'Book Paris experiences',
            'bottom-home': 'Go to home page',
            'bottom-search': 'Search attractions and experiences',
            'bottom-booking': 'Book experiences',
            'bottom-chat': 'Open chat with Paris assistant',
            'bottom-profile': 'View profile and settings'
        };

        Object.entries(elements).forEach(([id, label]) => {
            const element = document.getElementById(id);
            if (element) {
                element.setAttribute('aria-label', label);
            }
        });
    }

    // Public API for other components
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
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

    updateNotificationBadge(count) {
        const badge = document.getElementById('notification-badge');
        if (badge) {
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }
}

// Initialize UI Manager
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.uiManager = new UIManager();
        console.log('🎨 Responsive UI Manager initialized');
    }, 500);
});