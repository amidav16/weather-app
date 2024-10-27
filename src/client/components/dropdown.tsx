import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { locations } from "./data";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface BasicSelectProps {
  selectedLocation: Location; // Expects a Location object
  setSelectedLocation: (location: Location) => void; // Expects a Location object
}

export default function BasicSelect({
  selectedLocation,
  setSelectedLocation,
}: BasicSelectProps) {
  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    const selectedName = event.target.value;
    const location = locations.find((loc) => loc.name === selectedName);
    if (location) {
      setSelectedLocation(location); // Pass the Location object
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="dropdown-location-select-label">Location</InputLabel>
        <Select
          labelId="dropdown-location-select-label"
          id="dropdown-location-select"
          value={selectedLocation.name} // Access name directly
          label="Location"
          MenuProps={MenuProps}
          onChange={handleLocationChange}
        >
          {locations.map((loc) => (
            <MenuItem key={loc.name} value={loc.name}>
              {loc.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
