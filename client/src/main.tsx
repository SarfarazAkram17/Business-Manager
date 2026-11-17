import { createRoot } from "react-dom/client";
import App from "./App";
import { setBaseUrl } from "@/api";
import { API_URL } from "@/lib/config";
import "./index.css";

setBaseUrl(API_URL || null);

createRoot(document.getElementById("root")!).render(<App />);
