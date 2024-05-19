const { postProduct, getProduct, getProductById, putProduct, deleteProductById } = require('../model/produkModel');
const cloudinary = require('../config/cloudinary');

const produkController = {
  addProduct: async (req, res) => {
    try {
      const { product_name, price } = req.body;
      let post = {
        product_name: product_name,
        price: price,
      };
      if (req.file) {
        const result_up = await cloudinary.uploader.upload(req.file.path, {
          folder: 'file-upload',
        });
        post.photo_product = result_up.secure_url;
        post.photo_id = result_up.public_id;
      }

      const result = await postProduct(post);
      if (result.insertId > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Post product success!',
          data: result.insertId,
        });
      }
    } catch (error) {
      console.error('Post product error!', error.message);
      return res.status(500).json({ status: 500, message: 'Post product failed!', error: error.message });
    }
  },

  showProduct: async (req, res) => {
    try {
      const result = await getProduct();
      if (result.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Get product success!',
          data: result,
        });
      } else {
        return res.status(404).json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get all product', error.message);
      return res.status(500).json({ status: 500, message: 'Get product failed!', error: error.message });
    }
  },

  spesificProduct: async (req, res) => {
    try {
      const { id } = req.params;
      // if (!id || id <= 0 || isNaN(id)) {
      //   return res.status(404).json({ "message": "id wrong" });
      // }
      // let dataProductId = await getProductById(parseInt(id))
      // if (!dataProductId.rows[0]) {
      //   return res.status(200).json({ "status": 200, "message": "get data recipe not found", data: [] })
      // }
      // return res.status(200).json({ "status": 200, "message": "get data recipe success", data: dataProductId.rows[0] })
      const result = await getProductById(id);
      if (result[0]) {
        return res.status(200).json({
          status: 200,
          message: 'Get product detail success!',
          data: result,
        });
      } else {
        return res.status(404).json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get detail product', error.message);
      return res.status(500).json({ status: 500, message: 'Get detail product failed!', error: error.message });
    }
  },
  
  editProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { product_name, price } = req.body;

      const data = await getProductById(id);
      if (!data[0]) {
        return res.status(404).json({ status: 404, message: 'Data not found!' });
      }
      let result_up = null;

      if (req.file) {
        result_up = await cloudinary.uploader.upload(req.file.path, {
          folder: 'file-upload',
        });
        await cloudinary.uploader.destroy(data[0].photo_id);
      }

      let post = {
        product_id: id,
        product_name: product_name || data[0].product_name,
        price: price || data[0].price,
      };

      if (result_up) {
        // Jika gambar baru diupload, update properti photo
        post.photo_product = result_up.secure_url;
        post.photo_id = result_up.public_id;
      } else {
        post.photo_product = data[0].photo_product;
        post.photo_id = data[0].photo_id;
      }

      const result = await putProduct(post);
      if (result.changedRows > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Edit product success!',
          data: result.changedRows,
        });
      }
    } catch (error) {
      console.error('Error when update product', error.message);
      return res.status(500).json({ status: 500, message: 'Update product failed!', error: error.message });
    }
  },
  
   deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await getProductById(id);
      if (data[0]) {
        await cloudinary.uploader.destroy(data[0].photo_id);
      }
  
      const result = await deleteProductById(id);
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Delete product success!',
          data: result.rowCount,
        });
      } else {
        return res.status(404).json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when delete product', error.message);
      return res.status(500).json({ status: 500, message: 'Delete product failed!', error: error.message });
    }
  }
};

module.exports = produkController;

