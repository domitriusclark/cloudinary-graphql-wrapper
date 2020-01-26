import React, { Fragment } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';

const UPLOAD_IMAGE_TO_CLOUDINARY = gql`
  mutation UploadImageToCloudinary($file: FileInput! $uploadOptions: UploadOptionsInput){
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
  const [files, setFiles] = React.useState([]);
  const [uploadImage] = useMutation(UPLOAD_IMAGE_TO_CLOUDINARY)
  const onDrop = acceptedFiles => {
    console.log(acceptedFiles[0])
    uploadImage({
      variables: {
        file: acceptedFiles[0]
      }
    }).then(data => console.log(data));
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{
      height: 200,
      width: 200,
      border: '2px solid black',
      borderRadius: 3
    }}>
      <input {...getInputProps()} />
      {
        isDragActive ? <p>Drop the files here</p> : <p>Drag 'n' drop some files here, or click to select files</p>
      }
      {
        files.length > 0 && (
          <Fragment>
            <h3>Previews</h3>
            {files.map(file => {
              return <img alt="Preview" key={file.preview} src={file.path} />
            })}
          </Fragment>
        )
      }
    </div>
  )
}