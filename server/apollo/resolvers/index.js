const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const resolvers = {
  Query: {
    getImageUrl: (_, { imageName, transformOptions }, ctx) => {
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
    uploadImage: (_, { file, options }) => {
      console.log(file);
      const uploadImage = cloudinary.uploader.upload(file, options, (err, res) => console.log(err, res)).then(data => data);

      console.log(uploadImage);
      return {
        uploadImage
      }
    }
  }
};

module.exports = resolvers;