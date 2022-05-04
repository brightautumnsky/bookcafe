import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import SearchBox from "../components/SearchBox";

const ReviewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  & > div:first-child {
    align-self: flex-end;
    margin-bottom: 30px;
  }
`;

const ReviewBox = styled.div`
  border-bottom: 1px solid darkgray;
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  .review-image {
    flex: 1;
    width: 200px;
    height: 100px;
    overflow-x: scroll;
    display: flex;
    margin-right: 12px;
    img {
      height: 100%;
    }
  }
  .review-title {
    flex: 1;
    width: 200px;
    overflow-y: hidden;
  }
  .review-content {
    flex: 3;
    height: 30px;
    padding-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-y: hidden;
  }
  .review-writer {
    flex: 1;
    text-align: end;
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

const ReviewLoading = styled.div`
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewPage = () => {
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

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

  const clickReview = (reviewId) => {
    navigate(`/review/${reviewId}`);
  };

  if (!review) {
    return <ReviewLoading>로딩중...</ReviewLoading>;
  }

  return (
    <ReviewContainer>
      <SearchBox getSearchPost={getSearchPost} />
      {review.map((item, index) => (
        <ReviewBox key={index} onClick={() => clickReview(item._id)}>
          <div className="review-image">
            {item.image.map((i, index) => (
              <img
                key={index}
                src={`http://localhost:8800/${i}`}
                alt="thumbnail"
              />
            ))}
          </div>
          <div className="review-title">
            <span>{item.title}</span>
          </div>
          <div className="review-content">
            <span>{item.content}</span>
          </div>
          <div className="review-writer">
            <span>{item.username}</span>
          </div>
        </ReviewBox>
      ))}
    </ReviewContainer>
  );
};

export default ReviewPage;
