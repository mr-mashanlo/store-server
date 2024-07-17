const { Schema, model } = require( 'mongoose' );

const ProductModel = new Schema( {
  name: { type: String, require: true },
  price: { type: String, require: true, default: 0 },
  about: { type: String },
  category: { type: String, ref: 'Category', default: 'Default' },
  images: [ { type: String, ref: 'Media' } ]
} );

module.exports = model( 'Product', ProductModel );