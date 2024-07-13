const path = require( 'path' );
const fs = require( 'fs' );
const MediaModel = require( '../../schemas/mediaModel' );

module.exports = class MongoMediaController {

  get = async ( req, res, next ) => {
    try {
      const images = await MediaModel.find().sort( { _id: -1 } );
      res.send( images );
    } catch ( error ) {
      next( error );
    }
  };

  upload = async ( req, res, next ) => {
    try {
      if ( !req.file ) {
        return res.status( 400 ).send( 'No file uploaded.' );
      }
      const fileURL = `${req.protocol}://${req.get( 'host' )}/uploads/${req.file.filename}`;
      await MediaModel.create( { name: req.file.filename, alt: '', url: fileURL } );
      res.send( { success: true, msg: `File uploaded: ${req.file.filename}` } );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join( __dirname, '../../uploads/', filename );
      await MediaModel.deleteOne( { name: filename } );
      fs.unlink( filePath, ( err ) => {
        if ( err ) {
          return res.status( 400 ).send( 'File not found.' );
        }
        res.send( { success: true, msg: `File ${filename} deleted successfully.` } );
      } );
    } catch ( error ) {
      next( error );
    }
  };

};