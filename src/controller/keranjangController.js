const { postCart, getCart, deleteProductInCart, putStatusProduct, myBoughtProduct } = require('../model/keranjangModel');

const keranjangController = {
    addCart: async (req, res) => {
        try {
          const { id } = req.params;
          if (!id) {
            return res.status(400).json({ status: 400, message: 'Need a product id!' });
          }
          const result = await postCart(id);
          if (result && result.insertId) {
            return res.status(200).json({
              status: 200,
              message: 'Added to cart successfully!',
              data: result.insertId,
            });
          } else {
            return res.status(500).json({ status: 500, message: 'Failed to add to cart!' });
          }
        } catch (error) {
          console.error('Error adding to cart!', error.message);
          return res.status(500).json({ status: 500, message: 'Failed to add to cart!' });
        }
    },
      

  showCart: async (req, res) => {
      try {
          const result = await getCart();
          if (result && result.length > 0) {
              return res.status(200).json({
                  status: 200,
                  message: 'Cart retrieved successfully!',
                  data: result,
              });
          } else {
              return res.status(404).json({ status: 404, message: 'Cart is empty!' });
          }
      } catch (error) {
          console.error('Error retrieving cart!', error.message);
          return res.status(500).json({ status: 500, message: 'Failed to retrieve cart!' });
      }
  },

  deleteCartProduct: async (req, res) => {
      try {
          const { id } = req.params;
          if (!id) {
              return res.status(400).json({ status: 400, message: 'Need a product id in cart!' });
          }
          const result = await deleteProductInCart(id);
          if (result && result.affectedRows > 0) {
              return res.status(200).json({
                  status: 200,
                  message: 'Deleted product from cart successfully!',
                  data: result.affectedRows,
              });
          } else {
              return res.status(404).json({ status: 404, message: 'Product not found in cart!' });
          }
      } catch (error) {
          console.error('Error deleting product from cart!', error.message);
          return res.status(500).json({ status: 500, message: 'Failed to delete product from cart!' });
      }
  },

  updateStatus: async (req, res) => {
      try {
          const { id } = req.params;
          if (!id) {
              return res.status(400).json({ status: 400, message: 'Need a product id in cart!' });
          }
          const result = await putStatusProduct(id);
          if (result && result.changedRows > 0) {
              return res.status(200).json({
                  status: 200,
                  message: 'Updated product status successfully!',
                  data: result.changedRows,
              });
          } else {
              return res.status(404).json({ status: 404, message: 'Product not found in cart!' });
          }
      } catch (error) {
          console.error('Error updating product status!', error.message);
          return res.status(500).json({ status: 500, message: 'Failed to update product status!' });
      }
  },

  showMyBought: async (req, res) => {
      try {
          const result = await myBoughtProduct();
          if (result && result.length > 0) {
              return res.status(200).json({
                  status: 200,
                  message: 'Purchase history retrieved successfully!',
                  data: result,
              });
          } else {
              return res.status(404).json({ status: 404, message: 'No purchase history found!' });
          }
      } catch (error) {
          console.error('Error retrieving purchase history!', error.message);
          return res.status(500).json({ status: 500, message: 'Failed to retrieve purchase history!' });
      }
  }
};

module.exports = keranjangController;
