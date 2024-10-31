// localStorageUtils.ts
const LOCATION_STORAGE_KEY = "locationKey";
const IS_CELSIUS_STORAGE_KEY = "isCelsiusKey";

export const saveWeatherData = (locationName: string, weatherData: any) => {
  const dataToStore = { locationName, weatherData };
  localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(dataToStore));
};

export const loadWeatherData = () => {
  const savedData = localStorage.getItem(LOCATION_STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : null;
};

export const saveIsCelsius = (isCelsius: boolean) => {
  localStorage.setItem(IS_CELSIUS_STORAGE_KEY, JSON.stringify(isCelsius));
};

export const loadIsCelsius = () => {
  const savedData = localStorage.getItem(IS_CELSIUS_STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : true;
};
