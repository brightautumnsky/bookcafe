import React from "react";
import styled from "styled-components";
import useInputs from "../../utils/useInputs";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";

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
};

const UploadReviewPage = () => {
  const [inputs, onChange, reset] = useInputs(initialState);
  const { title, writer, content, date } = inputs;

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ title, writer, content, date });
    reset();
  };

  return (
    <div>
      <UploadForm>
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
        <Button text="등록" onClick={submitForm} />
      </UploadForm>
    </div>
  );
};

export default React.memo(UploadReviewPage);
