import React from 'react';

export default function SearchCloudinaryImageForm(props) {
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