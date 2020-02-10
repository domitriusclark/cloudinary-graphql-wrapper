/** @jsx jsx  */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';

const UPLOAD_IMAGE_TO_CLOUDINARY = gql`
  mutation UploadImageToCloudinary($file: String! $uploadOptions: UploadOptionsInput){
    uploadImage(file: $file uploadOptions: $uploadOptions) {
      public_id
      url
      tags {
        tag_name
      }
    }
  }
`

export default function UploadImageForm(props) {
  const [uploadImage] = useMutation(UPLOAD_IMAGE_TO_CLOUDINARY)

  const [uploadOptions, setUploadOptions] = React.useState({});
  const [fileToUpload, setFileToUpload] = React.useState({});
  const [filePreview, setFilePreview] = React.useState();
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  function onDrop(acceptedFiles) {
    setFileToUpload(acceptedFiles[0]);
    setFilePreview(URL.createObjectURL(acceptedFiles[0]));
  }

  function handleChange(e) {
    setUploadOptions({
      ...uploadOptions,
      public_id: e.target.value
    });
  }

  function onSubmit(file, options) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploadImage({
        variables: {
          file: reader.result,
          uploadOptions: options
        }
      }).then(data => {
        setUploadSuccess(true);
        props.setUploadedImage(data.data.uploadImage)
      })
    })
    reader.readAsDataURL(file)
  }

  const container = css`
    color: white;
    width: 490px;
    height: 400px;
    background: #393751;
    border: none;
    box-shadow: 5px 8px 26px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    & h1 {
      font-size: 32px;
      letter-spacing: 2px;
    }
  `


  const dropzone = css`
    width: 379px;
    height: 191px;
    background: ${filePreview ? `url(${filePreview}) no-repeat` : '#2F2E45'};
    background-size: cover;
    border: 1px dashed #FFFFFF;
    box-sizing: border - box;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const dropzoneText = css`
    color: white;
    font-size: 16px;
  `

  const textInput = css`
    width: 379px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    padding-left: 8px;
  `

  const uploadButton = css`
    width: 370px;
    height: 35px;
    background: #7A61DF;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border: none;
    box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.4);
  `

  return (
    <div css={container}>
      <h1>Upload to Cloudinary</h1>
      {
        uploadSuccess && <p css={css`
          color: lightgreen;
        `}>
          Successfully Uploaded!
        </p>
      }
      <input css={textInput} type="text" placeholder="Title" onChange={e => handleChange(e)} />
      <div css={dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <p css={dropzoneText}>Choose file to upload...</p>
      </div>
      <button css={uploadButton} onClick={() => onSubmit(fileToUpload, uploadOptions)}> Upload Photo</button>
    </div>
  );
};