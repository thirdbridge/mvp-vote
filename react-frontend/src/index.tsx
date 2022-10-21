import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import * as fcl from "@onflow/fcl";
import "./index.css";
import App from "./app";

// FCL initial configs
fcl
  .config()
  // Emulator api
  .put("accessNode.api", "http://localhost:8888")
  // MVPContract address - will overrite in every instance
  .put("0xContractAddress", "0xf8d6e0586b0a20c7");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
