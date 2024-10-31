import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import CompressIcon from "@mui/icons-material/Compress";
import AirIcon from "@mui/icons-material/Air";
import GrainIcon from "@mui/icons-material/Grain";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";

import Grow from "@mui/material/Grow";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { weatherCodeMapping } from "./data";

interface WeatherDetailsProps {
  name: string;
  weatherDetails: {
    current: {
      temperature2m: number;
      relativeHumidity2m: number;
      weatherCode: number;
      apparentTemperature: number;
      precipitation: number;
      cloudCover: number;
      pressureMsl: number;
      windSpeed10m: number;
      isDay: number;
    };
    daily: { sunrise: number; sunset: number };
  };
  handleGoBack: () => void;
  isCelsius: boolean;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ name, weatherDetails, handleGoBack, isCelsius }) => {
  const theme = useTheme();

  // Helper function to round numbers
  const formatNumber = (value: number, decimals: number) => {
    return Number(value.toFixed(decimals));
  };

  // Use the helper function to get formatted values
  const roundedTemp = formatNumber(weatherDetails.current.temperature2m, 2);
  const roundedApparentTemp = formatNumber(weatherDetails.current.apparentTemperature, 1);
  const roundedPrecipitation = formatNumber(weatherDetails.current.precipitation, 3);
  const roundedPressure = formatNumber(weatherDetails.current.pressureMsl, 3);
  const roundedWind = formatNumber(weatherDetails.current.windSpeed10m, 3);

  // Get the weather description and icon based on the weather code
  const weatherInfo = weatherCodeMapping[weatherDetails.current.weatherCode] || { description: "Unknown", icon: null };

  function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
  }

  return (
    <>
      <Grow in={true} style={{ transformOrigin: "0 0 0" }} {...(true ? { timeout: 400 } : {})}>
        <Box sx={{ maxWidth: 500, mx: "auto", my: 4 }}>
          <Card
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom>
                {name}
              </Typography>

              <Grid container spacing={2}>
                {/* Day and Weather */}
                <Grid size={6}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      {weatherDetails.current.isDay ? <WbSunnyIcon /> : <NightlightIcon />}
                      &nbsp;{isCelsius ? roundedTemp : celsiusToFahrenheit(roundedTemp)} {isCelsius ? "°C" : "°F"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      {weatherInfo.icon}
                      &nbsp;{weatherInfo.description}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ mb: 2.5 }} />

              <Grid container spacing={2}>
                {/* Temp and Humidity */}
                <Grid size={6}>
                  <Box display="flex" alignItems="center">
                    <ThermostatIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Apparent temp: {isCelsius ? roundedApparentTemp : celsiusToFahrenheit(roundedApparentTemp)} {isCelsius ? "°C" : "°F"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box display="flex" alignItems="center">
                    <OpacityIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Humidity: {weatherDetails.current.relativeHumidity2m}%
                    </Typography>
                  </Box>
                </Grid>

                {/* Precipitation and Cloud Cover */}
                <Grid size={6}>
                  <Box display="flex" alignItems="center">
                    <GrainIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Precipitation: {roundedPrecipitation} mm
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box display="flex" alignItems="center">
                    <CloudIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Cloud Cover: {weatherDetails.current.cloudCover}%
                    </Typography>
                  </Box>
                </Grid>

                {/* Pressure and Wind Speed */}
                <Grid size={6}>
                  <Box display="flex" alignItems="center">
                    <CompressIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Pressure: {roundedPressure} hPa
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box display="flex" alignItems="center">
                    <AirIcon />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Wind: {roundedWind} km/h
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>

            {/* Go Back Button */}
            <Button variant="contained" onClick={handleGoBack} sx={{ mt: 2 }}>
              Go Back
            </Button>
          </Card>
        </Box>
      </Grow>
    </>
  );
};

export default WeatherDetails;
