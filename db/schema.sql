DROP DATABASE IF EXISTS reverb_clone;

CREATE DATABASE reverb_clone;

\c reverb_clone;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    price INT NOT NULL,
    brand VARCHAR(15),
    model VARCHAR(15),
    description TEXT,
    condition VARCHAR(10) NOT NULL
);