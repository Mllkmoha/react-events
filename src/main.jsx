import react from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { injectAnalytics } from "@vercel/analytics";

injectAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
