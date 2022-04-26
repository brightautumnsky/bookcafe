import React from "react";
import MainUpload from "./MainUpload";
import MainVideo from "./MainVideo";
import MainBest from "./MainBest";
import MainReview from "./MainReview";
import MainLike from "./MainLike";

const MainPage = () => {
  return (
    <div>
      <MainUpload />
      <MainVideo />
      <MainBest />
      <MainReview />
      <MainLike />
    </div>
  );
};

export default MainPage;
