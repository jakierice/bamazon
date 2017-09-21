CREATE DATABASE IF NOT EXISTS bamazon_db;
USE bamazon_db;

CREATE TABLE IF NOT EXISTS products(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(4,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
("Computer Mouse", "Electronics", 16.89, 200),
("Soft White Light Bulbs", "Home", 20.99, 150),
("TV Tray", "Home and Kitchen", 33.99, 50),
("Socks", "Apparel", 4.99, 150),
("Bluetooth Headset", "Electronics", 25.69, 100),
("Coffee Mug", "Home and Kitchen", 3.25, 400),
("Keurig Instant Brew Coffee Machine", "Home and Kitchen", "72.99", 80),
("White T-shirts", "Apparel", 10.99, 150),
("Men's Underwear", "Apparel", 8.99, 150),
("Paper Plates", "Home and Kitchen", 4.99, 300);
