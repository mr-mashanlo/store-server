const { Schema, model } = require( 'mongoose' );

const CategoryModel = new Schema( {
  title: { type: String, unique: true, default: 'Default' },
  slug: { type: String, unique: true, default: 'default' }
} );

module.exports = model( 'Category', CategoryModel );