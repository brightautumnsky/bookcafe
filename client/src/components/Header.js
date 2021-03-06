import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../_actions/users";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "./Button";
import StyledLink from "./StyledLink";
import { FaEllipsisH } from "react-icons/fa";

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
      li {
        padding: 0 16px;
        span {
          cursor: pointer;
        }
      }
    }
  }
  .header-menu-mobile {
    display: none;
  }
  .header-btn-box {
    display: flex;
    & > * {
      margin-left: 7px;
    }
  }

  @media screen and (max-width: 1024px) {
    .header-container {
      padding: 0 20px;
    }
    .header-btn-box {
    }
  }
  @media screen and (max-width: 767px) {
    .header-container {
      justify-content: space-between;
    }
    .header-menu,
    .header-btn-box {
      display: none;
    }
    .header-menu-mobile {
      display: block;
    }
  }
`;

const SubMenu = styled.div`
  position: absolute;
  top: 52px;
  left: 0;
  width: 100%;
  height: 200px;
  background: white;
  box-sizing: border-box;
  padding: 0 20px;
  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
    li {
      margin-bottom: 6px;
    }
  }
`;

const Header = ({ text }) => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    window.localStorage.getItem("userId")
  );

  useEffect(() => {
    let userId = user.userData && user.userData._id;
    if (userId) {
      setCurrentUser(userId);
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  const closeSubMenu = () => {
    setActive(false);
  };

  const clickLogout = () => {
    dispatch(logout()).then((response) => {
      if (!response.payload.success) {
        console.log(response.payload.e);
        alert("??????????????? ??????????????????.");
      }
      window.localStorage.removeItem("userId");
      setCurrentUser(null);
      alert("??????????????? ??????????????????.");
    });
  };

  return (
    <HeaderWrapper>
      <div className="header-container">
        <div className="header-title">
          <StyledLink to="/">{text}</StyledLink>
        </div>
        <div className="header-menu">
          <ul>
            <li>
              <StyledLink to="/upload/review">
                <span>?????????</span>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/bestbooks">
                <span>????????????</span>
              </StyledLink>
            </li>
            <li>
              <StyledLink to="/review">
                <span>??????</span>
              </StyledLink>
            </li>
            <li>
              <span>?????????</span>
            </li>
            <li>
              <span>?????????</span>
            </li>
            <li>
              <StyledLink to="/bookmark" onClick={closeSubMenu}>
                <span>?????????</span>
              </StyledLink>
            </li>
          </ul>
        </div>

        {!currentUser ? (
          <div className="header-btn-box">
            <Link to="/register">
              <Button text="????????????" color="#FBD6D2" outline />
            </Link>
            <Link to="/login">
              <Button text="?????????" color="#D3F4FF" outline />
            </Link>
          </div>
        ) : (
          <div className="header-btn-box">
            <Link to="/">
              <Button
                text="????????????"
                color="#ececec"
                outline
                onClick={clickLogout}
              />
            </Link>
          </div>
        )}

        <div className="header-menu-mobile">
          <FaEllipsisH
            onClick={() => {
              setActive(!active);
            }}
          />
          {active && (
            <SubMenu>
              <ul>
                <li>
                  <StyledLink to="/upload/review" onClick={closeSubMenu}>
                    <span>?????????</span>
                  </StyledLink>
                </li>
                <li>
                  <StyledLink to="/bestbooks">
                    <span>????????????</span>
                  </StyledLink>
                </li>
                <li>
                  <StyledLink to="/review" onClick={closeSubMenu}>
                    <span>??????</span>
                  </StyledLink>
                </li>
                <li>
                  <span>?????????</span>
                </li>
                <li>
                  <span>?????????</span>
                </li>
                <li>
                  <StyledLink to="/bookmark" onClick={closeSubMenu}>
                    <span>?????????</span>
                  </StyledLink>
                </li>
              </ul>
            </SubMenu>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
