import { createContext } from 'react';
import { type WeatherAPI } from '../services/WeatherAPI';
import { type CityAPI } from '../services/CityAPI';

export const WeatherContext = createContext<WeatherAPI | null>(null);

export const CityContext = createContext<CityAPI | null>(null);
