// src/__tests__/Dashboard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../client/components/dashboard";

describe("Dashboard Component", () => {
  test("renders the Dashboard without crashing", () => {
    render(<Dashboard />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test("displays location placeholders", () => {
    render(<Dashboard />);

    // Check for locations without worrying about actual data
    expect(
      screen.getByText(/No data available for Berlin/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No data available for London/i)
    ).toBeInTheDocument();
  });
});
