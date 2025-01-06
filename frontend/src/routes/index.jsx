import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import ImobiList from "../pages/ImobiList";
import ImobiDetails from "../components/ImovelDetail";
import PropertyPage from "../pages/Admin/PropertyPage";
import Error from "../pages/Error";
import Login from "../pages/Admin/components/Login";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useAppContext } from "../context/AppContext";

const RouterApp = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imoveis" element={<ImobiList />} />
        <Route path="/imoveis/:id" element={<ImobiDetails />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/imoveis"
          element={
            isAuthenticated ? (
              <PropertyPage />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
        <Route path="/erro" element={<Error />} />
        <Route path="*" element={<Navigate to="/erro" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default RouterApp;
