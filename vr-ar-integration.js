// VR/AR Integration for Paris Tourism Website
// Virtual tours and augmented reality features

class VARExperience {
    constructor() {
        this.isVRSupported = this.checkVRSupport();
        this.isARSupported = this.checkARSupport();
        this.currentTour = null;
        this.vrSession = null;
        this.arSession = null;
        
        this.init();
    }

    init() {
        this.createVRTourInterface();
        this.createARNavigationInterface();
        this.setup360PhotoViewer();
        this.initializeAFrameSupport();
    }

    checkVRSupport() {
        return 'xr' in navigator && 'isSessionSupported' in navigator.xr;
    }

    checkARSupport() {
        return 'xr' in navigator && 'isSessionSupported' in navigator.xr;
    }

    createVRTourInterface() {
        const vrInterface = document.createElement('div');
        vrInterface.id = 'vr-interface';
        vrInterface.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 w-96 z-50 hidden';
        vrInterface.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-bold text-2xl text-gray-800">Virtual Paris Tours</h3>
                <button id="close-vr" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            
            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-3">Available Tours</h4>
                <div class="space-y-3" id="vr-tours-list">
                    <div class="vr-tour-item p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" data-tour="eiffel">
                        <div class="flex items-center space-x-3">
                            <span class="text-2xl">🗼</span>
                            <div>
                                <div class="font-semibold">Eiffel Tower Experience</div>
                                <div class="text-sm text-gray-600">360° views from all levels</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="vr-tour-item p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" data-tour="louvre">
                        <div class="flex items-center space-x-3">
                            <span class="text-2xl">🏛️</span>
                            <div>
                                <div class="font-semibold">Louvre Museum Tour</div>
                                <div class="text-sm text-gray-600">Explore famous artworks</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="vr-tour-item p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" data-tour="notre-dame">
                        <div class="flex items-center space-x-3">
                            <span class="text-2xl">⛪</span>
                            <div>
                                <div class="font-semibold">Notre-Dame Cathedral</div>
                                <div class="text-sm text-gray-600">Historic architecture tour</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="vr-tour-item p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" data-tour="montmartre">
                        <div class="flex items-center space-x-3">
                            <span class="text-2xl">🎨</span>
                            <div>
                                <div class="font-semibold">Montmartre Art District</div>
                                <div class="text-sm text-gray-600">Walk through artistic Paris</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-3">VR Controls</h4>
                <div class="text-sm text-gray-600 space-y-1">
                    <div>🎯 Click and drag to look around</div>
                    <div>🔍 Scroll to zoom in/out</div>
                    <div>📍 Click hotspots for information</div>
                    <div>⌨️ Use WASD keys to move</div>
                </div>
            </div>
            
            <div class="flex space-x-3">
                <button id="start-vr-tour" class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Start VR Tour
                </button>
                <button id="start-360-view" class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    360° View
                </button>
            </div>
        `;
        document.body.appendChild(vrInterface);

        // Add VR tour button to main interface
        const vrBtn = document.createElement('button');
        vrBtn.id = 'vr-tour-btn';
        vrBtn.className = 'fixed top-4 left-4 bg-purple-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-purple-700 transition-colors';
        vrBtn.innerHTML = '🥽';
        vrBtn.title = 'Virtual Tours';
        document.body.appendChild(vrBtn);

        // Event listeners
        vrBtn.addEventListener('click', () => this.showVRTours());
        document.getElementById('close-vr').addEventListener('click', () => this.hideVRTours());
        document.getElementById('start-vr-tour').addEventListener('click', () => this.startVRTour());
        document.getElementById('start-360-view').addEventListener('click', () => this.start360View());

        // Tour selection
        document.querySelectorAll('.vr-tour-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.vr-tour-item').forEach(i => i.classList.remove('bg-blue-100', 'border-blue-300'));
                item.classList.add('bg-blue-100', 'border-blue-300');
                this.currentTour = item.dataset.tour;
            });
        });
    }

    showVRTours() {
        document.getElementById('vr-interface').classList.remove('hidden');
    }

    hideVRTours() {
        document.getElementById('vr-interface').classList.add('hidden');
    }

    async startVRTour() {
        if (!this.currentTour) {
            alert('Please select a tour first!');
            return;
        }

        if (this.isVRSupported) {
            try {
                const supported = await navigator.xr.isSessionSupported('immersive-vr');
                if (supported) {
                    this.enterVRMode();
                } else {
                    this.start360Tour();
                }
            } catch (error) {
                console.log('VR not supported, starting 360 tour');
                this.start360Tour();
            }
        } else {
            this.start360Tour();
        }
    }

    async enterVRMode() {
        try {
            this.vrSession = await navigator.xr.requestSession('immersive-vr');
            this.setupVRScene();
        } catch (error) {
            console.error('Failed to enter VR mode:', error);
            this.start360Tour();
        }
    }

    setupVRScene() {
        // Create VR scene using WebXR or A-Frame
        const scene = this.createAFrameScene();
        document.body.appendChild(scene);
    }

    createAFrameScene() {
        const scene = document.createElement('a-scene');
        scene.setAttribute('vr-mode-ui', 'enabled: true');
        
        // Add sky
        const sky = document.createElement('a-sky');
        sky.setAttribute('color', '#87CEEB');
        scene.appendChild(sky);

        // Add ground
        const ground = document.createElement('a-plane');
        ground.setAttribute('position', '0 0 -4');
        ground.setAttribute('rotation', '-90 0 0');
        ground.setAttribute('width', '20');
        ground.setAttribute('height', '20');
        ground.setAttribute('color', '#7BC8A4');
        scene.appendChild(ground);

        // Add tour-specific content
        this.addTourContent(scene, this.currentTour);

        return scene;
    }

    addTourContent(scene, tourType) {
        switch (tourType) {
            case 'eiffel':
                this.addEiffelTowerContent(scene);
                break;
            case 'louvre':
                this.addLouvreContent(scene);
                break;
            case 'notre-dame':
                this.addNotreDameContent(scene);
                break;
            case 'montmartre':
                this.addMontmartreContent(scene);
                break;
        }
    }

    addEiffelTowerContent(scene) {
        // Create Eiffel Tower representation
        const tower = document.createElement('a-box');
        tower.setAttribute('position', '0 2 -5');
        tower.setAttribute('width', '1');
        tower.setAttribute('height', '4');
        tower.setAttribute('depth', '1');
        tower.setAttribute('color', '#8B4513');
        scene.appendChild(tower);

        // Add information panels
        const infoPanel = document.createElement('a-text');
        infoPanel.setAttribute('value', 'Eiffel Tower\nBuilt in 1889\n324 meters tall');
        infoPanel.setAttribute('position', '-2 1 -4');
        infoPanel.setAttribute('color', '#000000');
        infoPanel.setAttribute('width', '8');
        scene.appendChild(infoPanel);

        // Add interactive hotspots
        const hotspot = document.createElement('a-sphere');
        hotspot.setAttribute('position', '0 4 -4');
        hotspot.setAttribute('radius', '0.2');
        hotspot.setAttribute('color', '#FF0000');
        hotspot.className = 'hotspot';
        hotspot.setAttribute('onclick', 'showInfo("Top floor viewing deck")');
        scene.appendChild(hotspot);
    }

    start360Tour() {
        this.create360Viewer();
        this.hideVRTours();
    }

    create360Viewer() {
        const viewer = document.createElement('div');
        viewer.id = '360-viewer';
        viewer.className = 'fixed inset-0 bg-black z-50';
        viewer.innerHTML = `
            <div class="absolute top-4 right-4 z-10">
                <button id="close-360" class="bg-white text-black p-2 rounded-full hover:bg-gray-200">✕</button>
            </div>
            <div id="360-content" class="w-full h-full flex items-center justify-center">
                <div class="text-white text-center">
                    <div class="text-6xl mb-4">🗼</div>
                    <div class="text-2xl font-bold mb-2">360° ${this.currentTour.charAt(0).toUpperCase() + this.currentTour.slice(1)} Tour</div>
                    <div class="text-gray-300">Click and drag to explore</div>
                    <div class="mt-8">
                        <div class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer" onclick="rotate360View()">
                            Start Auto-Rotation
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(viewer);

        document.getElementById('close-360').addEventListener('click', () => {
            viewer.remove();
        });

        this.setup360Interaction(viewer);
    }

