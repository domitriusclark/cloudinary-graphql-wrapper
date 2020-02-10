/** @jsx jsx */
import React from "react";
import { css, jsx } from '@emotion/core';
import CloudinaryImage from './components/CloudinaryImage';
import SearchCloudinaryImageForm from './components/SearchCloudinaryImageForm';
import UploadImageForm from './components/UploadImageForm';

export default function App() {
  const [imageProps, setImageProps] = React.useState();
  const [uploadedImage, setUploadedImage] = React.useState();

  console.log(uploadedImage);

  const appStyles = css`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: #2B2A38;
    overflow: scroll;
  `;

  return (
    <div css={appStyles}>
      <div css={css`
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        padding-top: 50px;
      `}>
        <SearchCloudinaryImageForm setImageProps={setImageProps} />
        <UploadImageForm setUploadedImage={setUploadedImage} />
      </div>
      {imageProps && <CloudinaryImage imageProps={imageProps} />}

    </div>
  )
};


