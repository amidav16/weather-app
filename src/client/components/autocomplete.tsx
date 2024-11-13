import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { locations } from "./data";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface BasicAutocompleteProps {
  selectedLocation: Location; // Expects a Location object
  setSelectedLocation: (location: Location) => void; // Expects a Location object
}

export default function BasicAutocomplete({ selectedLocation, setSelectedLocation }: BasicAutocompleteProps) {
  const handleLocationChange = (event: React.SyntheticEvent, newValue: Location | null) => {
    if (newValue) {
      setSelectedLocation(newValue);
    }
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex", justifyContent: "center" }}>
      <Autocomplete
        options={locations}
        getOptionLabel={(option: Location) => option.name}
        value={selectedLocation}
        onChange={handleLocationChange}
        renderInput={(params) => <TextField {...params} label="Location" variant="outlined" />}
        sx={{ width: 300 }}
      />
    </Box>
  );
}
