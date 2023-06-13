import React, { FunctionComponent } from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Dashboard from "./pages/Dashboard/Dashboard";

// components
import Header from "./components/Header/Header";

import "./assets/styles/styles.scss";

const App: FunctionComponent = () => {
  return (
    <>
      <div>
        <Header />

        <div className="main-content">
          <div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
