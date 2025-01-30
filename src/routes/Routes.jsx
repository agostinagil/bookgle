import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home/Home";
import Dashboard from "../views/Dashboard/Dashboard";
import SingleBook from "../views/SingleBook/SingleBook";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:id" element={<SingleBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
