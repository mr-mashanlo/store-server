const CategoryController = require( './categoryController' );
const MongoCategoryController = require( './mongoCategoryController' );

const mongoCategoryController = new MongoCategoryController();
const categoryController = new CategoryController( mongoCategoryController );

module.exports = categoryController;