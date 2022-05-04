import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Input from "./Input";
import useInputs from "../utils/useInputs";
import axios from "axios";

const SearchBoxWrapper = styled.div`
  width: 200px;
  height: 35px;
  display: flex;
  align-items: center;
  & > :first-child {
    margin-right: 12px;
  }
`;

const initialState = {
  keyword: "",
};

const SearchBox = ({ getSearchPost }) => {
  const [inputs, onChange] = useInputs(initialState);
  const { keyword } = inputs;

  const searchKeyword = () => {
    let body = {
      searchTerm: keyword,
    };

    axios.post("/api/post/getAllPost", body).then((response) => {
      if (response.data.success) {
        getSearchPost(response.data.allPost);
      } else {
        alert("검색에 실패했습니다.");
      }
    });
  };

  return (
    <SearchBoxWrapper>
      <Input name="keyword" size="medium" value={keyword} onChange={onChange} />
      <FaSearch
        style={{ color: "skyblue", cursor: "pointer" }}
        onClick={searchKeyword}
      />
    </SearchBoxWrapper>
  );
};

export default SearchBox;
