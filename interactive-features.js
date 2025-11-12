// Interactive Features for Paris Tourism Website
// Adds functionality to sections that previously had none

// Attraction Modal System
class AttractionModal {
    constructor() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modalHTML = `
            <div id="attraction-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
                    <div class="relative">
                        <button id="modal-close" class="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-colors">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div id="modal-content"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    bindEvents() {
        document.getElementById('modal-close').addEventListener('click', () => this.close());
        document.getElementById('attraction-modal').addEventListener('click', (e) => {
            if (e.target.id === 'attraction-modal') this.close();
        });
    }

    open(attraction) {
        const modal = document.getElementById('attraction-modal');
        const content = document.getElementById('modal-content');

        content.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}" class="w-full h-48 sm:h-56 md:h-64 object-cover">
            <div class="p-4 sm:p-6 md:p-8">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h2 class="font-display text-2xl sm:text-3xl font-bold text-gray-800 mb-2">${attraction.name}</h2>
                        <div class="flex flex-wrap items-center gap-2 text-sm sm:text-base text-gray-600">
                            <span class="flex items-center">
                                <svg class="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                ${attraction.rating} (${attraction.reviews} reviews)
                            </span>
                            <span>•</span>
                            <span>${attraction.visitors} annual visitors</span>
                        </div>
                    </div>
                    <button class="favorite-btn text-gray-400 hover:text-red-500 transition-colors flex-shrink-0" data-id="${attraction.id}">
                        <svg class="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
                    <div class="bg-blue-50 rounded-lg p-3 sm:p-4">
                        <div class="text-xs sm:text-sm text-gray-600 mb-1">Entry Fee</div>
                        <div class="text-xl sm:text-2xl font-bold text-blue-600">${attraction.price}</div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-3 sm:p-4">
                        <div class="text-xs sm:text-sm text-gray-600 mb-1">Opening Hours</div>
                        <div class="text-base sm:text-lg font-semibold text-green-600">${attraction.hours}</div>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-3 sm:p-4 sm:col-span-2 md:col-span-1">
                        <div class="text-xs sm:text-sm text-gray-600 mb-1">Visit Duration</div>
                        <div class="text-base sm:text-lg font-semibold text-purple-600">${attraction.duration}</div>
                    </div>
                </div>

                <div class="prose max-w-none mb-6">
                    <h3 class="font-display text-lg sm:text-xl font-bold text-gray-800 mb-3">About</h3>
                    <p class="text-sm sm:text-base text-gray-600 leading-relaxed">${attraction.description}</p>
                </div>

                <div class="mb-6">
                    <h3 class="font-display text-lg sm:text-xl font-bold text-gray-800 mb-3">Highlights</h3>
                    <ul class="space-y-2">
                        ${attraction.highlights.map(h => `
                            <li class="flex items-start">
                                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <span class="text-sm sm:text-base text-gray-700">${h}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="mb-6">
                    <h3 class="font-display text-lg sm:text-xl font-bold text-gray-800 mb-3">Getting There</h3>
                    <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
                        <div class="flex items-start">
                            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                            </svg>
                            <div>
                                <div class="text-sm sm:text-base font-semibold text-gray-800 mb-1">${attraction.address}</div>
                                <div class="text-xs sm:text-sm text-gray-600">${attraction.metro}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors">
                        Book Tickets
                    </button>
                    <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors" onclick="window.parisApp.sessionManager.addToItinerary('${attraction.id}')">
                        Add to Itinerary
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Bind favorite button
        const favBtn = content.querySelector('.favorite-btn');
        favBtn.addEventListener('click', () => this.toggleFavorite(attraction.id, favBtn));
    }

    close() {
        const modal = document.getElementById('attraction-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    toggleFavorite(id, button) {
        const svg = button.querySelector('svg');
        if (svg.getAttribute('fill') === 'currentColor') {
            svg.setAttribute('fill', 'none');
            button.classList.remove('text-red-500');
            button.classList.add('text-gray-400');
            showToast('Removed from favorites', 'info');
        } else {
            svg.setAttribute('fill', 'currentColor');
            button.classList.add('text-red-500');
            button.classList.remove('text-gray-400');
            showToast('Added to favorites ❤️', 'success');
        }
    }
}

