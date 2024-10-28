// localStorageUtils.ts
const LOCAL_STORAGE_KEY = "weatherApp";

export const saveWeatherData = (locationName: string, weatherData: any) => {
  const dataToStore = { locationName, weatherData };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
};

export const loadWeatherData = () => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : null;
};
