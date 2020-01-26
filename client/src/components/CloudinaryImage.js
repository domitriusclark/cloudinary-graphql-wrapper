import React from 'react';
import { useQuery, gql } from "@apollo/client";

const GET_IMAGE_URL = gql`
  query GetImageUrl($imageName: String! $transformOptions: TransformImageOptions) {
    getImageUrl(imageName: $imageName transformOptions: $transformOptions) {
      imageLink
    }
  }
`

export default function CloudinaryImage(props) {
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