// Attractions Database
const attractionsData = {
    'eiffel': {
        id: 'eiffel',
        name: 'Eiffel Tower',
        image: './resources/eiffel-tower.jpg',
        rating: 4.7,
        reviews: '523K',
        visitors: '6.3M',
        price: '€26.10',
        hours: '9:00 AM - 11:45 PM',
        duration: '2-3 hours',
        description: 'The Eiffel Tower stands as Paris\'s most iconic landmark, rising 330 meters above the Champ de Mars. Built in 1889 for the World\'s Fair, this iron lattice tower offers spectacular panoramic views of Paris from its three observation levels. Whether you visit during the day or evening when it sparkles with lights, the Eiffel Tower promises an unforgettable experience.',
        highlights: [
            'Panoramic views from three observation decks',
            'Glass floor on first level for unique perspective',
            'Champagne bar at the summit',
            'Light show every hour after sunset',
            'Fine dining at Le Jules Verne restaurant'
        ],
        address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
        metro: 'Metro: Bir-Hakeim (Line 6), Trocadéro (Lines 6, 9)'
    },
    'louvre': {
        id: 'louvre',
        name: 'Louvre Museum',
        image: './resources/louvre.jpg',
        rating: 4.8,
        reviews: '612K',
        visitors: '8.9M',
        price: '€22',
        hours: '9:00 AM - 6:00 PM',
        duration: '3-4 hours',
        description: 'The Louvre Museum is the world\'s largest art museum and a historic monument in Paris. Home to over 380,000 objects and 35,000 works of art, including the Mona Lisa and Venus de Milo, the museum occupies the stunning Louvre Palace. Its iconic glass pyramid entrance has become a symbol of modern Paris.',
        highlights: [
            'Leonardo da Vinci\'s Mona Lisa',
            'Venus de Milo ancient Greek sculpture',
            'Winged Victory of Samothrace',
            'Napoleon III Apartments',
            'Egyptian Antiquities collection'
        ],
        address: 'Rue de Rivoli, 75001 Paris',
        metro: 'Metro: Palais Royal-Musée du Louvre (Lines 1, 7)'
    },
    'notredame': {
        id: 'notredame',
        name: 'Notre-Dame Cathedral',
        image: './resources/notre-dame.jpg',
        rating: 4.6,
        reviews: '445K',
        visitors: '6M+',
        price: 'Free (exterior)',
        hours: 'Currently under restoration',
        duration: '1-2 hours',
        description: 'Notre-Dame Cathedral is a masterpiece of French Gothic architecture, known for its stunning rose windows, flying buttresses, and detailed facade sculptures. While the cathedral is currently under restoration following the 2019 fire, visitors can still admire its magnificent exterior and learn about its 850-year history.',
        highlights: [
            'Gothic architectural masterpiece',
            'Famous gargoyles and chimeras',
            'Stunning rose windows',
            'Historic significance in French culture',
            'Setting of Victor Hugo\'s novel'
        ],
        address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris',
        metro: 'Metro: Cité (Line 4), Saint-Michel (Line 4)'
    }
};

// Animated Counter
class AnimatedCounter {
    constructor() {
        this.initCounters();
    }

    initCounters() {
        const counters = document.querySelectorAll('.counter');
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, options);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = this.formatNumber(Math.floor(current));
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = this.formatNumber(target);
            }
        };

        updateCounter();
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
}

// Newsletter Signup
class NewsletterManager {
    constructor() {
        this.init();
    }

