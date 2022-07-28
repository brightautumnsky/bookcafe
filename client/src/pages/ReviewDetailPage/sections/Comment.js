import React from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const CommentWrapper = styled.div`
  & > * > div {
    padding: 12px 0;
  }
`;

const Comment = ({ comments, refreshFunction }) => {
  return (
    <CommentWrapper>
      {comments &&
        comments.map(
          (comment, index) =>
            !comment.responseTo && (
              <div key={index}>
                <SingleComment
                  comment={comment}
                  refreshFunction={refreshFunction}
                />
                <ReplyComment replyId={comment._id} comments={comments} />
              </div>
            )
        )}
      <CommentForm refreshFunction={refreshFunction} />
    </CommentWrapper>
  );
};

export default Comment;
