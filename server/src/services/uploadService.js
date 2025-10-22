const cloudinary = require('../config/cloudinary');

// Upload image to Cloudinary
exports.uploadImage = async (imageBase64, folder = 'uploads') => {
  try {
    const result = await cloudinary.uploader.upload(imageBase64, {
      folder: `icap2025/${folder}`,
      resource_type: 'auto',
      transformation: [
        { width: 500, height: 500, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    return result;
  } catch (error) {
    throw new Error('Error uploading image to Cloudinary');
  }
};

// Delete image from Cloudinary
exports.deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Error deleting image from Cloudinary');
  }
};