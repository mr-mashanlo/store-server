const { Schema, model } = require( 'mongoose' );

const RoleModel = new Schema( {
  title: { type: String, unique: true, default: 'USER' }
} );

module.exports = model( 'Role', RoleModel );