import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { useTheme } from "@mui/material/styles";

interface WeatherCardProps {
  locationName: string;
  isCelsius: boolean;
  temperature: number;
  humidity: number;
  onClick: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ locationName, isCelsius, temperature, humidity, onClick }) => {
  const theme = useTheme();

  const roundedTemp = Number(temperature?.toFixed(2));

  return (
    <Box
      sx={{ minWidth: 300, cursor: "pointer" }}
      role="button" // Add this line
      onClick={onClick}
      tabIndex={0} // Optional: make it focusable for better accessibility
    >
      <Card
        variant="outlined"
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200",
        }}
      >
        <CardContent>
          <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
            Temperature: {roundedTemp} {isCelsius ? "°C" : "°F"}
          </Typography>
          <Typography variant="h4" component="div">
            {locationName}
          </Typography>
          <Typography variant="body2">
            Humidity: {humidity}%
            <br />
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

export default WeatherCard;
