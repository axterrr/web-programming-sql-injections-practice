CREATE TABLE client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE product (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     description VARCHAR(1000) NOT NULL,
     price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_ (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE SET NULL
);

CREATE TABLE order_product (
   id INT AUTO_INCREMENT PRIMARY KEY,
   product_id INT NULL,
   order_id INT NOT NULL,
   quantity INT NOT NULL,
   total_price DECIMAL(10, 2) NOT NULL,
   FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE SET NULL,
   FOREIGN KEY (order_id) REFERENCES order_(id) ON DELETE CASCADE
);
