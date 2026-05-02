import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./components/AuthContext";
import { ToastProvider } from "./components/ToastContext";
import { TradingModeProvider } from "./components/TradingModeContext";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <TradingModeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TradingModeProvider>
    </ToastProvider>
  </React.StrictMode>
);
