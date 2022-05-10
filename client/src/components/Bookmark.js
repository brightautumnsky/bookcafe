import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const BookmarkWrapper = styled.div`
  justify-content: flex-end;
  .bookmark {
    font-size: 50px;
    cursor: pointer;
  }
  span {
    align-self: flex-end;
    margin-bottom: 5px;
    flex: 1;
    font-size: 13px;
  }
  ${({ bookmarked }) => {
    const color = bookmarked;
    return css`
      .bookmark {
        color: ${color};
      }
    `;
  }}
`;

const Bookmark = ({ id, postTitle }) => {
  const [bookmarkNumber, setBookmarkNumber] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const user = useSelector((state) => state.users);

  const clickBookmark = () => {
    if (!user.userData._id) {
      return alert("로그인 후 이용하실 수 있습니다.");
    }

    let body = {
      postId: id,
      userFrom: user.userData._id,
      postTitle,
    };

    if (bookmarked) {
      axios.post("/api/bookmark/delete", body).then((response) => {
        if (response.data.success) {
          setBookmarkNumber(bookmarkNumber - 1);
          setBookmarked(!bookmarked);
        } else {
          console.log("북마크 리스트 삭제에 실패했습니다.");
        }
      });
    } else {
      axios.post("/api/bookmark/add", body).then((response) => {
        if (response.data.success) {
          setBookmarkNumber(bookmarkNumber + 1);
          setBookmarked(!bookmarked);
        } else {
          console.log("북마크 리스트 추가에 실패했습니다.");
        }
      });
    }
  };

  useEffect(() => {
    let body = {
      postId: id,
      userFrom: user.userData._id,
    };

    axios.post("/api/bookmark/bookmarkNumber", body).then((response) => {
      if (response.data.success) {
        setBookmarkNumber(response.data.bookmarkNumber);
      } else {
        console.log("북마크 정보를 불러오는데 실패했습니다.");
      }
    });

    axios.post("/api/bookmark/bookmarked", body).then((response) => {
      if (response.data) {
        setBookmarked(response.data.bookmarked);
      } else {
        console.log("북마크 정보를 불러오는데 실패했습니다.");
      }
    });
  }, []);
  return (
    <BookmarkWrapper bookmarked={bookmarked ? "red" : "darkgray"}>
      <span>{bookmarkNumber}명의 회원에게 북마크 된 게시글입니다</span>
      <FaBookmark className="bookmark" onClick={clickBookmark} />
    </BookmarkWrapper>
  );
};

export default Bookmark;
