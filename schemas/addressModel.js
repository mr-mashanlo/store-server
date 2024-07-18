const { Schema, model } = require( 'mongoose' );

const AddressModel = new Schema( {
  user: { type: String, ref: 'User' },
  district: { type: String },
  city: { type: String },
  street: { type: String }
} );

module.exports = model( 'Address', AddressModel );