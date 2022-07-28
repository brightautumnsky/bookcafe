import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./hoc/auth";
import Header from "./components/Header";
import UploadReviewPage from "./pages/UploadPage/UploadReviewPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage/MainPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewDetailPage from "./pages/ReviewDetailPage/ReviewDetailPage";
import BookmarkPage from "./pages/BookmarkPage";
import BestBooksPage from "./pages/BestBooksPage/BestBooksPage";
import Footer from "./components/Footer";

function App() {
  const HocUploadReviewPage = Auth(UploadReviewPage, true);
  const HocLoginPage = Auth(LoginPage, false);
  const HocRegisterPage = Auth(RegisterPage, false);
  const HocReviewPage = Auth(ReviewPage, null);
  const HocReviewDetailPage = Auth(ReviewDetailPage, null);
  const HocBookmarkPage = Auth(BookmarkPage, true);
  const HocBestBooksPage = Auth(BestBooksPage, null);

  return (
    <Router>
      <Header text="책마을" />
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/upload/review" element={<HocUploadReviewPage />} />
            <Route path="/login" element={<HocLoginPage />} />
            <Route path="/register" element={<HocRegisterPage />} />
            <Route path="/review" element={<HocReviewPage />} />
            <Route path="/review/:id" element={<HocReviewDetailPage />} />
            <Route path="/bookmark" element={<HocBookmarkPage />} />
            <Route path="/bestbooks" element={<HocBestBooksPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
