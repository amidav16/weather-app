import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

interface WeatherCardProps {
  locationName: string;
  temperature: number;
  humidity: number;
  onClick: () => void; // Function to handle click
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  locationName,
  temperature,
  humidity,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 300, cursor: "pointer" }} onClick={onClick}>
      <Card
        variant="outlined"
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "grey.800" : "grey.200",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Temperature: {temperature} °C
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
