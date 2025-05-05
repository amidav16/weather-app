import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import WeatherIcon from "../../assets/cloud-computing.png";

import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

import { saveIsCelsius, loadIsCelsius } from "./localstorageutils";
import Dashboard from "./dashboard";

import Background from "../../assets/Background.jpg";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
function DemoPageContent({ pathname, navigate, isCelsius }: { pathname: string; navigate: (path: string | URL) => void; isCelsius: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname.startsWith("/dashboard") ? (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${Background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.07, // Transparency level for the background
              backgroundBlendMode: "multiply",

              zIndex: -1, // Ensures the background stays behind the content
            }}
          />
          <Dashboard isCelsius={isCelsius} />
        </>
      ) : null}

      {pathname.startsWith("/orders") ? (
        <>
          <Typography>
            <p>Dashboard content for {pathname}</p>
          </Typography>
          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Button onClick={() => navigate("/orders/1")}>Order 1</Button>
            <Button onClick={() => navigate("/orders/2")}>Order 2</Button>
            <Button onClick={() => navigate("/orders/3")}>Order 3</Button>
          </Stack>
        </>
      ) : null}
    </Box>
  );
}

interface ToggleProps {
  isCelsius: boolean;
  handleChange: () => void;
}

const ToggleIsCelsius: React.FC<ToggleProps> = ({ isCelsius, handleChange }) => {
  return (
    <IconButton onClick={handleChange} aria-label="isCelsius">
      <ThermostatIcon sx={{ color: isCelsius ? "#42a5f5" : "" }} />
    </IconButton>
  );
};

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutPattern(props: DemoProps) {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const handleChange = () => {
    setIsCelsius((p) => !p);
    saveIsCelsius(!isCelsius);
  };

  useEffect(() => {
    const savedData = loadIsCelsius();
    setIsCelsius(savedData);
  }, []);

  const { window } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      branding={{
        title: "Weather App",
        logo: <img src={WeatherIcon} alt="Weather App Icon" style={{ width: 30, height: 30, margin: 5 }} />, // Add your custom icon here
      }}
      navigation={[
        {
          segment: "dashboard",
          title: "Dashboard",
          icon: <DashboardIcon />,
        },
        {
          segment: "orders",
          title: "Orders",
          icon: <ShoppingCartIcon />,
          pattern: "orders{/:orderId}*",
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout slots={{ toolbarActions: () => <ToggleIsCelsius isCelsius={isCelsius} handleChange={handleChange} /> }}>
        <DemoPageContent pathname={router.pathname} navigate={router.navigate} isCelsius={isCelsius} />
      </DashboardLayout>
    </AppProvider>
  );
}
