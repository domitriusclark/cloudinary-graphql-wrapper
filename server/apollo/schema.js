const { gql } = require('apollo-server');

const typeDefs = gql`
  type ImageUrl {
    imageLink: String!
  }

  input TransformImageOptions {
    width: Int
    height: Int
    crop: String
  }

  type Query {
    getImageUrl(imageName: String!, transformOptions: TransformImageOptions): ImageUrl!
  }
`;

module.exports = typeDefs;