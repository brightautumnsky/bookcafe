import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import Bookmark from "../../components/Bookmark";
import Loading from "../../components/Loading";
import Comment from "./sections/Comment";

const ReviewDetailWrapper = styled.div`
  & > div:not(:last-child) {
    display: flex;
    border-bottom: 1px solid darkgray;
    align-items: center;
    span {
      width: 50px;
      text-align: end;
      padding: 0 6px;
    }
  }
  .detail-img {
    height: 300px;
    padding: 20px 0;
    img {
      margin: 0 auto;
      height: 100%;
      overflow-x: scroll;
    }
  }
  .detail-content {
    padding: 20px 12px 0;
    p {
      text-align: justify;
    }
  }
  .detail-comment {
    padding-left: 10px;
  }
`;

const ReviewDetailPage = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/post/get_by_id?id=${id}&type=single`).then((response) => {
      if (response.data) {
        setReview(response.data[0]);
      } else {
        alert("리뷰를 불러오는 데 실패했습니다.");
      }
    });

    const body = {
      postId: id,
    };

    axios.post("/api/comment/getComments", body).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("댓글을 불러오는 데 실패했습니다.");
      }
    });
  }, [id]);

  const refreshFunction = (newComment) => {
    setComments(comments.concat(newComment));
  };

  if (!review) {
    return <Loading />;
  }
  return (
    <div>
      {review && (
        <ReviewDetailWrapper>
          <Bookmark id={id} postTitle={review.title} />
          <div className="detail-username">
            <span>작성자:</span>
            <p>{review.username}</p>
          </div>
          <div className="detail-date">
            <span>작성일:</span>
            <p>{review.date}</p>
          </div>
          <div className="detail-img">
            {review.image.map((img, index) => (
              <img
                src={`http://localhost:8800/${img}`}
                key={index}
                alt="detailImg"
              />
            ))}
          </div>
          <div className="detail-title">
            <span>도서명:</span>
            <p>{review.title}</p>
          </div>
          <div className="detail-writer">
            <span>작가명:</span>
            <p>{review.writer}</p>
          </div>
          <div className="detail-content">
            <p>{review.content}</p>
          </div>
          <div className="detail-comment">
            <p>댓글</p>
            <Comment
              id={id}
              comments={comments}
              refreshFunction={refreshFunction}
            />
          </div>
        </ReviewDetailWrapper>
      )}
    </div>
  );
};

export default ReviewDetailPage;
