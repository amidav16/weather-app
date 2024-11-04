// src/__tests__/WeatherCard.test.tsx
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCard from "../client/components/card";

describe("WeatherCard Component", () => {
  const mockOnClick = jest.fn();

  const defaultProps = {
    locationName: "Berlin",
    isCelsius: true,
    temperature: 22.567, // for rounding check
    humidity: 55,
    onClick: mockOnClick,
  };

  test("renders the WeatherCard component with correct data", () => {
    render(<WeatherCard {...defaultProps} />);

    // Check that the location name is displayed
    expect(screen.getByText("Berlin")).toBeInTheDocument();

    // Check that the temperature is rounded and displayed with the correct unit
    expect(screen.getByText(/Temperature: 22.57 °C/i)).toBeInTheDocument();

    // Check that the humidity is displayed correctly
    expect(screen.getByText(/Humidity: 55%/i)).toBeInTheDocument();
  });

  test("displays temperature in Fahrenheit when isCelsius is false", () => {
    render(<WeatherCard {...defaultProps} isCelsius={false} temperature={72.123} />);

    // Check for Fahrenheit display
    expect(screen.getByText(/Temperature: 72.12 °F/i)).toBeInTheDocument();
  });

  test("calls onClick handler when the card is clicked", () => {
    render(<WeatherCard {...defaultProps} />);

    // Simulate clicking on the card
    fireEvent.click(screen.getByRole("button"));

    // Verify that the onClick handler was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
