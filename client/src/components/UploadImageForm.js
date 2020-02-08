import React from 'react';
import { useMutation, gql } from '@apollo/client';

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
      }).then(data => props.setUploadedImage(data.data.uploadImage))

    })
    reader.readAsDataURL(file)
  }

  return (
    <div style={container} >
      <div>
        <input type="text" placeholder="Image name" onChange={e => handleChange(e)} />
        <input
          type="file"
          onChange={e => {
            setFileToUpload(e.target.files[0]);
            setFilePreview(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <button onClick={() => onSubmit(fileToUpload, uploadOptions)}> Upload Photo</button>
      </div>
      <div>
        {
          filePreview
            ? <img style={image} src={filePreview} alt="a thing" />
            : <img style={holder} alt="Upload Preview" src="" />
        }
      </div>
    </div>
  )
}

const container = {
  height: 300,
  width: 500,
  border: '2px solid black',
  borderRadius: 3,
  display: 'flex'
};

const image = {
  height: '100%',
  width: '50%'
}

const holder = {
  ...image,
  background: 'lightgray',
  fontSize: 24,
}