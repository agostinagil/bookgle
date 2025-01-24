import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home/Home";
import Dashboard from "../views/Dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
