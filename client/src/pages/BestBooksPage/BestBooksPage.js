import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import BestBook from "./sections/BestBook";

const BestBooksPage = () => {
  const [bestBooks, setBestBooks] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://openapi.gg.go.kr/Poplitloanbook?type=json&key=8adfcb058b8243098663692fefdda49e"
        );
        setBestBooks(response.data.Poplitloanbook[1].row);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const getTitle = (info) => {
    const title =
      info.indexOf(":") > 0 ? info.substring(0, info.indexOf(":")) : info;
    return title;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>
        {new Date().getFullYear()}년 {new Date().getMonth() + 1}월 인기 도서
      </h2>
      <h4>경기도 도서관 인기 도서 100권 목록입니다</h4>
      {bestBooks && <BestBook bestBooks={bestBooks} getTitle={getTitle} />}
    </div>
  );
};

export default BestBooksPage;
