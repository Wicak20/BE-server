const pool = require('../config/db');

const postProduct = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('Model: add product', data);
    const { photo_product, photo_id, product_name, price } = data;
    pool.query(
      `INSERT INTO product (photo_product, photo_id, product_name, price) VALUES ($1, $2, $3, $4)`,
      [photo_product, photo_id, product_name, price],
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getProduct = async () => {
  return new Promise((resolve, reject) => {
    console.log('Model: get all product');
    pool.query(
      `SELECT * FROM product ORDER BY date_at DESC`,
      (err, results) => {
        if (!err) {
          resolve(results.rows);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getProductById = async (product_id) => {
  return new Promise((resolve, reject) => {
    console.log('Model: get spesific product');
    pool.query(
      `SELECT * FROM product WHERE product_id = $1`,
      [product_id],
      (err, results) => {
        if (!err) {
          resolve(results.rows);
        } else {
          reject(err);
        }
      }
    );
  });
};

const putProduct = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('Model: update product');
    const { photo_product, photo_id, product_name, price, product_id } = data;
    pool.query(
      `UPDATE product 
       SET photo_product = $1, photo_id = $2, product_name = $3, price = $4 
       WHERE product_id = $5`,
      [photo_product, photo_id, product_name, price, product_id],
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteProductById = async (product_id) => {
  return new Promise((resolve, reject) => {
    console.log('Model: deleting specific product');
    pool.query(
      'DELETE FROM product WHERE product_id = $1',
      [product_id],
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(err);
        }
      }
    );
  });
};


module.exports = {
  postProduct,
  getProduct,
  getProductById,
  putProduct,
  deleteProductById
};

