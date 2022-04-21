import React from "react";
import styled from "styled-components";

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
  }
`;

const Textarea = ({ text, ...rest }) => {
  return <TextareaWrapper placeholder={text} {...rest} />;
};

export default Textarea;
