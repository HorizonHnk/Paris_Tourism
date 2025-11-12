// Advanced Booking System for Paris Tourism Website
// Integrated booking engine with payment processing and package deals

class BookingSystem {
    constructor() {
        this.bookings = this.loadBookings();
        this.cart = this.loadCart();
        this.user = this.loadUser();
        this.providers = this.initializeProviders();
        
        this.init();
    }

    init() {
        this.createBookingInterface();
        this.setupPaymentProcessing();
        this.initializePriceComparison();
        this.createPackageBuilder();
        this.setupBookingManagement();
    }

    initializeProviders() {
        return {
            attractions: [
                {
                    name: 'Eiffel Tower Official',
                    id: 'eiffel-official',
                    commission: 0,
                    reliability: 10,
                    prices: { adult: 16.60, child: 4.10, senior: 13.10 }
                },
                {
                    name: 'GetYourGuide',
                    id: 'getyourguide',
                    commission: 0.15,
                    reliability: 9,
                    prices: { adult: 18.50, child: 6.50, senior: 15.50 }
                },
                {
                    name: 'Viator',
                    id: 'viator',
                    commission: 0.12,
                    reliability: 8,
                    prices: { adult: 17.80, child: 5.80, senior: 14.80 }
                }
            ],
            hotels: [
                {
                    name: 'Booking.com',
                    id: 'booking',
                    commission: 0.15,
                    reliability: 9
                },
                {
                    name: 'Hotels.com',
                    id: 'hotels',
                    commission: 0.10,
                    reliability: 8
                }
            ],
            restaurants: [
                {
                    name: 'OpenTable',
                    id: 'opentable',
                    commission: 0.05,
                    reliability: 9
                },
                {
                    name: 'LaFourchette',
                    id: 'lafourchette',
                    commission: 0.08,
                    reliability: 8
                }
            ]
        };
    }

