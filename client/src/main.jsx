import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { CompareProvider } from "./context/compare.context";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <CompareProvider>

            <App />

        </CompareProvider>

        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#1f2937",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "15px",
                },
                success: {
                    iconTheme: {
                        primary: "#22c55e",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#fff",
                    },
                },
            }}
        />

    </React.StrictMode>

);