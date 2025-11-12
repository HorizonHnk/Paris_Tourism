// Weather Widget and Currency Converter for Paris Tourism Website

// Weather Widget Class
class WeatherWidget {
    constructor(apiKey = 'demo') {
        this.apiKey = apiKey; // Get free API key from openweathermap.org
        this.city = 'Paris';
        this.country = 'FR';
        this.units = 'metric'; // Celsius
        this.updateInterval = 600000; // 10 minutes
        this.lastUpdate = null;
        this.weatherData = null;
    }

    async fetchWeather() {
        if (!this.shouldUpdate()) {
            return this.weatherData;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=${this.units}&appid=${this.apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                return this.getDemoWeather();
            }

            const data = await response.json();
            this.weatherData = {
                temp: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                pressure: data.main.pressure,
                timestamp: Date.now()
            };

            this.lastUpdate = Date.now();
            return this.weatherData;
        } catch (error) {
            console.log('Weather API error, using demo data:', error);
            return this.getDemoWeather();
        }
    }

    async fetchForecast() {
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.country}&units=${this.units}&appid=${this.apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                return this.getDemoForecast();
            }

            const data = await response.json();
            const forecast = [];
            for (let i = 0; i < data.list.length; i += 8) {
                const item = data.list[i];
                forecast.push({
                    date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: Math.round(item.main.temp),
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                });
            }

