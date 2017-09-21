const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'evaunit2',
	database: 'bamazon_db'
});

connection.connect((err) => {
	if (err) {
		console.log("ERROR:", err);
		return;
	}
	showDepartments();
});

var showDepartments = () => {
	connection.query('SELECT DISTINCT department_name FROM products', (err, results, fields) => {
		if (err) throw err;

		var departments = ['All Products'];

		for (var i = 0; i < results.length; i++) {
			departments.push(results[i].department_name);
		};

		chooseDepartment(departments);
	});
};

var chooseDepartment = (departments) => {
	inquirer.prompt([
		{
			type: 'list',
			name: 'department',
			message: 'Choose which department that you would like to shop in.',
			choices: departments
		}
	]).then((answers) => {
		if (answers.department === 'All Products') {
			showAllProducts();
		} else {
			showProductByDepartment(answers.department);
		};
	});
};

var showAllProducts = () => {
	connection.query('SELECT * FROM products', (err, results, fields) => {
		selectProduct(results);
	});
};

var showProductByDepartment = (departmentName) => {
	connection.query('SELECT * FROM products WHERE department_name = ?', [departmentName], (err, results) => {
		selectProduct(results);
	});
};

var selectProduct = (results) => {
	var products = [];
	for (var i = 0; i < results.length; i++) {
		products.push(results[i].product_name);
	};
	inquirer.prompt([
		{
			type: 'list',
			name: 'product',
			message: 'Please select the product that you would like to purhcase.',
			choices: products
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to purchase?'
		}
	]).then((answers) => {
		checkout(answers.product, answers.quantity);
	});
};

var checkout = (product, quantity) => {
	connection.query('SELECT * FROM products WHERE product_name = ?', [product], (err, results) => {
		if (results[0].stock_quantity > 0) {
			var orderTotal = Math.round((results[0].price * quantity) * 100) / 100;
			console.log(`Your order total will be $${orderTotal}`);
			updateStock(results[0].id, parseInt(quantity));
		} else {
			console.log('OUT OF STOCK');
			console.log('----------------------------------------');
			inquireContinueShopping();
		}
	});
};

var updateStock = (id, quantity) => {
	connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?', [quantity, id], (err, results) => {
		if (err) throw err;
		inquireContinueShopping();
	});
};

var inquireContinueShopping = () => {
	inquirer.prompt([
		{
			type: 'list',
			name: 'continue',
			message: 'Would you like to keep shopping?',
			choices: ['YES', 'NO']
		}
	]).then((answers) => {
		if (answers.continue === 'YES') {
			showDepartments();
		} else {
			process.exit(0);
		};
	});
};