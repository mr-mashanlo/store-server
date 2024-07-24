const { Schema, model } = require( 'mongoose' );

const OrderModel = new Schema( {
  user: { type: String, ref: 'User' },
  address: { type: String, ref: 'Address' },
  products: [ { product: { type: String, ref: 'Product' }, quantity: { type: Number, default: 1 } } ],
  status: { type: String, default: 'Processing' }
} );

module.exports = model( 'Order', OrderModel );