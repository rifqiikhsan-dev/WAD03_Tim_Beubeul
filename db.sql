-- ============================
-- CREATE DATABASE & USE IT
-- ============================

-- Jalankan ini di psql jika perlu membuat database baru:
-- CREATE DATABASE my_app_db;
-- \c my_app_db;

-- ============================
-- DROP EXISTING TABLES (jika perlu reset)
-- ============================
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- ============================
-- TABLE: users
-- ============================
CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(10) CHECK (role IN ('buyer', 'seller')) NOT NULL
);

INSERT INTO users (username, name, email, role) VALUES
('aditp', 'Adit Praditia', 'aditp@mail.com', 'buyer'),
('budiw', 'Budi Wibowo', 'budiw@mail.com', 'seller');

-- ============================
-- TABLE: products
-- ============================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    productName VARCHAR(100) NOT NULL,
    productCategory VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    owner VARCHAR(50),
    FOREIGN KEY (owner) REFERENCES users(username)
);

INSERT INTO products (id, productName, productCategory, price, owner) VALUES
(1, 'Laptop ASUS ROG', 'Electronics', 20000000, 'budiw'),
(2, 'Sepatu Nike Air', 'Fashion', 1500000, 'budiw'),
(3, 'Meja Belajar Kayu', 'Furniture', 750000, 'budiw');

-- ============================
-- TABLE: carts
-- ============================
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    FOREIGN KEY (username) REFERENCES users(username)
);

INSERT INTO carts (username) VALUES
('aditp'),
('budiw');

-- ============================
-- TABLE: cart_items
-- ============================
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INT,
    product_id INT,
    qty INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Ambil ID cart berdasarkan username (karena SERIAL auto increment)
-- Misalnya aditp = 1, budiw = 2
INSERT INTO cart_items (cart_id, product_id, qty) VALUES
(1, 1, 2), -- aditp beli 2 laptop
(1, 2, 1), -- aditp beli 1 sepatu
(2, 3, 3); -- budiw beli 3 meja
