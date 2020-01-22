import React from "react";
import { useQuery, gql } from '@apollo/client';

const GET_IMAGE_URL = gql`
  query GetImageUrl($imageName: String! $transformOptions: TransformImageOptions) {
    getImageUrl(imageName: $imageName transformOptions: $transformOptions) {
      imageLink
    }
  }
`

function Form(props) {
  const [data, setData] = React.useState({
    name: '',
    height: '',
    width: '',
    crop: ''
  });

  return (
    <div style={{
      height: 300,
      width: 300,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 4,
      alignItems: 'center',
      background: 'white',
      justifyContent: 'center'
    }}>
      <h1>Search an Image!</h1>
      <form
        onSubmit={e => {
          e.preventDefault();

          props.setImageProps(data);
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%'
        }}
      >
        <label>Image Name</label>
        <input type="text" name="imageName" onChange={e => setData({ ...data, name: e.target.value })} />
        <label>Width (only numbers!)</label>
        <input type="number" name="imageWidth" onChange={e => setData({ ...data, width: e.target.value })} />
        <label>Height (only numbers!)</label>
        <input type="number" name="imageHeight" onChange={e => setData({ ...data, height: e.target.value })} />
        <label>Crop value</label>
        <input type="text" name="imageCrop" onChange={e => setData({ ...data, crop: e.target.value })} />
        <button>Search your Cloudinary</button>
      </form>
    </div>
  )
}

function CloudinaryImage(props) {
  const { data, loading, error } = useQuery(GET_IMAGE_URL, {
    variables: {
      imageName: props.imageProps.name,
      transformOptions: {
        width: parseInt(props.imageProps.width),
        height: parseInt(props.imageProps.height),
        crop: props.imageProps.crop
      }
    }
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data && <img src={data.getImageUrl.imageLink} alt="Cloudinary" />}
    </div>
  )
}

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
      <Form setImageProps={setImageProps} />
      {imageProps && <CloudinaryImage imageProps={imageProps} />}
    </div>
  )

}


