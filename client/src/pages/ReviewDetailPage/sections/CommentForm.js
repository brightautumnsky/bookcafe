import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useInputs from "../../../utils/useInputs";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";

const FormWrapper = styled.form`
  display: flex;
  align-items: center;
`;

const initialStates = {
  comment: "",
};

const CommentForm = ({ responseTo, refreshFunction, setReply }) => {
  const [inputs, onChange, onReset] = useInputs(initialStates);
  const { comment } = inputs;
  const user = useSelector((state) => state.users);
  const { id } = useParams();

  const clickButton = (event) => {
    event.preventDefault();

    const body = {
      writer: user.userData._id,
      postId: id,
      content: comment,
      responseTo,
    };

    axios.post("/api/comment/save", body).then((response) => {
      if (response.data.success) {
        refreshFunction(response.data.result);
        setReply(false);
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    });
    onReset();
  };

  return (
    <FormWrapper onSubmit={clickButton}>
      <Textarea
        name="comment"
        onChange={onChange}
        value={comment}
        placeholder="댓글 작성"
        wide
      />
      <Button wide text="등록" />
    </FormWrapper>
  );
};

export default CommentForm;
