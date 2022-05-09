import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookmarkBox = styled.div`
  display: flex;
  flex-direction: column;
  .bookmark {
    padding: 12px;
    cursor: pointer;
    border-bottom: 1px solid darkgray;
  }
  .bookmark-empty {
    height: 500px;
    line-height: 500px;
    text-align: center;
  }
`;

const BookmarkLoading = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookmarkPage = () => {
  const user = useSelector((state) => state.users);
  const [bookmarkList, setBookmarkList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = user.userData && user.userData._id;

    let body = {
      userFrom: userId,
    };
    axios.post("/api/bookmark/getAll", body).then((response) => {
      if (response.data.success) {
        setBookmarkList(response.data.bookmarkList);
      } else {
        console.log("북마크를 불러오는 데 실패했습니다");
      }
    });
  }, [user]);

  const clickBookmark = (postId) => {
    navigate(`/review/${postId}`);
  };

  if (!bookmarkList) {
    return <BookmarkLoading>로딩중...</BookmarkLoading>;
  }

  return (
    <BookmarkBox>
      <h2>북마크 목록</h2>
      {bookmarkList.length === 0 ? (
        <div className="bookmark-empty">북마크 된 포스트가 없습니다.</div>
      ) : (
        bookmarkList.map((bookmark, index) => (
          <div
            key={index}
            className="bookmark"
            onClick={() => clickBookmark(bookmark.postId)}
          >
            <div>{bookmark.postTitle}</div>
          </div>
        ))
      )}
    </BookmarkBox>
  );
};

export default BookmarkPage;
