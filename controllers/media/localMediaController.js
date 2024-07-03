const path = require( 'path' );
const fs = require( 'fs' );

module.exports = class LocalMediaController {

  upload = ( req, res, next ) => {
    try {
      if ( !req.file ) {
        return res.status( 400 ).send( 'No file uploaded.' );
      }
      const fileURL = `${req.protocol}://${req.get( 'host' )}/uploads/${req.file.filename}`;
      console.log( fileURL );
      res.send( { msg: `File uploaded: ${req.file.filename}` } );
    } catch ( error ) {
      next( error );
    }
  };

  delete = ( req, res, next ) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join( __dirname, '../../uploads/', filename );
      fs.unlink( filePath, ( err ) => {
        if ( err ) {
          return res.status( 400 ).send( 'File not found.' );
        }
        res.send( { msg: `File ${filename} deleted successfully.` } );
      } );
    } catch ( error ) {
      next( error );
    }
  };

};