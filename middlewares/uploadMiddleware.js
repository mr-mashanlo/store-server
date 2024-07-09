const multer = require( 'multer' );
const path = require( 'path' );
const fs = require( 'fs' );

const uploadsDir = path.join( __dirname, '../uploads/' );
if ( !fs.existsSync( uploadsDir ) ) {
  fs.mkdirSync( uploadsDir, { recursive: true } );
}

const storage = multer.diskStorage( {
  destination: function ( req, file, cb ) {
    cb( null, 'uploads/' );
  },
  filename: function ( req, file, cb ) {
    cb( null, Date.now() + path.extname( file.originalname ) );
  }
} );

const upload = multer( {
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
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