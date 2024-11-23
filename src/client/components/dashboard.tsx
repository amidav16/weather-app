import React, { useEffect, useState } from "react";
import { locations, current } from "./data";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import AutoComplete from "./autocomplete";
import WeatherCard from "./card";
import WeatherDetails from "./weatherdetail";
import { fetchWeatherApi } from "openmeteo";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface DashBoardProps {
  isCelsius: boolean;
}

const Dashboard: React.FC<DashBoardProps> = ({ isCelsius }) => {
  const [selectedWeatherData, setSelectedWeatherData] = useState<any>(null);
  const [berlinWeatherData, setBerlinWeatherData] = useState<any>(null);
  const [londonWeatherData, setLondonWeatherData] = useState<any>(null);
  const [osloWeatherData, setOsloWeatheData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [weatherDetails, setWeatherDetails] = useState<any>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const Coordinates = {
    oslo: { longitude: 10.7522, latitude: 59.9139 },
    berlin: { longitude: 13.41, latitude: 52.52 },
    london: { longitude: -0.1278, latitude: 51.5074 },
  };

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    const params = {
      latitude,
      longitude,
      current: current,
      daily: ["sunrise", "sunset"],
      timezone: "GMT",
    };

    try {
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);

      const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

      const response = responses[0];

      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const daily = response.daily()!;

      if (!daily) throw new Error("No daily data available");
      if (!current) throw new Error("No current data available");

      return {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: current.variables(0)!.value(),
          relativeHumidity2m: current.variables(1)!.value(),
          apparentTemperature: current.variables(2)!.value(),
          isDay: current.variables(3)!.value(),
          precipitation: current.variables(4)!.value(),
          rain: current.variables(5)!.value(),
          showers: current.variables(6)!.value(),
          snowfall: current.variables(7)!.value(),
          weatherCode: current.variables(8)!.value(),
          cloudCover: current.variables(9)!.value(),
          pressureMsl: current.variables(10)!.value(),
          surfacePressure: current.variables(11)!.value(),
          windSpeed10m: current.variables(12)!.value(),
          windDirection10m: current.variables(13)!.value(),
          windGusts10m: current.variables(14)!.value(),
        },
        daily: {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          sunrise: daily.variables(0)!.valuesArray()!,
          sunset: daily.variables(1)!.valuesArray()!,
        },
      };
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
      return null;
    }
  };

  const fetchSelectedLocationWeather = async () => {
    const { latitude, longitude } = selectedLocation;
    const weatherData = await fetchWeatherData(latitude, longitude);
    setSelectedWeatherData(weatherData);
  };

  useEffect(() => {
    const fetchFixedWeathers = async () => {
      const berlinData = await fetchWeatherData(Coordinates.berlin.latitude, Coordinates.berlin.longitude); // Berlin coordinates
      const londonData = await fetchWeatherData(Coordinates.london.latitude, Coordinates.london.longitude); // London coordinates
      const osloData = await fetchWeatherData(Coordinates.oslo.latitude, Coordinates.oslo.longitude);

      setOsloWeatheData(osloData);
      setBerlinWeatherData(berlinData);
      setLondonWeatherData(londonData);
    };

    fetchFixedWeathers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchSelectedLocationWeather();
  }, [selectedLocation]);

  if (error) return <div>{error}</div>;

  const handleCardClick = (data: any, location: Location) => {
    setWeatherDetails({ data, location });
    setShowDetails(true);
  };

  const handleGoBack = () => {
    setShowDetails(false);
  };

  const celsiusToFahrenheit = (celsius: number): number => {
    return (celsius * 9) / 5 + 32;
  };

  return (
    <Box>
      {!showDetails ? <h1>Dashboard</h1> : <h1>Your location</h1>}

      {!showDetails ? (
        <>
          <AutoComplete setSelectedLocation={setSelectedLocation} />

          {/* Oslo Berlin and London */}
          <Box sx={{ flexGrow: 1, m: 4 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid size={4} sx={{ minWidth: 300 }}>
                <div>
                  {osloWeatherData ? (
                    <WeatherCard
                      locationName="Oslo"
                      isCelsius={isCelsius}
                      temperature={isCelsius ? osloWeatherData.current.temperature2m : celsiusToFahrenheit(osloWeatherData.current.temperature2m)}
                      humidity={osloWeatherData.current.relativeHumidity2m}
                      onClick={() =>
                        handleCardClick(osloWeatherData, {
                          name: "Oslo",
                          latitude: Coordinates.oslo.latitude,
                          longitude: Coordinates.oslo.longitude,
                        })
                      }
                    />
                  ) : (
                    <p>No data available for Berlin</p>
                  )}
                </div>
              </Grid>
              <Grid size={4} sx={{ minWidth: 300 }}>
                <div>
                  {berlinWeatherData ? (
                    <WeatherCard
                      locationName="Berlin"
                      isCelsius={isCelsius}
                      temperature={isCelsius ? berlinWeatherData.current.temperature2m : celsiusToFahrenheit(berlinWeatherData.current.temperature2m)}
                      humidity={berlinWeatherData.current.relativeHumidity2m}
                      onClick={() =>
                        handleCardClick(berlinWeatherData, {
                          name: "Berlin",
                          latitude: Coordinates.berlin.latitude,
                          longitude: Coordinates.berlin.longitude,
                        })
                      }
                    />
                  ) : (
                    <p>No data available for Berlin</p>
                  )}
                </div>
              </Grid>
              <Grid size={4} sx={{ minWidth: 300 }}>
                {londonWeatherData ? (
                  <WeatherCard
                    locationName="London"
                    isCelsius={isCelsius}
                    temperature={isCelsius ? londonWeatherData.current.temperature2m : celsiusToFahrenheit(londonWeatherData.current.temperature2m)}
                    humidity={londonWeatherData.current.relativeHumidity2m}
                    onClick={() =>
                      handleCardClick(londonWeatherData, {
                        name: "London",
                        latitude: Coordinates.london.latitude,
                        longitude: Coordinates.london.longitude,
                      })
                    }
                  />
                ) : (
                  <p>No data available for London</p>
                )}
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <WeatherDetails name={weatherDetails.location.name} weatherDetails={weatherDetails.data} handleGoBack={handleGoBack} isCelsius={isCelsius} />
      )}
    </Box>
  );
};

export default Dashboard;
