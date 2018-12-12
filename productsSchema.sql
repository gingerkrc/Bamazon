DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);


INSERT INTO Products(product_name, department_name, price, stock_quantity)
VALUES ("A Mighty Wind","DVDs", 9.99, 100),
    ("Capitol Rock", "BOOKS", 12.99, 200),
    ("Nose Frida","HEALTH", 15.99, 50), 
    ("Banana", "GROCERY", .25, 800),
    ("Camper Van", "OUTDOORS", 50000, 10);
    
SELECT * FROM Products;