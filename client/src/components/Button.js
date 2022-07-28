import React from "react";
import styled, { css } from "styled-components";

const sizeType = {
  small: {
    width: "100px",
    height: "30px",
  },
  medium: {
    width: "130px",
    height: "35px",
  },
  large: {
    width: "150px",
    height: "39px",
  },
  full: {
    width: "100%",
    height: "39px",
  },
};

const ButtonWrapper = styled.button`
  border: none;
  cursor: pointer;

  ${({ color, size }) =>
    size &&
    css`
      background: ${color};
      width: ${sizeType[size].width};
      height: ${sizeType[size].height};
    `}

  ${({ outline }) =>
    outline &&
    css`
      border-radius: 5px;
      color: white;
      font-weight: 800;
      &:hover {
        background: gray;
      }
    `}

  ${({ wide }) =>
    wide &&
    css`
      color: black;
      height: 51px;
      width: 60px;
      margin-left: 12px;
      background: transparent;
      border: 1px solid black;
    `}
 
    @media screen and (max-width: 768px) {
    width: 60px;
    height: 25px;
  }
`;

const Button = ({ text, ...rest }) => {
  return <ButtonWrapper {...rest}>{text}</ButtonWrapper>;
};

export default Button;

ButtonWrapper.defaultProps = {
  size: "small",
  color: "#D3F4FF",
};
