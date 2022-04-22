import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UploadReviewPage from "./components/UploadPage/UploadReviewPage";
import Auth from "./hoc/auth";

function App() {
  const HocUploadReviewPage = Auth(UploadReviewPage, false);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/upload/review" element={<HocUploadReviewPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
