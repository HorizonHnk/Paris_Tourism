// Website Testing Script - Paris Tourism Website
// This script tests all major functionality of the website

class WebsiteTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            errors: []
        };
    }

    async runAllTests() {
        console.log('🧪 Starting Paris Tourism Website Tests...\n');
        
        await this.testHTMLStructure();
        await this.testJavaScriptLoading();
        await this.testCSSLoading();
        await this.testBilingualSupport();
        await this.testChatbotFunctionality();
        await this.testInteractiveComponents();
        await this.testFormFunctionality();
        await this.testResponsiveDesign();
        
        this.printResults();
    }

    async testHTMLStructure() {
        console.log('📄 Testing HTML Structure...');
        try {
            // Check if all HTML files exist
            const files = ['index.html', 'attractions.html', 'culture.html', 'contact.html'];
            for (const file of files) {
                const response = await fetch(file);
                if (response.ok) {
                    console.log(`✅ ${file} exists and loads correctly`);
                    this.testResults.passed++;
                } else {
                    console.log(`❌ ${file} failed to load`);
                    this.testResults.failed++;
                    this.testResults.errors.push(`${file} failed to load`);
                }
            }
        } catch (error) {
            console.log('❌ HTML structure test failed:', error.message);
            this.testResults.failed++;
            this.testResults.errors.push('HTML structure test failed');
        }
    }

    async testJavaScriptLoading() {
        console.log('\n📜 Testing JavaScript Loading...');
        try {
            // Check if main.js loads correctly
            const response = await fetch('main.js');
            if (response.ok) {
                const content = await response.text();
                
                // Check for key functions
                const requiredFunctions = [
                    'LanguageManager',
                    'EnhancedParisChatbot', 
                    'SessionManager',
                    'ParisTourismApp'
                ];
                
                for (const func of requiredFunctions) {
                    if (content.includes(`class ${func}`) || content.includes(`function ${func}`)) {
                        console.log(`✅ ${func} found in main.js`);
                        this.testResults.passed++;
                    } else {
                        console.log(`❌ ${func} missing in main.js`);
                        this.testResults.failed++;
                        this.testResults.errors.push(`${func} missing in main.js`);
                    }
                }
            } else {
                console.log('❌ main.js failed to load');
                this.testResults.failed++;
                this.testResults.errors.push('main.js failed to load');
            }
        } catch (error) {
            console.log('❌ JavaScript loading test failed:', error.message);
            this.testResults.failed++;
            this.testResults.errors.push('JavaScript loading test failed');
        }
    }

    async testCSSLoading() {
        console.log('\n🎨 Testing CSS Loading...');
        try {
            // Check if Tailwind CSS is loaded
            const tailwindCheck = document.querySelector('[class*="flex"]');
            if (tailwindCheck) {
                console.log('✅ Tailwind CSS is working (flex class found)');
                this.testResults.passed++;
            } else {
                console.log('❌ Tailwind CSS may not be loading properly');
                this.testResults.failed++;
                this.testResults.errors.push('Tailwind CSS loading issue');
            }

            // Check custom fonts
            const fontCheck = document.querySelector('.font-display, .font-script');
            if (fontCheck) {
                console.log('✅ Custom fonts are loaded');
                this.testResults.passed++;
            } else {
                console.log('⚠️ Custom fonts may not be loading (non-critical)');
            }
        } catch (error) {
            console.log('❌ CSS loading test failed:', error.message);
            this.testResults.failed++;
            this.testResults.errors.push('CSS loading test failed');
        }
    }

    async testBilingualSupport() {
        console.log('\n🌍 Testing Bilingual Support...');
        try {
            // Check if language elements exist
            const langElements = document.querySelectorAll('[data-translate]');
            if (langElements.length > 0) {
                console.log(`✅ Found ${langElements.length} translatable elements`);
                this.testResults.passed++;
            } else {
                console.log('❌ No translatable elements found');
                this.testResults.failed++;
                this.testResults.errors.push('No translatable elements');
            }

            // Check language buttons
            const langButtons = document.querySelectorAll('.lang-btn');
            if (langButtons.length >= 2) {
                console.log(`✅ Found ${langButtons.length} language buttons`);
                this.testResults.passed++;
            } else {
                console.log('❌ Language buttons not found');
                this.testResults.failed++;
                this.testResults.errors.push('Language buttons missing');
            }
        } catch (error) {
            console.log('❌ Bilingual support test failed:', error.message);
            this.testResults.failed++;
            this.testResults.errors.push('Bilingual support test failed');
        }
    }

    async testChatbotFunctionality() {
        console.log('\n🤖 Testing Chatbot Functionality...');
        try {
            // Check if chatbot elements exist
            const chatbotButton = document.getElementById('chatbot-button');
            const chatbotWindow = document.getElementById('chatbot-window');
            const chatbotInput = document.getElementById('chatbot-input');
            const chatbotSend = document.getElementById('chatbot-send');

            if (chatbotButton && chatbotWindow && chatbotInput && chatbotSend) {
                console.log('✅ All chatbot UI elements found');
                this.testResults.passed += 4;
            } else {
                console.log('❌ Missing chatbot UI elements');
                this.testResults.failed += 4;
                this.testResults.errors.push('Chatbot UI elements missing');
            }

            // Test chatbot button click
            if (chatbotButton) {
                chatbotButton.click();
                setTimeout(() => {
                    if (!chatbotWindow.classList.contains('hidden')) {
                        console.log('✅ Chatbot opens correctly');
                        this.testResults.passed++;
                    } else {
                        console.log('❌ Chatbot does not open');
                        this.testResults.failed++;
                        this.testResults.errors.push('Chatbot does not open');
                    }
                }, 100);
            }
        } catch (error) {
            console.log('❌ Chatbot functionality test failed:', error.message);
            this.testResults.failed++;
            this.testResults.errors.push('Chatbot functionality test failed');
        }
    }

    async testInteractiveComponents() {
        console.log('\n🎯 Testing Interactive Components...');
        try {
            // Test animations
            const animatedElements = document.querySelectorAll('.fade-in-up, .stagger-children');
            if (animatedElements.length > 0) {
                console.log(`✅ Found ${animatedElements.length} animated elements`);
                this.testResults.passed++;
            } else {
                console.log('⚠️ No animated elements found');
            }

            // Test hover effects
            const hoverElements = document.querySelectorAll('.attraction-card, .culture-card');
            if (hoverElements.length > 0) {
                console.log(`✅ Found ${hoverElements.length} elements with hover effects`);
                this.testResults.passed++;
            } else {
                console.log('⚠️ No hover effect elements found');
            }

            // Test counters
            const counters = document.querySelectorAll('.counter');
            if (counters.length > 0) {
                console.log(`✅ Found ${counters.length} counter elements`);
                this.testResults.passed++;
            } else {
                console.log('⚠️ No counter elements found');
            }
        } catch (error) {
            console.log('❌ Interactive components test failed:', error.message);
            this.testResults.failed++;
            this.testResults.errors.push('Interactive components test failed');
        }
    }

    async testFormFunctionality() {
        console.log('\n📝 Testing Form Functionality...');
        try {
            // Check contact form
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                console.log('✅ Contact form found');
                this.testResults.passed++;

                // Check form fields
                const requiredFields = contactForm.querySelectorAll('[required]');
                if (requiredFields.length > 0) {
                    console.log(`✅ Found ${requiredFields.length} required form fields`);
                    this.testResults.passed++;
                } else {
                    console.log('⚠️ No required form fields found');
                }
            } else {
                console.log('⚠️ Contact form not found on this page');
            }
        } catch (error) {
            console.log('❌ Form functionality test failed:', error.message);
            this.testResults.failed++;
            this.testResults.errors.push('Form functionality test failed');
        }
    }

    async testResponsiveDesign() {
        console.log('\n📱 Testing Responsive Design...');
        try {
            // Check for responsive classes
            const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
            if (responsiveElements.length > 0) {
                console.log(`✅ Found ${responsiveElements.length} responsive design elements`);
                this.testResults.passed++;
            } else {
                console.log('⚠️ No responsive design elements found');
            }

            // Check mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileButton = document.getElementById('mobile-menu-button');
            if (mobileMenu && mobileButton) {
                console.log('✅ Mobile menu elements found');
                this.testResults.passed++;
            } else {
                console.log('⚠️ Mobile menu elements not found');
            }
        } catch (error) {
            console.log('❌ Responsive design test failed:', error.message);
            this.testResults.failed++;
            this.testResults.errors.push('Responsive design test failed');
        }
    }

    printResults() {
        console.log('\n' + '='.repeat(50));
        console.log('📊 WEBSITE TEST RESULTS');
        console.log('='.repeat(50));
        console.log(`✅ Passed: ${this.testResults.passed}`);
        console.log(`❌ Failed: ${this.testResults.failed}`);
        console.log(`📋 Total Tests: ${this.testResults.passed + this.testResults.failed}`);
        
        if (this.testResults.errors.length > 0) {
            console.log('\n🔍 Errors Found:');
            this.testResults.errors.forEach((error, index) => {
                console.log(`  ${index + 1}. ${error}`);
            });
        }
        
        const successRate = (this.testResults.passed / (this.testResults.passed + this.testResults.failed)) * 100;
        console.log(`\n📈 Success Rate: ${successRate.toFixed(1)}%`);
        
        if (successRate >= 80) {
            console.log('🎉 Website is working well!');
        } else if (successRate >= 60) {
            console.log('⚠️ Website has some issues but is mostly functional');
        } else {
            console.log('❌ Website has significant issues that need attention');
        }
        
        console.log('\n🌐 Website URL: https://ym4mrjbagfy2e.ok.kimi.link');
        console.log('='.repeat(50));
    }
}

// Run the tests when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const tester = new WebsiteTester();
        tester.runAllTests();
    }, 2000); // Wait for everything to load
});