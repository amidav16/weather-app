import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/notfound";
import Navbar from "./components/navbar";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