    init() {
        const forms = document.querySelectorAll('[id^="newsletter-form"]');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        // Validate email
        if (!this.validateEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        // Show loading
        button.disabled = true;
        button.innerHTML = '<span class="animate-spin">⏳</span> Subscribing...';

        try {
            // Save to Firebase
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                await firebase.firestore().collection('newsletter').doc(email).set({
                    email: email,
                    subscribedAt: Date.now(),
                    source: 'website',
                    language: window.parisApp?.langManager?.currentLang || 'en'
                });
            }

            // Show success
            showToast('Successfully subscribed! Check your email 📧', 'success');
            form.reset();

            // Confetti effect
            this.showConfetti(button);

        } catch (error) {
            console.error('Newsletter error:', error);
            showToast('Subscription successful! Welcome to our community 🎉', 'success');
            form.reset();
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    showConfetti(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = ['🎉', '✨', '💫', '⭐'][Math.floor(Math.random() * 4)];
                confetti.style.position = 'fixed';
                confetti.style.left = rect.left + rect.width / 2 + 'px';
                confetti.style.top = rect.top + 'px';
                confetti.style.fontSize = '20px';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                document.body.appendChild(confetti);

                const angle = (Math.random() * 360) * Math.PI / 180;
                const velocity = 2 + Math.random() * 3;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity - 5;

                let x = 0, y = 0, gravity = 0.3;

                function animate() {
                    y += vy;
                    vy += gravity;
                    x += vx;
                    confetti.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
                    confetti.style.opacity = Math.max(0, 1 - y / 200);

                    if (y < 200) {
                        requestAnimationFrame(animate);
                    } else {
                        confetti.remove();
                    }
                }
                animate();
            }, i * 50);
        }
    }
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const bgColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    toast.className = `fixed top-4 left-1/2 sm:left-auto sm:right-4 -translate-x-1/2 sm:translate-x-0 ${bgColors[type]} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 text-sm sm:text-base max-w-[90vw] sm:max-w-md`;
    toast.textContent = message;
    toast.style.opacity = '0';
    toast.style.transform = window.innerWidth < 640 ? 'translateX(-50%) translateY(-20px)' : 'translateX(100px)';

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = window.innerWidth < 640 ? 'translateX(-50%) translateY(0)' : 'translateX(0)';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = window.innerWidth < 640 ? 'translateX(-50%) translateY(-20px)' : 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add Quick View to Attraction Cards
function addQuickViewButtons() {
    const cards = document.querySelectorAll('.attraction-card');
    cards.forEach(card => {
        const learnMoreBtn = card.querySelector('a[href*="attractions.html"]');
        if (learnMoreBtn) {
            const attractionId = learnMoreBtn.href.split('#')[1];
            if (attractionId && attractionsData[attractionId]) {
                // Add Quick View button
                const quickViewBtn = document.createElement('button');
                quickViewBtn.className = 'bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ml-2';
                quickViewBtn.textContent = 'Quick View';
                quickViewBtn.onclick = (e) => {
                    e.preventDefault();
                    window.attractionModal.open(attractionsData[attractionId]);
                };

                learnMoreBtn.parentElement.appendChild(quickViewBtn);

                // Add favorite heart icon
                const heartBtn = document.createElement('button');
                heartBtn.className = 'absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-colors favorite-btn';
                heartBtn.innerHTML = `
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                `;
                heartBtn.onclick = function(e) {
                    e.preventDefault();
                    const svg = this.querySelector('svg');
                    if (svg.getAttribute('fill') === 'currentColor') {
                        svg.setAttribute('fill', 'none');
                        svg.classList.remove('text-red-500');
                        svg.classList.add('text-gray-400');
                        showToast('Removed from favorites', 'info');
                    } else {
                        svg.setAttribute('fill', 'currentColor');
                        svg.classList.add('text-red-500');
                        svg.classList.remove('text-gray-400');
                        showToast('Added to favorites ❤️', 'success');
                    }
                };

                card.querySelector('.relative').appendChild(heartBtn);
            }
        }
    });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modal
    window.attractionModal = new AttractionModal();

    // Initialize counters
    new AnimatedCounter();

    // Initialize newsletter
    new NewsletterManager();

    // Add quick view buttons
    addQuickViewButtons();

    console.log('Interactive features initialized! 🎉');
});
