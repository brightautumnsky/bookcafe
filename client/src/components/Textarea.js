import React from "react";
import styled, { css } from "styled-components";

const TextareaWrapper = styled.textarea`
  width: 50%;
  height: 350px;
  font-size: 13px;
  border: 1px solid skyblue;
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: darkgray;
    font-size: 12px;
  }
  ${({ wide }) =>
    wide &&
    css`
      width: 50vw;
      height: 50px;
      border: 1px solid black;
      box-sizing: border-box;
    `}
`;

const Textarea = ({ text, ...rest }) => {
  return <TextareaWrapper placeholder={text} {...rest} />;
};

export default React.memo(Textarea);