    setup360Interaction(viewer) {
        let isDragging = false;
        let startX = 0;
        let currentRotation = 0;

        viewer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });

        viewer.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                currentRotation += deltaX * 0.5;
                this.update360View(currentRotation);
            }
        });

        viewer.addEventListener('mouseup', () => {
            isDragging = false;
        });

        viewer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoom = e.deltaY > 0 ? 0.9 : 1.1;
            this.update360Zoom(zoom);
        });
    }

    update360View(rotation) {
        const content = document.getElementById('360-content');
        if (content) {
            content.style.transform = `rotateY(${rotation}deg)`;
        }
    }

    update360Zoom(zoom) {
        const content = document.getElementById('360-content');
        if (content) {
            const currentScale = parseFloat(content.style.transform.match(/scale\(([^)]+)\)/) || [1, 1])[1];
            const newScale = Math.max(0.5, Math.min(3, currentScale * zoom));
            content.style.transform = content.style.transform.replace(/scale\([^)]+\)/, '') + ` scale(${newScale})`;
        }
    }

    // AR Navigation
    createARNavigationInterface() {
        const arInterface = document.createElement('div');
        arInterface.id = 'ar-interface';
        arInterface.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 w-96 z-50 hidden';
        arInterface.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-bold text-2xl text-gray-800">AR Navigation</h3>
                <button id="close-ar" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            
            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-3">Point your camera at landmarks to get information</h4>
                <div class="text-sm text-gray-600 mb-4">
                    AR navigation helps you discover Paris landmarks by pointing your camera at them. 
                    Get instant information, history, and nearby recommendations.
                </div>
            </div>
            
            <div class="mb-6">
                <h4 class="font-semibold text-lg mb-3">Supported Landmarks</h4>
                <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                        <span class="text-xl">🗼</span>
                        <span>Eiffel Tower</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xl">⛪</span>
                        <span>Notre-Dame Cathedral</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xl">🏛️</span>
                        <span>Louvre Museum</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xl">🎨</span>
                        <span>Sacré-Cœur</span>
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-3">
                <button id="start-ar-nav" class="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                    Start AR Navigation
                </button>
                <button id="start-camera-scan" class="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Scan Mode
                </button>
            </div>
        `;
        document.body.appendChild(arInterface);

        // Add AR button to main interface
        const arBtn = document.createElement('button');
        arBtn.id = 'ar-nav-btn';
        arBtn.className = 'fixed top-20 left-4 bg-purple-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-purple-700 transition-colors';
        arBtn.innerHTML = '📱';
        arBtn.title = 'AR Navigation';
        document.body.appendChild(arBtn);

        // Event listeners
        arBtn.addEventListener('click', () => this.showARInterface());
        document.getElementById('close-ar').addEventListener('click', () => this.hideARInterface());
        document.getElementById('start-ar-nav').addEventListener('click', () => this.startARNavigation());
        document.getElementById('start-camera-scan').addEventListener('click', () => this.startCameraScan());
    }

    showARInterface() {
        document.getElementById('ar-interface').classList.remove('hidden');
    }

    hideARInterface() {
        document.getElementById('ar-interface').classList.add('hidden');
    }

    async startARNavigation() {
        if (!this.isARSupported) {
            alert('AR not supported on this device');
            return;
        }

        try {
            const supported = await navigator.xr.isSessionSupported('immersive-ar');
            if (supported) {
                this.arSession = await navigator.xr.requestSession('immersive-ar');
                this.setupARScene();
            } else {
                this.startCameraNavigation();
            }
        } catch (error) {
            console.error('AR not supported:', error);
            this.startCameraNavigation();
        }
    }

    setupARScene() {
        // Create AR scene with landmark recognition
        console.log('Setting up AR scene');
    }

    startCameraNavigation() {
        // Fallback camera-based navigation
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(stream => {
                    this.createCameraViewer(stream);
                })
                .catch(error => {
                    console.error('Camera access denied:', error);
                    alert('Camera access required for AR navigation');
                });
        } else {
            alert('Camera not supported on this device');
        }
    }

    createCameraViewer(stream) {
        const viewer = document.createElement('div');
        viewer.id = 'camera-viewer';
        viewer.className = 'fixed inset-0 bg-black z-50';
        viewer.innerHTML = `
            <video id="camera-video" class="w-full h-full object-cover" autoplay playsinline></video>
            <div class="absolute top-4 left-4 right-4">
                <div class="bg-black bg-opacity-50 text-white p-4 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-bold">AR Navigation</h3>
                        <button id="close-camera" class="text-white">✕</button>
                    </div>
                    <div id="landmark-info" class="text-sm">
                        Point camera at landmarks for information
                    </div>
                </div>
            </div>
            <div class="absolute bottom-4 left-4 right-4">
                <div class="bg-black bg-opacity-50 text-white p-4 rounded-lg">
                    <div class="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div class="text-2xl mb-1">🗼</div>
                            <div class="text-xs">Eiffel Tower</div>
                        </div>
                        <div>
                            <div class="text-2xl mb-1">⛪</div>
                            <div class="text-xs">Notre-Dame</div>
                        </div>
                        <div>
                            <div class="text-2xl mb-1">🏛️</div>
                            <div class="text-xs">Louvre</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(viewer);

        const video = document.getElementById('camera-video');
        video.srcObject = stream;

        document.getElementById('close-camera').addEventListener('click', () => {
            stream.getTracks().forEach(track => track.stop());
            viewer.remove();
        });

        this.simulateLandmarkDetection();
    }

    simulateLandmarkDetection() {
        const landmarks = [
            { name: 'Eiffel Tower', info: 'Built in 1889, 324m tall', distance: '200m' },
            { name: 'Louvre Museum', info: 'World\'s largest art museum', distance: '150m' },
            { name: 'Notre-Dame Cathedral', info: 'Medieval Catholic cathedral', distance: '300m' }
        ];

        setInterval(() => {
            const randomLandmark = landmarks[Math.floor(Math.random() * landmarks.length)];
            const infoElement = document.getElementById('landmark-info');
            if (infoElement) {
                infoElement.innerHTML = `
                    <div class="font-semibold">${randomLandmark.name}</div>
                    <div class="text-sm opacity-90">${randomLandmark.info}</div>
                    <div class="text-xs opacity-75">Distance: ${randomLandmark.distance}</div>
                `;
            }
        }, 5000);
    }

    startCameraScan() {
        this.startCameraNavigation();
    }

    // 360 Photo Viewer
    setup360PhotoViewer() {
        // Add 360 photo viewer capability
        const photo360Btn = document.createElement('button');
        photo360Btn.id = 'photo-360-btn';
        photo360Btn.className = 'fixed top-32 left-4 bg-orange-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-orange-700 transition-colors';
        photo360Btn.innerHTML = '📷';
        photo360Btn.title = '360° Photos';
        document.body.appendChild(photo360Btn);

        photo360Btn.addEventListener('click', () => this.show360PhotoGallery());
    }

    show360PhotoGallery() {
        const gallery = document.createElement('div');
        gallery.id = '360-gallery';
        gallery.className = 'fixed inset-0 bg-black bg-opacity-90 z-50';
        gallery.innerHTML = `
            <div class="absolute top-4 right-4 z-10">
                <button id="close-360-gallery" class="bg-white text-black p-2 rounded-full hover:bg-gray-200">✕</button>
            </div>
            <div class="container mx-auto p-8 h-full flex flex-col">
                <h2 class="text-3xl font-bold text-white mb-8 text-center">360° Paris Gallery</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                    <div class="360-photo-item bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors" data-photo="eiffel-360">
                        <div class="text-4xl text-center mb-2">🗼</div>
                        <div class="text-white text-center font-semibold">Eiffel Tower 360°</div>
                        <div class="text-gray-400 text-sm text-center">Experience the tower from all angles</div>
                    </div>
                    
                    <div class="360-photo-item bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors" data-photo="louvre-360">
                        <div class="text-4xl text-center mb-2">🏛️</div>
                        <div class="text-white text-center font-semibold">Louvre Courtyard 360°</div>
                        <div class="text-gray-400 text-sm text-center">The famous glass pyramid</div>
                    </div>
                    
                    <div class="360-photo-item bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors" data-photo="sacre-coeur-360">
                        <div class="text-4xl text-center mb-2">⛪</div>
                        <div class="text-white text-center font-semibold">Sacré-Cœur 360°</div>
                        <div class="text-gray-400 text-sm text-center">Panoramic views of Paris</div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(gallery);

        document.getElementById('close-360-gallery').addEventListener('click', () => {
            gallery.remove();
        });

        document.querySelectorAll('.360-photo-item').forEach(item => {
            item.addEventListener('click', () => {
                const photoType = item.dataset.photo;
                this.open360Photo(photoType);
                gallery.remove();
            });
        });
    }

    open360Photo(photoType) {
        // Create 360 photo viewer
        const viewer = document.createElement('div');
        viewer.id = '360-photo-viewer';
        viewer.className = 'fixed inset-0 bg-black z-50';
        viewer.innerHTML = `
            <div class="absolute top-4 right-4 z-10">
                <button id="close-360-photo" class="bg-white text-black p-2 rounded-full hover:bg-gray-200">✕</button>
            </div>
            <div id="360-photo-content" class="w-full h-full flex items-center justify-center">
                <div class="text-white text-center">
                    <div class="text-6xl mb-4">${this.getPhotoIcon(photoType)}</div>
                    <div class="text-2xl font-bold mb-2">360° ${this.getPhotoTitle(photoType)}</div>
                    <div class="text-gray-300 mb-8">Click and drag to explore the full 360° view</div>
                    <div class="text-sm text-gray-400">
                        In a full implementation, this would display an actual 360° photograph
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(viewer);

        document.getElementById('close-360-photo').addEventListener('click', () => {
            viewer.remove();
        });

        this.setup360PhotoInteraction(viewer);
    }

    getPhotoIcon(photoType) {
        const icons = {
            'eiffel-360': '🗼',
            'louvre-360': '🏛️',
            'sacre-coeur-360': '⛪'
        };
        return icons[photoType] || '📷';
    }

    getPhotoTitle(photoType) {
        const titles = {
            'eiffel-360': 'Eiffel Tower',
            'louvre-360': 'Louvre Museum',
            'sacre-coeur-360': 'Sacré-Cœur'
        };
        return titles[photoType] || '360° Photo';
    }

    setup360PhotoInteraction(viewer) {
        let isDragging = false;
        let startX = 0;
        let currentRotation = 0;

        viewer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });

        viewer.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                currentRotation += deltaX * 0.5;
                this.update360PhotoView(currentRotation);
            }
        });

        viewer.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    update360PhotoView(rotation) {
        const content = document.getElementById('360-photo-content');
        if (content) {
            content.style.transform = `rotateY(${rotation}deg)`;
        }
    }

    // A-Frame Support
    initializeAFrameSupport() {
        // Check if A-Frame is loaded, if not, load it
        if (!document.querySelector('script[src*="aframe"]')) {
            const aframeScript = document.createElement('script');
            aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
            document.head.appendChild(aframeScript);
        }
    }
}

// Initialize VR/AR Experience
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.vrArExperience = new VARExperience();
        console.log('🥽 VR/AR features initialized');
    }, 2000);
});

// Global functions for VR interactions
window.showInfo = function(info) {
    alert(info);
};

window.rotate360View = function() {
    const content = document.getElementById('360-content');
    if (content) {
        let rotation = 0;
        const interval = setInterval(() => {
            rotation += 1;
            content.style.transform = `rotateY(${rotation}deg)`;
            if (rotation >= 360) {
                clearInterval(interval);
            }
        }, 50);
    }
};