import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Devices from "./pages/Devices/Devices";
import Installations from "./pages/Installations/Installations";
import { Button } from "@mui/material";
import ServiceVisits from "./pages/ServiceVisits/ServiceVisits";
import Contracts from "./pages/Contracts/Contracts";
function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        <Button component={Link} to="/" variant="outlined">
          Devices
        </Button>
        <Button component={Link} to="/installations" variant="outlined">
          Installations
        </Button>
        <Button component={Link} to="/visits" variant="outlined">
          Service Visits
        </Button>
        <Button component={Link} to="/contracts" variant="outlined">
          Contracts
        </Button>
      </div>
      <Routes>
        <Route path="/" element={<Devices />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/visits" element={<ServiceVisits />} />
        <Route path="/contracts" element={<Contracts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
