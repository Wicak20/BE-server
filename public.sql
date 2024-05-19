-- Active: 1715775069585@@127.0.0.1@5432@fixtable
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    photo_product VARCHAR(255),
    photo_id VARCHAR(255),
    product_name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL, -- Ubah tipe data harga menjadi NUMERIC dengan presisi 10 digit dan 2 angka di belakang koma
    date_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE basket (
    basket_id SERIAL PRIMARY KEY,
    product_id INT,
    buying BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);






