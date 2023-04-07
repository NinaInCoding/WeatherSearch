import { createContext } from 'react';
import { WeatherAPI } from '../../services/WeatherAPI';
import { CityAPI } from '../../services/CityAPI';

export const WeatherContext = createContext<WeatherAPI | null>(null);

export const CityContext = createContext<CityAPI | null>(null);
