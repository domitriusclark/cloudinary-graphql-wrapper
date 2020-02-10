/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

export default function SearchCloudinaryImageForm(props) {
  const [data, setData] = React.useState({
    name: '',
    height: '',
    width: '',
    crop: ''
  });

  const container = css`
    color: white;
    width: 490px;
    height: 400px;
    background: #393751;
    border: none;
    box-shadow: 5px 8px 26px rgba(0, 0, 0, 0.4);
    border-radius: 8;
    display: flex;
    flex-direction: column;
    align-items: center;
    

    & h1 {
      font-size: 32px;
      letter-spacing: 2px;
      margin-top: 20px;
    }
  `

  const textInput = css`
    width: 356px;
    height: 30px;
    background: #FFFFFF;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    padding-left: 8px;
  `;

  const searchButton = css`
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
      <h1>Search your Media</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          props.setImageProps(data);
        }}
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-evenly;

          & label {
            font-size: 14px;
            display: flex;
            flex-direction: column;
          }
        `}
      >
        <label>
          Image Name
          <input css={textInput} type="text" name="imageName" onChange={e => setData({ ...data, name: e.target.value })} />
        </label>

        <label>
          Width (only numbers!)
          <input type="number" name="imageWidth" onChange={e => setData({ ...data, width: e.target.value })} />
        </label>

        <label>
          Height (only numbers!)
          <input type="number" name="imageHeight" onChange={e => setData({ ...data, height: e.target.value })} />
        </label>

        <label>
          Crop value
          <input css={textInput} type="text" name="imageCrop" onChange={e => setData({ ...data, crop: e.target.value })} />
        </label>

        <button css={searchButton}>Search your Cloudinary</button>
      </form>
    </div>
  )
}