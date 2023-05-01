import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

// domian
// dev-r6mt78wqer7jfb0a.eu.auth0.com
// client ID
// rbbfqV9UVkzUsqfV5r4w9pPZD3hkqrMs
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Auth0Provider
    domain="dev-r6mt78wqer7jfb0a.eu.auth0.com"
    clientId="rbbfqV9UVkzUsqfV5r4w9pPZD3hkqrMs"
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <GithubProvider>
      <App />
    </GithubProvider>
  </Auth0Provider>
);
