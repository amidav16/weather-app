import React, { useEffect, useState } from "react";
import { locations, current } from "./data";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Dropdown from "./dropdown";
import WeatherCard from "./card";

import WeatherDetails from "./weatherdetail";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

const Dashboard: React.FC = () => {
  const [selectedWeatherData, setSelectedWeatherData] = useState<any>(null);
  const [berlinWeatherData, setBerlinWeatherData] = useState<any>(null);
  const [londonWeatherData, setLondonWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(
    locations[0]
  );

  const [weatherDetails, setWeatherDetails] = useState<any>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    const params = {
      latitude,
      longitude,
      current: current,
      timezone: "auto",
      models: "metno_seamless",
    };

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=${params.current.join(",")}&timezone=${params.timezone}&models=${params.models}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch data");
      }

      return data.current;
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
      return null;
    }
  };

  const fetchSelectedLocationWeather = async () => {
    const { latitude, longitude } = selectedLocation; // Use the Location object directly
    setSelectedWeatherData(await fetchWeatherData(latitude, longitude));
  };

  useEffect(() => {
    const fetchBerlinAndLondonWeather = async () => {
      const berlinData = await fetchWeatherData(52.52, 13.41); // Berlin coordinates
      const londonData = await fetchWeatherData(51.5074, -0.1278); // London coordinates

      setBerlinWeatherData(berlinData);
      setLondonWeatherData(londonData);
    };

    fetchBerlinAndLondonWeather();
  }, []);

  useEffect(() => {
    fetchSelectedLocationWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  if (error) return <div>{error}</div>;

  const handleCardClick = (data: any, location: any) => {
    setWeatherDetails({ data, location }); // Set selected weather data
    setShowDetails(true); // Show detailed weather data
  };

  const handleGoBack = () => {
    setShowDetails(false); // Hide the details view
  };

  console.log(weatherDetails);

  return (
    <div>
      <h1>Dashboard</h1>

      {!showDetails ? ( // Conditional rendering for cards
        <>
          <Dropdown
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />

          <Box sx={{ flexGrow: 1, m: 4 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid size={4} sx={{ minWidth: 300 }}>
                <div>
                  {selectedWeatherData ? (
                    <WeatherCard
                      locationName={selectedLocation.name}
                      temperature={selectedWeatherData.temperature_2m}
                      humidity={selectedWeatherData.relative_humidity_2m}
                      onClick={() =>
                        handleCardClick(selectedWeatherData, selectedLocation)
                      }
                    />
                  ) : (
                    <p>No data available for {selectedLocation.name}</p>
                  )}
                </div>
              </Grid>
              <Grid size={4} sx={{ minWidth: 300 }}>
                <div>
                  {berlinWeatherData ? (
                    <WeatherCard
                      locationName="Berlin"
                      temperature={berlinWeatherData.temperature_2m}
                      humidity={berlinWeatherData.relative_humidity_2m}
                      onClick={() =>
                        handleCardClick(berlinWeatherData, {
                          name: "Berlin",
                          latitude: 52.52,
                          longitude: 13.41,
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
                    temperature={londonWeatherData.temperature_2m}
                    humidity={londonWeatherData.relative_humidity_2m}
                    onClick={() =>
                      handleCardClick(londonWeatherData, {
                        name: "London",
                        latitude: 51.5074,
                        longitude: -0.1278,
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
        // Render weather details when showDetails is true
        <WeatherDetails
          name={weatherDetails.location.name}
          weatherDetails={weatherDetails.data}
          handleGoBack={handleGoBack}
        />
      )}
    </div>
  );
};

export default Dashboard;
