const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const resolvers = {
  Query: {
    getImageUrl: (_, { imageName, transformOptions }) => {
      let result = ''
      if (transformOptions) {
        result = cloudinary.url(imageName, { ...transformOptions });
      } else {
        result = cloudinary.url(imageName);
      }
      return {
        imageLink: result
      }
    }
  },
  Mutation: {
    uploadImage: (_, { file, uploadOptions }) => cloudinary.uploader.upload(file, uploadOptions)
  }
};

module.exports = resolvers;