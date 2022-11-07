import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getAppConfig, loadAppConfig, setAppConfig } from "./AppConfig";
import { Alert } from "@mui/material";

// Load external configuration file before render
loadAppConfig()
    .then((appConfig) => setAppConfig(appConfig))
    .then(() => renderApp())
    .catch((e) => renderCriticalError("Load configuration error: " + e.message));

function renderApp() {
    const appConfig = getAppConfig();

    if (appConfig.isDebug) {
        console.log(JSON.stringify(appConfig, undefined, 1));
    }

    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

    root.render(
        <React.StrictMode>
            <App id="app" appConfig={appConfig} />
        </React.StrictMode>
    );

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals(console.log);
}

function renderCriticalError(message: string) {
    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

    root.render(
        <React.StrictMode>
            <Alert severity="error">{message}</Alert>
        </React.StrictMode>
    );
}
