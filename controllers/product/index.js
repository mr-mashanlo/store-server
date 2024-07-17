const ProductController = require( './productController' );
const MongoProductController = require( './mongoProductController' );

const mongoProductController = new MongoProductController();
const productController = new ProductController( mongoProductController );

module.exports = productController;