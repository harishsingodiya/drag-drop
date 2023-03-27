import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initDB } from "./server";

//we can conditionally call this based on development or production, may be we can store an env or use NODE_ENV
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}
initDB()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);