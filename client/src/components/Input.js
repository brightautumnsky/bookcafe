import React from "react";
import styled, { css } from "styled-components";

const sizeType = {
  small: {
    width: "170px",
    height: "25px",
  },
  medium: {
    width: "210px",
    height: "32px",
  },
  large: {
    width: "235px",
    height: "39px",
  },
  full: {
    width: "100%",
    height: "39px",
  },
};

const InputWrapper = styled.input`
  border: 1px solid skyblue;
  font-size: 13px;
  box-sizing: border-box;

  ${({ size }) =>
    size &&
    css`
      width: ${sizeType[size].width};
      height: ${sizeType[size].height};
    `}
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: darkgray;
    font-size: 12px;
  }
`;

const Input = ({ text, ...rest }) => {
  return <InputWrapper placeholder={text} {...rest} />;
};

export default React.memo(Input);

InputWrapper.defaultProps = {
  size: "small",
};
