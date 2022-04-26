import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./hoc/auth";
import Header from "./components/Header";
import UploadReviewPage from "./pages/UploadPage/UploadReviewPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage/MainPage";
import Footer from "./components/Footer";

function App() {
  const HocUploadReviewPage = Auth(UploadReviewPage, null);
  const HocLoginPage = Auth(LoginPage, null);
  const HocRegisterPage = Auth(RegisterPage, null);
  return (
    <BrowserRouter>
      <div className="App">
        <Header text="책마을" />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/upload/review" element={<HocUploadReviewPage />} />
            <Route path="/login" element={<HocLoginPage />} />
            <Route path="/register" element={<HocRegisterPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
