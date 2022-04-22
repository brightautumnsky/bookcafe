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
`;

const Button = ({ text, ...rest }) => {
  return <ButtonWrapper {...rest}>{text}</ButtonWrapper>;
};

export default Button;

ButtonWrapper.defaultProps = {
  size: "small",
  color: "#D3F4FF",
};
