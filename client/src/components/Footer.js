import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  background: #ececec;
  padding: 25px 0 12px 0;
  .footer-container {
    max-width: 1200px;
    padding: 0 100px;
    margin: 0 auto;
  }
  .footer-menu {
    ul {
      padding: 0;
      li {
        margin-right: 12px;
      }
    }
  }
  .footer-description {
    text-align: center;
    span {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 768px) {
    .footer-container {
      padding: 0 20px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer-container">
        <div className="footer-title">책마을</div>
        <div className="footer-menu">
          <ul>
            <li>포트폴리오 사이트</li>
            <li>깃허브</li>
          </ul>
        </div>
        <div className="footer-description">
          <span>brightautumnsky.21</span>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
