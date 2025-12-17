import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Layout from "./components/layout";
import Home from "./pages/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
