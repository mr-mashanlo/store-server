const { put, del } = require( '@vercel/blob' );
const path = require( 'path' );
const MediaModel = require( '../../schemas/mediaModel' );
const ProductModel = require( '../../schemas/productModel' );

module.exports = class MongoVercelMediaController {

  getAll = async ( req, res, next ) => {
    try {
      const images = await MediaModel.find().sort( { _id: -1 } );
      return res.send( images );
    } catch ( error ) {
      next( error );
    }
  };

  upload = async ( req, res, next ) => {
    try {
      const { buffer, originalname } = req.file;
      const fileExtension = path.extname( originalname ).toLowerCase();
      const filename = `${Date.now()}.${fileExtension}`;
      const result = await put( `uploads/${filename}`, buffer, { access: 'public' } );
      const image = await MediaModel.create( { name: filename, alt: '', url: result.url } );
      return res.send( image );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const { filename } = req.body;
      await del( `uploads/${filename}` );
      await ProductModel.updateMany( { images: { $in: [ process.env.BACK_URL + filename ] } }, { $pull: { images: process.env.BACK_URL + filename } } );
      await MediaModel.deleteOne( { name: filename } );
      return res.send( { success: true, msg: `File ${filename} deleted successfully.` } );
    } catch ( error ) {
      next( error );
    }
  };

};