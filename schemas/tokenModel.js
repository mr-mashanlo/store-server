const { Schema, model } = require( 'mongoose' );

const TokenModel = new Schema( {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  AToken: { type: String, require: true },
  RToken: { type: String, require: true }
} );

module.exports = model( 'Token', TokenModel );