            return forecast.slice(0, 5);
        } catch (error) {
            console.log('Forecast API error, using demo data:', error);
            return this.getDemoForecast();
        }
    }

    shouldUpdate() {
        if (!this.lastUpdate) return true;
        return Date.now() - this.lastUpdate > this.updateInterval;
    }

    getDemoWeather() {
        return {
            temp: 18,
            feelsLike: 16,
            description: 'partly cloudy',
            icon: '02d',
            humidity: 65,
            windSpeed: 12,
            pressure: 1013,
            timestamp: Date.now()
        };
    }

    getDemoForecast() {
        return [
            { date: 'Mon', temp: 20, description: 'sunny', icon: '01d' },
            { date: 'Tue', temp: 18, description: 'cloudy', icon: '03d' },
            { date: 'Wed', temp: 16, description: 'rain', icon: '10d' },
            { date: 'Thu', temp: 19, description: 'partly cloudy', icon: '02d' },
            { date: 'Fri', temp: 21, description: 'sunny', icon: '01d' }
        ];
    }

    renderWidget(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.fetchWeather().then(weather => {
            container.innerHTML = `
                <div class="weather-widget bg-white rounded-xl shadow-lg p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-gray-800">
                            <span data-translate="currentWeather">Current Weather</span>
                        </h3>
                        <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="Weather" class="w-16 h-16">
                    </div>
                    <div class="text-center">
                        <div class="text-5xl font-bold text-blue-600 mb-2">${weather.temp}°C</div>
                        <div class="text-gray-600 capitalize mb-4">${weather.description}</div>
                        <div class="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <div class="text-gray-500">Feels Like</div>
                                <div class="font-semibold">${weather.feelsLike}°C</div>
                            </div>
                            <div>
                                <div class="text-gray-500">Humidity</div>
                                <div class="font-semibold">${weather.humidity}%</div>
                            </div>
                            <div>
                                <div class="text-gray-500">Wind</div>
                                <div class="font-semibold">${weather.windSpeed} m/s</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    renderForecast(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.fetchForecast().then(forecast => {
            const forecastHTML = forecast.map(day => `
                <div class="text-center p-3 bg-gray-50 rounded-lg">
                    <div class="font-semibold text-gray-700">${day.date}</div>
                    <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}" class="w-12 h-12 mx-auto">
                    <div class="text-lg font-bold text-blue-600">${day.temp}°C</div>
                    <div class="text-xs text-gray-500 capitalize">${day.description}</div>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="forecast-widget bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">
                        <span data-translate="forecast">5-Day Forecast</span>
                    </h3>
                    <div class="grid grid-cols-5 gap-2">
                        ${forecastHTML}
                    </div>
                </div>
            `;
        });
    }
}

// Currency Converter Class
class CurrencyConverter {
    constructor(apiKey = 'demo') {
        this.apiKey = apiKey; // Get free API key from exchangerate-api.com
        this.baseCurrency = 'EUR';
        this.rates = null;
        this.lastUpdate = null;
        this.updateInterval = 3600000; // 1 hour
    }

    async fetchRates() {
        if (!this.shouldUpdate()) {
            return this.rates;
        }

        try {
            const url = `https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`;
            const response = await fetch(url);

            if (!response.ok) {
                return this.getDemoRates();
            }

            const data = await response.json();
            this.rates = data.rates;
            this.lastUpdate = Date.now();
            return this.rates;
        } catch (error) {
            console.log('Currency API error, using demo rates:', error);
            return this.getDemoRates();
        }
    }

    shouldUpdate() {
        if (!this.lastUpdate) return true;
        return Date.now() - this.lastUpdate > this.updateInterval;
    }

    getDemoRates() {
        return {
            USD: 1.10,
            GBP: 0.85,
            JPY: 160.0,
            CHF: 0.95,
            CAD: 1.45,
            AUD: 1.65,
            CNY: 7.80,
            INR: 90.0
        };
    }

    async convert(amount, fromCurrency, toCurrency) {
        await this.fetchRates();

        if (fromCurrency === this.baseCurrency) {
            return amount * this.rates[toCurrency];
        } else if (toCurrency === this.baseCurrency) {
            return amount / this.rates[fromCurrency];
        } else {
            const inBase = amount / this.rates[fromCurrency];
            return inBase * this.rates[toCurrency];
        }
    }

    renderConverter(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const currencies = ['EUR', 'USD', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'INR'];

        container.innerHTML = `
            <div class="currency-converter bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <span data-translate="currencyConverter">Currency Converter</span>
                </h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <span data-translate="amount">Amount</span>
                        </label>
                        <input
                            type="number"
                            id="currency-amount"
                            value="100"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <span data-translate="from">From</span>
                            </label>
                            <select id="currency-from" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                ${currencies.map(curr => `<option value="${curr}" ${curr === 'USD' ? 'selected' : ''}>${curr}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                <span data-translate="to">To</span>
                            </label>
                            <select id="currency-to" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                ${currencies.map(curr => `<option value="${curr}" ${curr === 'EUR' ? 'selected' : ''}>${curr}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <button
                        id="convert-btn"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <span data-translate="convert">Convert</span>
                    </button>
                    <div id="conversion-result" class="text-center py-4 bg-gray-50 rounded-lg hidden">
                        <div class="text-3xl font-bold text-blue-600" id="result-amount"></div>
                        <div class="text-sm text-gray-500 mt-2" id="result-text"></div>
                    </div>
                </div>
            </div>
        `;

        // Add event listener
        document.getElementById('convert-btn').addEventListener('click', async () => {
            const amount = parseFloat(document.getElementById('currency-amount').value);
            const from = document.getElementById('currency-from').value;
            const to = document.getElementById('currency-to').value;

            const result = await this.convert(amount, from, to);

            document.getElementById('result-amount').textContent = `${result.toFixed(2)} ${to}`;
            document.getElementById('result-text').textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
            document.getElementById('conversion-result').classList.remove('hidden');
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.weatherWidget = new WeatherWidget(); // Add OpenWeatherMap API key as parameter
    // Currency converter disabled - uncomment below if needed
    // window.currencyConverter = new CurrencyConverter();

    // Auto-render if containers exist
    if (document.getElementById('weather-widget')) {
        window.weatherWidget.renderWidget('weather-widget');
    }
    if (document.getElementById('weather-forecast')) {
        window.weatherWidget.renderForecast('weather-forecast');
    }
    // Currency converter disabled
    // if (document.getElementById('currency-converter')) {
    //     window.currencyConverter.renderConverter('currency-converter');
    // }
});
