const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Koreksi pada nama variabel
    api_key: process.env.CLOUDINARY_API_KEY, // Koreksi pada nama variabel
    api_secret: process.env.CLOUDINARY_API_SECRET // Koreksi pada nama variabel
});

module.exports = cloudinary;
