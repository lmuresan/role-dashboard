import React, { FunctionComponent } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const Root: FunctionComponent = () => (
  <>
    <div className="react-app">
      <App />
    </div>
  </>
);

const domNode: HTMLElement | null = document.getElementById("root");

if (domNode) {
  const root = createRoot(domNode);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </React.StrictMode>
  );
}
