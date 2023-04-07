import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WeatherContext, CityContext } from './components/context/context';
import { CityAPI } from './services/CityAPI';
import { WeatherAPI } from './services/WeatherAPI';

const cityManager = new CityAPI();
const weatherManager = new WeatherAPI();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CityContext.Provider value={cityManager}>
			<WeatherContext.Provider value={weatherManager}>
				<App />
			</WeatherContext.Provider>
		</CityContext.Provider>
	</React.StrictMode>
)
