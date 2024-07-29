const multer = require( 'multer' );
const path = require( 'path' );

const storage = multer.diskStorage( {
  destination: function ( req, file, cb ) {
    cb( null, 'uploads/' );
  },
  filename: function ( req, file, cb ) {
    cb( null, Date.now() + path.extname( file.originalname ).toLowerCase() );
  }
} );

const upload = multer( {
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: ( req, file, cb ) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test( file.mimetype );
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase() );

    if ( mimetype && extname ) {
      return cb( null, true );
    } else {
      cb( 'Error: File upload only supports the following filetypes - ' + filetypes );
    }
  }
} );

const uploadSingleImage = upload.single( 'image' );

module.exports = uploadSingleImage;