const pool = require('../config/db');

const postCart = async (product_id) => {
    return new Promise((resolve, reject) => {
      console.log('Model: add product to cart', product_id);
      pool.query(
        'INSERT INTO basket (product_id) VALUES ($1)',
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
  

const getCart = async () => {
    return new Promise((resolve, reject) => {
        console.log('Model: all product in cart');
        pool.query(
            `SELECT p.product_id, p.photo_product, p.product_name, p.price, k.buying FROM basket k JOIN product p ON k.product_id = p.product_id WHERE buying = FALSE`,
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

const deleteProductInCart = async (product_id) => {
    return new Promise((resolve, reject) => {
        console.log('Model: delete product in cart', product_id);
        pool.query(
            'DELETE FROM basket WHERE product_id = $1',
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

const putStatusProduct = async (product_id) => {
    return new Promise((resolve, reject) => {
        console.log('Model: update status product', product_id);
        pool.query(
            'UPDATE basket SET buying = TRUE WHERE product_id = $1',
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

const myBoughtProduct = async () => {
    return new Promise((resolve, reject) => {
        console.log('Model: my bought product');
        pool.query(
            `SELECT p.product_id, p.photo_product, p.product_name, p.price, k.buying, k.basket_id FROM basket k JOIN product p ON k.product_id = p.product_id WHERE buying = TRUE ORDER BY basket_id DESC`,
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

module.exports = {
    postCart,
    getCart,
    deleteProductInCart,
    putStatusProduct,
    myBoughtProduct
};
