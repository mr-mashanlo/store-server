const { Schema, model } = require( 'mongoose' );

const UserModel = new Schema( {
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  role: { type: String, ref: 'Role', default: 'USER' },
  fullname: { type: String, default: '' },
  phone: { type: String, default: '' }
} );

module.exports = model( 'User', UserModel );