import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

import Grid from "@mui/material/Grid2";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { useTheme } from "@mui/material/styles";

interface WeatherDetailsProps {
  name: string;
  weatherDetails: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    cloud_cover: number;
    pressure_msl: number;
    wind_speed_10m: number;
    is_day: number;
  };
  handleGoBack: () => void;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  name,
  weatherDetails,
  handleGoBack,
}) => {
  const theme = useTheme();
  return (
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
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            {weatherDetails.is_day ? <WbSunnyIcon /> : <NightlightIcon />}
            &nbsp;{weatherDetails.temperature_2m} °C
          </Typography>

          <Grid container spacing={2}>
            {/* Temp and Humidity */}
            <Grid size={6}>
              <Box display="flex" alignItems="center">
                <ThermostatIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Apparent temp: {weatherDetails.apparent_temperature} °C
                </Typography>
              </Box>
            </Grid>
            <Grid size={6}>
              <Box display="flex" alignItems="center">
                <OpacityIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Humidity: {weatherDetails.relative_humidity_2m}%
                </Typography>
              </Box>
            </Grid>

            {/* Precipitation and Cloud Cover */}
            <Grid size={6}>
              <Box display="flex" alignItems="center">
                <OpacityIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Precipitation: {weatherDetails.precipitation} mm
                </Typography>
              </Box>
            </Grid>
            <Grid size={6}>
              <Box display="flex" alignItems="center">
                <OpacityIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Cloud Cover: {weatherDetails.cloud_cover}%
                </Typography>
              </Box>
            </Grid>

            {/* Pressure and Wind Speed */}
            <Grid size={6}>
              <Box display="flex" alignItems="center">
                <ThermostatIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Pressure: {weatherDetails.pressure_msl} hPa
                </Typography>
              </Box>
            </Grid>
            <Grid size={6}>
              <Box display="flex" alignItems="center">
                <AirIcon />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  Wind: {weatherDetails.wind_speed_10m} km/h
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
  );
};

export default WeatherDetails;
