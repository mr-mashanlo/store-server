const { Schema, model } = require( 'mongoose' );

const OrderModel = new Schema( {
  products: [ { type: String, ref: 'Product' } ]
} );

module.exports = model( 'Order', OrderModel );