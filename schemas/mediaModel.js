const { Schema, model } = require( 'mongoose' );

const MediaModel = new Schema( {
  name: { type: String, unique: true },
  alt: { type: String },
  url: { type: String }
} );

module.exports = model( 'Media', MediaModel );