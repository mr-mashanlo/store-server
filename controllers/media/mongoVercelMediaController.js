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
      const filename = `${Date.now()}${fileExtension}`;
      const result = await put( `uploads/${filename}`, buffer, { access: 'public' } );
      const savedFileName = path.basename( result.url );
      const image = await MediaModel.create( { name: savedFileName, alt: '', url: result.url } );
      return res.send( image );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const image = await MediaModel.findOne( { _id: id } );

      if ( !image ) {
        return res.send( { success: false, msg: 'Image not found.' } );
      }

      await del( `uploads/${image.url}` );
      await ProductModel.updateMany( { images: { $in: [ id ] } }, { $pull: { images: id } } );
      await MediaModel.deleteOne( { _id: id } );
      return res.send( { success: true, msg: 'File deleted successfully.' } );
    } catch ( error ) {
      next( error );
    }
  };

};