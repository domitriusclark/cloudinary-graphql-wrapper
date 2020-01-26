import React from "react";
import CloudinaryImage from './components/CloudinaryImage';
import SearchCloudinaryImageForm from './components/SearchCloudinaryImageForm';
import UploadImageForm from './components/UploadImageForm';

export default function App() {
  const [imageProps, setImageProps] = React.useState();

  return (
    <div style={{
      background: "rebeccapurple",
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around'
    }}>
      <SearchCloudinaryImageForm setImageProps={setImageProps} />
      {imageProps && <CloudinaryImage imageProps={imageProps} />}

      <UploadImageForm />
    </div>
  )
}


