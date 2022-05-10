import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import BestBook from "./sections/BestBook";
import Pagination from "./sections/Pagination";

const BestBooksPage = () => {
  const [bestBooks, setBestBooks] = useState(null);
  const [loading, setLoading] = useState(null);
  const [booksPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * booksPerPage;
  const indexOFirst = indexOfLast - booksPerPage;

  const currentBooks = (books) => {
    let currentBooks = 0;
    currentBooks = books.slice(indexOFirst, indexOfLast);
    return currentBooks;
  };

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
      <Pagination
        booksPerPage={booksPerPage}
        allBooks={bestBooks && bestBooks.length}
        paginate={setCurrentPage}
      />
      {bestBooks && (
        <BestBook bestBooks={currentBooks(bestBooks)} getTitle={getTitle} />
      )}
    </div>
  );
};

export default BestBooksPage;
