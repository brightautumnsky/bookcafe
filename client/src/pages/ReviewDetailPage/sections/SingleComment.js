import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import CommentForm from "./CommentForm";

const SingleCommentWrapper = styled.div`
  .comment-action {
    width: 200px;
    padding-top: 6px;
    font-size: 13px;
    text-align: justify;
    & > * {
      margin-right: 12px;
      cursor: pointer;
    }
    span {
      color: darkgray;
    }
  }
`;

const SingleComment = ({ comment, refreshFunction }) => {
  const user = useSelector((state) => state.users);
  const [reply, setReply] = useState(false);

  const clickReply = () => {
    setReply(!reply);
  };

  return (
    <SingleCommentWrapper>
      <div>{comment.writer.name}</div>
      <div>{comment.content}</div>
      <div className="comment-action">
        <FaThumbsUp />
        <FaThumbsDown />
        <span onClick={clickReply}>reply to</span>
      </div>
      <div>
        {reply && (
          <CommentForm
            refreshFunction={refreshFunction}
            responseTo={comment._id}
            setReply={setReply}
          />
        )}
      </div>
    </SingleCommentWrapper>
  );
};

export default SingleComment;
