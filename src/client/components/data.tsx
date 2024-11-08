//Location and Current Data
import ClearIcon from "@mui/icons-material/WbSunny"; // Use appropriate icons
import PartlyCloudyIcon from "@mui/icons-material/Cloud"; // Change icons as needed
import OvercastIcon from "@mui/icons-material/CloudQueue"; // Change icons as needed
import RainIcon from "@mui/icons-material/Grain"; // Use appropriate icons
import SnowIcon from "@mui/icons-material/AcUnit"; // Use appropriate icons
import ThunderstormIcon from "@mui/icons-material/Thunderstorm"; // Use appropriate icons

interface WeatherInfo {
  description: string;
  icon: React.ReactNode; // Use ReactNode for MUI icons
}

export const locations = [
  { name: "Oslo", latitude: 59.9139, longitude: 10.7522 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Berlin", latitude: 52.52, longitude: 13.41 },
  { name: "Stockholm", latitude: 59.3293, longitude: 18.0686 },
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { name: "Tokyo", latitude: 35.682839, longitude: 139.759455 },
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
  { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
  { name: "Copenhagen", latitude: 55.6761, longitude: 12.5683 },
  { name: "Helsinki", latitude: 60.1695, longitude: 24.9354 },
  { name: "Reykjavik", latitude: 64.1355, longitude: -21.8954 },
  { name: "Dublin", latitude: 53.349805, longitude: -6.26031 },
  { name: "Toronto", latitude: 43.65107, longitude: -79.347015 },
  { name: "Vancouver", latitude: 49.2827, longitude: -123.1207 },
  { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
  { name: "Melbourne", latitude: -37.8136, longitude: 144.9631 },
  { name: "Buenos Aires", latitude: -34.6037, longitude: -58.3816 },
  { name: "Sao Paulo", latitude: -23.5505, longitude: -46.6333 },
  { name: "Cape Town", latitude: -33.9249, longitude: 18.4241 },
  { name: "Singapore", latitude: 1.3521, longitude: 103.8198 },
  { name: "Hong Kong", latitude: 22.3964, longitude: 114.1099 },
  { name: "Mumbai", latitude: 19.076, longitude: 72.8777 },
  { name: "Bangkok", latitude: 13.7563, longitude: 100.5018 },
  { name: "Kuala Lumpur", latitude: 3.139, longitude: 101.6869 },
  { name: "Nairobi", latitude: -1.286389, longitude: 36.817223 },
  { name: "Lagos", latitude: 6.5244, longitude: 3.3792 },
  { name: "Accra", latitude: 5.6037, longitude: -0.187 },
];

export const current = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "is_day",
  "precipitation",
  "rain",
  "showers",
  "snowfall",
  "weather_code",
  "cloud_cover",
  "pressure_msl",
  "surface_pressure",
  "wind_speed_10m",
  "wind_direction_10m",
  "wind_gusts_10m",
];

export const weatherCodeMapping: Record<number, WeatherInfo> = {
  0: { description: "Clear sky", icon: <ClearIcon sx={{ color: "#42a5f5" }} /> },
  1: { description: "Mainly clear", icon: <PartlyCloudyIcon sx={{ color: "#42a5f5" }} /> },
  2: { description: "Partly cloudy", icon: <PartlyCloudyIcon sx={{ color: "#42a5f5" }} /> },
  3: { description: "Overcast", icon: <OvercastIcon sx={{ color: "#42a5f5" }} /> },
  45: { description: "Fog", icon: <PartlyCloudyIcon sx={{ color: "#42a5f5" }} /> },
  48: { description: "Fog", icon: <PartlyCloudyIcon sx={{ color: "#42a5f5" }} /> },
  51: { description: "Light drizzle", icon: <RainIcon sx={{ color: "#42a5f5" }} /> },
  53: { description: "Moderate drizzle", icon: <RainIcon sx={{ color: "#42a5f5" }} /> },
  55: { description: "Dense drizzle", icon: <RainIcon sx={{ color: "#42a5f5" }} /> },
  61: { description: "Slight rain", icon: <RainIcon sx={{ color: "#42a5f5" }} /> },
  63: { description: "Moderate rain", icon: <RainIcon sx={{ color: "#42a5f5" }} /> },
  65: { description: "Heavy rain", icon: <RainIcon sx={{ color: "#42a5f5" }} /> },
  71: { description: "Snow flurries", icon: <SnowIcon sx={{ color: "#42a5f5" }} /> },
  80: { description: "Rain showers", icon: <RainIcon sx={{ color: "#42a5f5" }} /> },
  81: { description: "Rain showers", icon: <RainIcon sx={{ color: "#42a5f5" }} /> },
  95: { description: "Thunderstorms", icon: <ThunderstormIcon sx={{ color: "#42a5f5" }} /> },
};
