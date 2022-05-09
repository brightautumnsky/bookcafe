import React from "react";
import styled from "styled-components";

const BestBookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .bestbook {
    display: flex;
    border-bottom: 1px solid darkgray;
    margin-bottom: 12px;
    .bestbook-img {
      margin-right: 30px;
      img {
        width: 150px;
      }
    }
    .bestbook-content {
      text-align: justify;
    }
  }
`;

const BestBook = ({ bestBooks, getTitle }) => {
  return (
    <BestBookWrapper>
      {bestBooks.map((book, index) => (
        <div className="bestbook" key={index}>
          <div className="bestbook-img">
            <img src={book.BOOK_IMAGE_URL} alt="bookImage" />
          </div>
          <div className="bestbook-content">
            <p>도서명: {getTitle(book.BOOK_NM_INFO)}</p>
            <p>저자: {book.AUTHOR_NM_INFO}</p>
            <p>출간일: {book.PUBLCATN_YY}</p>
          </div>
        </div>
      ))}
    </BestBookWrapper>
  );
};

export default BestBook;
