import React from "react";
import styled from "styled-components";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const ReplyCommentWrapper = styled.div`
  margin-left: 50px;
  padding-top: 0;
  text-align: justify;
  .comment-action {
    width: 200px;
    padding-top: 6px;
    font-size: 13px;
    & > * {
      margin-right: 12px;
      cursor: pointer;
    }
    span {
      color: darkgray;
    }
  }
  @media screen and (max-width: 768px) {
    margin-left: 35px;
  }
`;

const ReplyComment = ({ replyId, comments }) => {
  const user = useSelector((state) => state.users);
  const userId = user.userData._id;

  return (
    <>
      {comments.map(
        (comment, index) =>
          replyId === comment.responseTo && (
            <ReplyCommentWrapper key={index}>
              <div>{comment.writer.name}</div>
              <div>{comment.content}</div>
              <div className="comment-action">
                <FaThumbsUp />
                <FaThumbsDown />
              </div>
            </ReplyCommentWrapper>
          )
      )}
    </>
  );
};

export default ReplyComment;
