const { gql } = require('apollo-server');

const typeDefs = gql`
  # We can keep adding to this Type with all the different transform options
  input TransformImageOptionsInput {
    width: Int
    height: Int
    crop: String
  }

  input UploadOptionsInput {
    public_id: String
    folder: String
    use_filename: Boolean
    unique_filename: Boolean
    resource_type: String
    type: String
    access_mode: String
    discard_original_filename: Boolean
    overwrite: Boolean
    tags: [TagInput]
    colors: Boolean
    faces: Boolean
    quality_analysis: Boolean
    cinemegraph_analysis: Boolean
    image_metadata: Boolean
    phash: Boolean
    auto_tagging: Boolean
    categorization: [CategoryInput]
  }

  input CategoryInput {
    name: String
  }

  input TagInput {
    tag_name: String!
  }

  type Tag {
    tag_name: String!
  }

  type UploadedImage {
    public_id: String!
    version: String!
    width: Int!
    height: Int!
    format: String!
    created_at: String!
    resource_type: String!
    tags: [Tag]! 
    bytes: Int!
    type: String!
    etag: String!
    url: String!
    secure_url: String!
    signature: String!
    original_filename: String!
  }

  type ImageUrl {
    imageLink: String!
  }

  type Query {
    getImageUrl(imageName: String!, transformOptions: TransformImageOptionsInput): ImageUrl!
  }

  type Mutation {
    uploadImage(file: String! uploadOptions: UploadOptionsInput) : UploadedImage!
  }
`;

module.exports = typeDefs;
