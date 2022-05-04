import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import SearchBox from "../components/SearchBox";

const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const ReviewBox = styled.div`
  border-bottom: 1px solid darkgray;
  display: flex;
  align-items: center;
  padding: 12px 0;
  .review-image {
    flex: 1;
    width: 200px;
    height: 100px;
    overflow-x: scroll;
    display: flex;
    margin-right: 12px;
    img {
      width: 100%;
    }
  }
  .review-title {
    flex: 1;
    width: 200px;
    overflow-y: hidden;
  }
  .review-content {
    flex: 3;
    overflow-y: hidden;
  }
  .review-writer {
    flex: 1;
  }

  @media screen and (max-width: 767px) {
    .review-title {
      width: 200px;
      overflow-y: hidden;
    }
    .review-content,
    .review-writer {
      display: none;
    }
  }
`;

const ReviewPage = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios.post("/api/post/getAllPost").then((response) => {
      if (response.data.success) {
        setReview(response.data.allPost);
      } else {
        alert("리뷰를 가져오는 데 실패했습니다.");
      }
    });
  }, []);

  const getSearchPost = (keywordPost) => {
    setReview(keywordPost);
  };

  return (
    <ReviewContainer>
      <SearchBox getSearchPost={getSearchPost} />
      {review.map((item, index) => (
        <ReviewBox key={index}>
          <div className="review-image">
            {item.image.map((i, index) => (
              <img key={index} src={`http://localhost:8800/${i}`} />
            ))}
          </div>
          <div className="review-title">{item.title}</div>
          <div className="review-content">{item.content}</div>
          <div className="review-writer">{item.username}</div>
        </ReviewBox>
      ))}
    </ReviewContainer>
  );
};

export default ReviewPage;