    createBookingInterface() {
        const bookingInterface = document.createElement('div');
        bookingInterface.id = 'booking-interface';
        bookingInterface.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden';
        bookingInterface.innerHTML = `
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
                    <div class="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                        <h2 class="text-2xl font-bold text-gray-800">Book Your Paris Experience</h2>
                        <button id="close-booking" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
                    </div>
                    
                    <div class="p-6">
                        <!-- Booking Type Selection -->
                        <div class="mb-8">
                            <h3 class="text-lg font-semibold mb-4">What would you like to book?</h3>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div class="booking-type-card p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors" data-type="attractions">
                                    <div class="text-3xl text-center mb-2">🗼</div>
                                    <div class="text-center font-semibold">Attractions</div>
                                    <div class="text-sm text-gray-600 text-center">Museums, monuments, tours</div>
                                </div>
                                
                                <div class="booking-type-card p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors" data-type="hotels">
                                    <div class="text-3xl text-center mb-2">🏨</div>
                                    <div class="text-center font-semibold">Hotels</div>
                                    <div class="text-sm text-gray-600 text-center">Accommodation</div>
                                </div>
                                
                                <div class="booking-type-card p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors" data-type="restaurants">
                                    <div class="text-3xl text-center mb-2">🍽️</div>
                                    <div class="text-center font-semibold">Restaurants</div>
                                    <div class="text-sm text-gray-600 text-center">Dining experiences</div>
                                </div>
                                
                                <div class="booking-type-card p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors" data-type="packages">
                                    <div class="text-3xl text-center mb-2">📦</div>
                                    <div class="text-center font-semibold">Packages</div>
                                    <div class="text-sm text-gray-600 text-center">Complete experiences</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Search and Filters -->
                        <div id="booking-search" class="mb-8 hidden">
                            <div class="flex flex-col md:flex-row gap-4 mb-4">
                                <div class="flex-1">
                                    <input type="text" id="booking-search-input" placeholder="Search attractions, hotels, restaurants..." class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                </div>
                                <div class="flex gap-2">
                                    <input type="date" id="booking-date" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <select id="booking-guests" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="1">1 Guest</option>
                                        <option value="2">2 Guests</option>
                                        <option value="3">3 Guests</option>
                                        <option value="4">4+ Guests</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="flex flex-wrap gap-2 mb-4">
                                <select id="booking-price-range" class="p-2 border rounded-lg text-sm">
                                    <option value="">Price Range</option>
                                    <option value="0-25">€0 - €25</option>
                                    <option value="25-50">€25 - €50</option>
                                    <option value="50-100">€50 - €100</option>
                                    <option value="100+">€100+</option>
                                </select>
                                
                                <select id="booking-rating" class="p-2 border rounded-lg text-sm">
                                    <option value="">Rating</option>
                                    <option value="5">5 Stars</option>
                                    <option value="4">4+ Stars</option>
                                    <option value="3">3+ Stars</option>
                                </select>
                                
                                <select id="booking-duration" class="p-2 border rounded-lg text-sm">
                                    <option value="">Duration</option>
                                    <option value="1-2">1-2 hours</option>
                                    <option value="2-4">2-4 hours</option>
                                    <option value="4+">4+ hours</option>
                                    <option value="full-day">Full day</option>
                                </select>
                            </div>
                        </div>
                        
                        <!-- Results -->
                        <div id="booking-results" class="hidden">
                            <div class="mb-4">
                                <div class="flex justify-between items-center">
                                    <h3 class="text-lg font-semibold">Available Options</h3>
                                    <div class="flex items-center space-x-2">
                                        <span class="text-sm text-gray-600">Compare prices:</span>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" id="price-comparison-toggle" class="sr-only peer">
                                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="booking-results-list" class="space-y-4">
                                <!-- Results will be populated here -->
                            </div>
                        </div>
                        
                        <!-- Cart Summary -->
                        <div id="booking-cart" class="hidden">
                            <div class="bg-gray-50 rounded-lg p-4 mb-6">
                                <h3 class="text-lg font-semibold mb-4">Your Booking Cart</h3>
                                <div id="cart-items" class="space-y-3 mb-4">
                                    <!-- Cart items will be populated here -->
                                </div>
                                <div class="border-t pt-4">
                                    <div class="flex justify-between items-center text-lg font-semibold">
                                        <span>Total:</span>
                                        <span id="cart-total">€0.00</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex space-x-4">
                                <button id="clear-cart" class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    Clear Cart
                                </button>
                                <button id="proceed-checkout" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(bookingInterface);

        // Add booking button to main interface
        const bookingBtn = document.createElement('button');
        bookingBtn.id = 'booking-btn';
        bookingBtn.className = 'fixed bottom-24 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg z-40 hover:bg-green-700 transition-colors';
        bookingBtn.innerHTML = '🎫';
        bookingBtn.title = 'Book Experiences';
        document.body.appendChild(bookingBtn);

        // Event listeners
        bookingBtn.addEventListener('click', () => this.showBookingInterface());
        document.getElementById('close-booking').addEventListener('click', () => this.hideBookingInterface());
        
        // Booking type selection
        document.querySelectorAll('.booking-type-card').forEach(card => {
            card.addEventListener('click', () => this.selectBookingType(card.dataset.type));
        });

        // Search functionality
        document.getElementById('booking-search-input').addEventListener('input', () => this.performSearch());
        document.getElementById('booking-date').addEventListener('change', () => this.performSearch());
        document.getElementById('booking-guests').addEventListener('change', () => this.performSearch());
        document.getElementById('booking-price-range').addEventListener('change', () => this.performSearch());
        document.getElementById('booking-rating').addEventListener('change', () => this.performSearch());
        document.getElementById('booking-duration').addEventListener('change', () => this.performSearch());

        // Cart functionality
        document.getElementById('clear-cart').addEventListener('click', () => this.clearCart());
        document.getElementById('proceed-checkout').addEventListener('click', () => this.proceedToCheckout());
    }

    showBookingInterface() {
        document.getElementById('booking-interface').classList.remove('hidden');
        this.updateCartDisplay();
    }

    hideBookingInterface() {
        document.getElementById('booking-interface').classList.add('hidden');
    }

    selectBookingType(type) {
        // Update UI to show selected type
        document.querySelectorAll('.booking-type-card').forEach(card => {
            card.classList.remove('border-blue-500', 'bg-blue-50');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('border-blue-500', 'bg-blue-50');

        // Show search interface
        document.getElementById('booking-search').classList.remove('hidden');
        document.getElementById('booking-results').classList.remove('hidden');

        // Load results for selected type
        this.loadResults(type);
    }

    async loadResults(type) {
        const results = await this.searchProviders(type);
        this.displayResults(results);
    }

    async searchProviders(type) {
        // Mock search results - in real implementation, this would call APIs
        const mockResults = {
            attractions: [
                {
                    id: 'eiffel-tower',
                    name: 'Eiffel Tower Summit Access',
                    provider: 'Eiffel Tower Official',
                    price: 16.60,
                    originalPrice: 16.60,
                    rating: 4.8,
                    reviews: 15420,
                    duration: '2-3 hours',
                    highlights: ['Skip the line', 'Summit access', 'Audio guide'],
                    availability: 'Available today'
                },
                {
                    id: 'louvre-museum',
                    name: 'Louvre Museum Skip-the-Line',
                    provider: 'GetYourGuide',
                    price: 18.50,
                    originalPrice: 22.00,
                    rating: 4.7,
                    reviews: 8932,
                    duration: '3-4 hours',
                    highlights: ['Skip the line', 'Mona Lisa', 'Venus de Milo'],
                    availability: 'Available tomorrow'
                },
                {
                    id: 'seine-cruise',
                    name: 'Seine River Cruise',
                    provider: 'Bateaux Parisiens',
                    price: 15.00,
                    originalPrice: 15.00,
                    rating: 4.5,
                    reviews: 5621,
                    duration: '1 hour',
                    highlights: ['Evening cruise', 'Illuminated monuments', 'Audio commentary'],
                    availability: 'Available today'
                }
            ],
            hotels: [
                {
                    id: 'hotel-bristol',
                    name: 'Hotel Bristol Paris',
                    provider: 'Booking.com',
                    price: 285.00,
                    originalPrice: 320.00,
                    rating: 4.6,
                    reviews: 892,
                    location: '8th arrondissement',
                    amenities: ['Free WiFi', 'Breakfast included', 'Concierge'],
                    availability: '2 rooms left'
                },
                {
                    id: 'hotel-lutetia',
                    name: 'Hotel Lutetia',
                    provider: 'Hotels.com',
                    price: 245.00,
                    originalPrice: 280.00,
                    rating: 4.4,
                    reviews: 654,
                    location: '6th arrondissement',
                    amenities: ['Spa', 'Restaurant', 'Room service'],
                    availability: 'Available'
                }
            ],
            restaurants: [
                {
                    id: 'le-jules-verne',
                    name: 'Le Jules Verne',
                    provider: 'OpenTable',
                    price: 85.00,
                    originalPrice: 95.00,
                    rating: 4.3,
                    reviews: 342,
                    cuisine: 'French Fine Dining',
                    location: 'Eiffel Tower',
                    specialties: ['Michelin starred', 'Tasting menu', 'Wine pairing'],
                    availability: 'Available tonight'
                },
                {
                    id: 'le-comptoir',
                    name: 'Le Comptoir du Relais',
                    provider: 'LaFourchette',
                    price: 35.00,
                    originalPrice: 42.00,
                    rating: 4.1,
                    reviews: 567,
                    cuisine: 'Traditional French',
                    location: '6th arrondissement',
                    specialties: ['Bistro classics', 'Wine selection', 'Cozy atmosphere'],
                    availability: 'Available tonight'
                }
            ]
        };

        return mockResults[type] || [];
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('booking-results-list');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="text-center text-gray-500 py-8">No results found. Try adjusting your search criteria.</div>';
            return;
        }

        results.forEach(result => {
            const resultCard = this.createResultCard(result);
            resultsContainer.appendChild(resultCard);
        });
    }

    createResultCard(result) {
        const card = document.createElement('div');
        card.className = 'booking-result-card border rounded-lg p-4 hover:shadow-lg transition-shadow';
        
        const discount = result.originalPrice > result.price ? 
            Math.round((1 - result.price / result.originalPrice) * 100) : 0;

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h4 class="text-lg font-semibold text-gray-800 mb-1">${result.name}</h4>
                    <div class="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <span>⭐ ${result.rating}</span>
                        <span>(${result.reviews.toLocaleString()} reviews)</span>
                        <span>•</span>
                        <span>${result.provider}</span>
                    </div>
                    ${result.duration ? `<div class="text-sm text-gray-600 mb-1">⏱️ ${result.duration}</div>` : ''}
                    ${result.location ? `<div class="text-sm text-gray-600 mb-1">📍 ${result.location}</div>` : ''}
                    ${result.cuisine ? `<div class="text-sm text-gray-600 mb-1">🍽️ ${result.cuisine}</div>` : ''}
                    
                    ${result.highlights ? `
                        <div class="flex flex-wrap gap-1 mt-2">
                            ${result.highlights.map(highlight => `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${highlight}</span>`).join('')}
                        </div>
                    ` : ''}
                    
                    ${result.amenities ? `
                        <div class="flex flex-wrap gap-1 mt-2">
                            ${result.amenities.map(amenity => `<span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${amenity}</span>`).join('')}
                        </div>
                    ` : ''}
                    
                    ${result.specialties ? `
                        <div class="flex flex-wrap gap-1 mt-2">
                            ${result.specialties.map(specialty => `<span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">${specialty}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="text-right ml-4">
                    <div class="flex items-center space-x-2 mb-1">
                        ${discount > 0 ? `
                            <span class="text-sm text-gray-500 line-through">€${result.originalPrice.toFixed(2)}</span>
                            <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">-${discount}%</span>
                        ` : ''}
                    </div>
                    <div class="text-2xl font-bold text-gray-800">€${result.price.toFixed(2)}</div>
                    <div class="text-sm text-gray-600">per person</div>
                    <div class="text-sm text-green-600 mt-1">${result.availability}</div>
                </div>
            </div>
            
            <div class="flex justify-between items-center pt-3 border-t">
                <button class="view-details-btn text-blue-600 hover:text-blue-800 font-medium" data-id="${result.id}">
                    View Details
                </button>
                <button class="add-to-cart-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" data-id="${result.id}" data-result='${JSON.stringify(result)}'>
                    Add to Cart
                </button>
            </div>
        `;

        // Add event listeners
        card.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
            const resultData = JSON.parse(e.target.dataset.result);
            this.addToCart(resultData);
        });

        card.querySelector('.view-details-btn').addEventListener('click', (e) => {
            this.showDetails(e.target.dataset.id);
        });

        return card;
    }

