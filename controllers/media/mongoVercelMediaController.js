const { put, del } = require( '@vercel/blob' );
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
      const { buffer } = req.file;
      const fileName = Date.now();
      await put( `uploads/${fileName}`, buffer, { access: 'public' } );
      return res.send( { success: true, msg: 'File uploaded' } );
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