import React, { useState } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import axios from "axios";

const DropzoneWrapper = styled.div`
  display: flex;
  & > div {
    margin-right: 50px;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    & > div {
      margin-bottom: 20px;
    }
  }
`;

const DropWrapper = styled.div`
  width: 220px;
  height: 220px;
  border: 1px solid skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;
  span {
    text-align: center;
    font-size: 50px;
    color: darkgray;
  }
  @media screen and (max-width: 767px) {
    width: 20px;
    height: 20px;
    span {
      font-size: 20px;
    }
  }
`;

const PrevBox = styled.div`
  width: 350px;
  height: 220px;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  border: 1px solid skyblue;
  box-sizing: border-box;
  img {
    height: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 220px;
    height: 100px;
  }
`;

const StyledDropzone = ({ getImages }) => {
  const [images, setImages] = useState([]);

  const dropFiles = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/post/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...images, response.data.filePath]);
        getImages([...images, response.data.filePath]);
      } else {
        alert("파일 저장에 실패했습니다.");
      }
    });
  };

  const deleteFile = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    getImages(newImages);
  };

  return (
    <DropzoneWrapper>
      <DropWrapper>
        <Dropzone onDrop={dropFiles}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <span>+</span>
              </div>
            </section>
          )}
        </Dropzone>
      </DropWrapper>
      <PrevBox>
        {images.map((image, index) => (
          <div onClick={() => deleteFile(image)} key={index}>
            <img
              src={`http://localhost:8800/${image}`}
              alt={`prev${index + 1}`}
            />
          </div>
        ))}
      </PrevBox>
    </DropzoneWrapper>
  );
};

export default StyledDropzone;
