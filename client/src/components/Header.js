import React from "react";
import styled from "styled-components";
import Button from "./Button";

const HeaderWrapper = styled.div`
  color: #5a5a5a;
  line-height: 24px;
  height: 42px;
  padding: 6px 0;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.1);

  .header-container {
    height: inherit;
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 100px;
  }
  .header-menu {
    flex: 1;
    ul {
      display: flex;
      list-style: none;
      li {
        padding: 0 16px;
      }
    }
  }
  .header-btn {
    & > * {
      margin-left: 7px;
    }
  }
`;

const Header = ({ text }) => {
  return (
    <HeaderWrapper>
      <div className="header-container">
        <div className="header-title">{text}</div>
        <div className="header-menu">
          <ul>
            <li>
              <span>글쓰기</span>
            </li>
            <li>
              <span>인기도서</span>
            </li>
            <li>
              <span>리뷰</span>
            </li>
            <li>
              <span>인기글</span>
            </li>
            <li>
              <span>동영상</span>
            </li>
            <li>
              <span>북마크</span>
            </li>
          </ul>
        </div>
        <div className="header-btn">
          <Button text="회원가입" color="#FBD6D2" outline />
          <Button text="로그인" color="#D3F4FF" outline />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