    addToCart(item) {
        // Check if item already in cart
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            this.showNotification('Item already in cart!', 'warning');
            return;
        }

        // Add to cart
        this.cart.push({
            ...item,
            quantity: 1,
            addedAt: Date.now()
        });

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${item.name} added to cart!`, 'success');
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const cartContainer = document.getElementById('booking-cart');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (this.cart.length === 0) {
            cartContainer.classList.add('hidden');
            return;
        }

        cartContainer.classList.remove('hidden');
        cartItems.innerHTML = '';

        let total = 0;
        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'flex justify-between items-center p-3 bg-white rounded-lg border';
            cartItem.innerHTML = `
                <div class="flex-1">
                    <div class="font-semibold text-sm">${item.name}</div>
                    <div class="text-xs text-gray-600">${item.provider}</div>
                </div>
                <div class="text-right">
                    <div class="font-semibold">€${itemTotal.toFixed(2)}</div>
                    <button class="text-red-600 text-xs hover:text-red-800" onclick="bookingSystem.removeFromCart('${item.id}')">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `€${total.toFixed(2)}`;
    }

    proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Cart is empty!', 'error');
            return;
        }

        this.showCheckoutInterface();
    }

    showCheckoutInterface() {
        const checkoutInterface = document.createElement('div');
        checkoutInterface.id = 'checkout-interface';
        checkoutInterface.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
        checkoutInterface.innerHTML = `
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full">
                    <div class="p-6 border-b">
                        <h2 class="text-2xl font-bold text-gray-800">Checkout</h2>
                    </div>
                    
                    <div class="p-6">
                        <!-- Booking Summary -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-4">Booking Summary</h3>
                            <div id="checkout-summary" class="space-y-2 mb-4">
                                <!-- Summary will be populated here -->
                            </div>
                            <div class="border-t pt-4">
                                <div class="flex justify-between items-center text-lg font-semibold">
                                    <span>Total:</span>
                                    <span id="checkout-total">€0.00</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Guest Information -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-4">Guest Information</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <input type="text" placeholder="Last Name" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <input type="email" placeholder="Email Address" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <input type="tel" placeholder="Phone Number" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                            </div>
                        </div>
                        
                        <!-- Payment Method -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-4">Payment Method</h3>
                            <div class="space-y-3">
                                <label class="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="payment" value="card" class="text-blue-600" checked>
                                    <span>💳 Credit/Debit Card</span>
                                </label>
                                <label class="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="payment" value="paypal" class="text-blue-600">
                                    <span>🅿️ PayPal</span>
                                </label>
                                <label class="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name="payment" value="apple" class="text-blue-600">
                                    <span>🍎 Apple Pay</span>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Card Details (shown when card is selected) -->
                        <div id="card-details" class="mb-6">
                            <div class="grid grid-cols-1 gap-4">
                                <input type="text" placeholder="Card Number" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" pattern="[0-9]{16}">
                                <div class="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM/YY" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" pattern="[0-9]{2}/[0-9]{2}">
                                    <input type="text" placeholder="CVV" class="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" pattern="[0-9]{3}">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Terms and Conditions -->
                        <div class="mb-6">
                            <label class="flex items-start space-x-3 cursor-pointer">
                                <input type="checkbox" class="mt-1 text-blue-600" required>
                                <span class="text-sm text-gray-600">
                                    I agree to the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions</a> 
                                    and <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
                                </span>
                            </label>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex space-x-4">
                            <button id="cancel-checkout" class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button id="complete-booking" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                                Complete Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(checkoutInterface);

        // Populate checkout summary
        this.populateCheckoutSummary();

        // Event listeners
        document.getElementById('cancel-checkout').addEventListener('click', () => {
            checkoutInterface.remove();
        });

        document.getElementById('complete-booking').addEventListener('click', () => {
            this.processPayment();
        });

        // Payment method change
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const cardDetails = document.getElementById('card-details');
                if (e.target.value === 'card') {
                    cardDetails.classList.remove('hidden');
                } else {
                    cardDetails.classList.add('hidden');
                }
            });
        });
    }

    populateCheckoutSummary() {
        const summaryContainer = document.getElementById('checkout-summary');
        const totalElement = document.getElementById('checkout-total');
        
        summaryContainer.innerHTML = '';
        let total = 0;

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const summaryItem = document.createElement('div');
            summaryItem.className = 'flex justify-between items-center';
            summaryItem.innerHTML = `
                <span>${item.name} (${item.quantity}x)</span>
                <span>€${itemTotal.toFixed(2)}</span>
            `;
            summaryContainer.appendChild(summaryItem);
        });

        totalElement.textContent = `€${total.toFixed(2)}`;
    }

    async processPayment() {
        // Show loading state
        const button = document.getElementById('complete-booking');
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.disabled = true;

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create booking
            const bookingId = this.createBooking();

            // Show success message
            this.showBookingConfirmation(bookingId);

            // Clear cart
            this.clearCart();

            // Close checkout
            document.getElementById('checkout-interface').remove();
            document.getElementById('booking-interface').classList.add('hidden');

        } catch (error) {
            this.showNotification('Payment failed. Please try again.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    createBooking() {
        const bookingId = 'BK' + Date.now().toString().slice(-8);
        const booking = {
            id: bookingId,
            items: [...this.cart],
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            status: 'confirmed',
            createdAt: Date.now(),
            userId: this.user.id || 'guest'
        };

        this.bookings.push(booking);
        this.saveBookings();

        return bookingId;
    }

    showBookingConfirmation(bookingId) {
        const confirmation = document.createElement('div');
        confirmation.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        confirmation.innerHTML = `
            <div class="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
                <div class="text-center">
                    <div class="text-6xl mb-4">🎉</div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
                    <p class="text-gray-600 mb-4">Your booking reference is:</p>
                    <div class="bg-blue-100 text-blue-800 font-mono text-lg p-3 rounded-lg mb-6">
                        ${bookingId}
                    </div>
                    <p class="text-sm text-gray-600 mb-6">
                        A confirmation email has been sent to your email address with all the details.
                    </p>
                    <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full">
                        View My Bookings
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(confirmation);

        confirmation.querySelector('button').addEventListener('click', () => {
            confirmation.remove();
            this.showUserBookings();
        });

        setTimeout(() => {
            confirmation.remove();
        }, 5000);
    }

    showUserBookings() {
        const bookingsInterface = document.createElement('div');
        bookingsInterface.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
        bookingsInterface.innerHTML = `
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
                    <div class="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                        <h2 class="text-2xl font-bold text-gray-800">My Bookings</h2>
                        <button class="close-bookings text-gray-500 hover:text-gray-700 text-2xl">×</button>
                    </div>
                    
                    <div class="p-6">
                        <div id="bookings-list" class="space-y-4">
                            <!-- Bookings will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(bookingsInterface);

        this.populateUserBookings();

        bookingsInterface.querySelector('.close-bookings').addEventListener('click', () => {
            bookingsInterface.remove();
        });
    }

    populateUserBookings() {
        const bookingsList = document.getElementById('bookings-list');
        
        if (this.bookings.length === 0) {
            bookingsList.innerHTML = `
                <div class="text-center py-8">
                    <div class="text-6xl mb-4">📅</div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
                    <p class="text-gray-600 mb-4">Start planning your Paris adventure!</p>
                    <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Explore Experiences
                    </button>
                </div>
            `;
            return;
        }

        bookingsList.innerHTML = '';
        this.bookings.forEach(booking => {
            const bookingCard = this.createBookingCard(booking);
            bookingsList.appendChild(bookingCard);
        });
    }

    createBookingCard(booking) {
        const card = document.createElement('div');
        card.className = 'booking-card border rounded-lg p-4';
        
        const date = new Date(booking.createdAt).toLocaleDateString();
        const statusColor = booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600';

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="font-semibold text-lg">Booking ${booking.id}</h4>
                    <div class="text-sm text-gray-600">Created on ${date}</div>
                </div>
                <div class="text-right">
                    <div class="font-semibold text-lg">€${booking.total.toFixed(2)}</div>
                    <div class="text-sm ${statusColor} font-medium">${booking.status.toUpperCase()}</div>
                </div>
            </div>
            
            <div class="space-y-2 mb-4">
                ${booking.items.map(item => `
                    <div class="flex justify-between items-center text-sm">
                        <span>${item.name}</span>
                        <span>€${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="flex space-x-2 pt-3 border-t">
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                </button>
                <button class="text-green-600 hover:text-green-800 text-sm font-medium">
                    Download Voucher
                </button>
                ${booking.status === 'confirmed' ? `
                    <button class="text-red-600 hover:text-red-800 text-sm font-medium">
                        Cancel Booking
                    </button>
                ` : ''}
            </div>
        `;

        return card;
    }

    // Search and filter functionality
    performSearch() {
        const searchTerm = document.getElementById('booking-search-input').value.toLowerCase();
        const selectedDate = document.getElementById('booking-date').value;
        const guests = parseInt(document.getElementById('booking-guests').value);
        const priceRange = document.getElementById('booking-price-range').value;
        const rating = document.getElementById('booking-rating').value;
        const duration = document.getElementById('booking-duration').value;

        // Filter results based on criteria
        // This would be implemented based on the actual search results
        console.log('Searching with criteria:', { searchTerm, selectedDate, guests, priceRange, rating, duration });
    }

    // Price comparison
    initializePriceComparison() {
        const toggle = document.getElementById('price-comparison-toggle');
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.enablePriceComparison();
                } else {
                    this.disablePriceComparison();
                }
            });
        }
    }

    enablePriceComparison() {
        // Show price comparison for all providers
        console.log('Price comparison enabled');
    }

    disablePriceComparison() {
        // Hide price comparison, show only best prices
        console.log('Price comparison disabled');
    }

    // Package builder
    createPackageBuilder() {
        // Implementation for building custom packages
        console.log('Package builder initialized');
    }

    // Booking management
    setupBookingManagement() {
        // Implementation for managing existing bookings
        console.log('Booking management system initialized');
    }

    // Utility functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    loadBookings() {
        const saved = localStorage.getItem('paris-bookings');
        return saved ? JSON.parse(saved) : [];
    }

    saveBookings() {
        localStorage.setItem('paris-bookings', JSON.stringify(this.bookings));
    }

    loadCart() {
        const saved = localStorage.getItem('paris-booking-cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('paris-booking-cart', JSON.stringify(this.cart));
    }

    loadUser() {
        const saved = localStorage.getItem('paris-user');
        return saved ? JSON.parse(saved) : { id: 'guest', preferences: {} };
    }
}

// Initialize Booking System
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.bookingSystem = new BookingSystem();
        console.log('🎫 Advanced booking system initialized');
    }, 1500);
});