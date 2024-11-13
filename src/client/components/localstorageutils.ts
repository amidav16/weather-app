// localStorageUtils.ts
const IS_CELSIUS_STORAGE_KEY = "isCelsiusKey";

export const saveIsCelsius = (isCelsius: boolean) => {
  localStorage.setItem(IS_CELSIUS_STORAGE_KEY, JSON.stringify(isCelsius));
};

export const loadIsCelsius = () => {
  const savedData = localStorage.getItem(IS_CELSIUS_STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : true;
};
