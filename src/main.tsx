import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ now we're using App.tsx for flow

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
