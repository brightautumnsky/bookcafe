import React, { useState } from "react";
import styled, { css } from "styled-components";

const PaginationWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  width: 300px;
  height: 50px;
  background: #fbd6d2;
  border-radius: 7px;
`;

const StyledSpan = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ number, activeNumber }) =>
    number === activeNumber &&
    css`
      background: white;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    `}
`;

const Pagination = ({ allBooks, booksPerPage, paginate }) => {
  const [activeNumber, setActiveNumber] = useState(1);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(allBooks / booksPerPage); i++) {
    pageNumber.push(i);
  }

  const clickNumber = (number) => {
    paginate(number);
    setActiveNumber(number);
  };

  return (
    <PaginationWrapper>
      {pageNumber.map((number, index) => (
        <StyledSpan
          number={index + 1}
          activeNumber={activeNumber}
          key={index}
          onClick={() => clickNumber(number)}
        >
          {number}
        </StyledSpan>
      ))}
    </PaginationWrapper>
  );
};

export default Pagination;
