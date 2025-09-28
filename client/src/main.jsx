import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx"; 
import { MotionConfig } from "motion/react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig viewport={{ once: true }}>
        <App />
        <Toaster />
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>
);