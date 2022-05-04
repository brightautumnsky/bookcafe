import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useInputs from "../../utils/useInputs";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import StyledDropzone from "../../components/StyledDropzone";

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  .upload-box {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 12px;
    }
  }
  & > * {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    .upload-textarea {
      width: 100%;
    }
  }
`;

const initialState = {
  title: "",
  writer: "",
  date: "",
  content: "",
  image: "",
};

const UploadReviewPage = (props) => {
  const [inputs, onChange, reset] = useInputs(initialState);
  const { title, writer, content, date } = inputs;
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (!title || !writer || !content || !date || !images) {
      return alert("모든 값을 입력해주세요.");
    }

    const body = {
      title,
      writer,
      content,
      date,
      image: images,
      username: props.user.login.username,
    };
    axios.post("/api/post/upload", body).then((response) => {
      if (response.data.success) {
        alert("포스팅에 성공했습니다.");
        navigate("/");
      } else {
        alert("포스팅에 실패했습니다.");
      }
    });

    reset();
  };

  const getImages = (imgArr) => {
    setImages(imgArr);
  };

  return (
    <div>
      <UploadForm onSubmit={submitForm}>
        <div className="upload-box">
          <StyledDropzone getImages={getImages} />
        </div>
        <div className="upload-box">
          <label>도서명</label>
          <Input name="title" onChange={onChange} text="도서명" value={title} />
        </div>
        <div className="upload-box">
          <label>저자</label>
          <Input name="writer" onChange={onChange} text="저자" value={writer} />
        </div>
        <div className="upload-box">
          <label>읽은 날짜</label>
          <Input name="date" onChange={onChange} type="date" value={date} />
        </div>
        <div className="upload-box">
          <label>리뷰</label>
          <Textarea
            className="upload-textarea"
            name="content"
            onChange={onChange}
            text="리뷰"
            value={content}
          />
        </div>
        <Button type="submit" text="등록" />
      </UploadForm>
    </div>
  );
};

export default React.memo(UploadReviewPage);
