import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return <LoadingWrapper>로딩중...</LoadingWrapper>;
};

export default Loading;
