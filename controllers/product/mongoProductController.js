const ProductModel = require( '../../schemas/productModel' );

module.exports = class MongoProductController {

  getAll = async ( req, res, next ) => {
    try {
      const products = await ProductModel.find().populate( 'category' ).populate( 'images' );
      return res.send( products );
    } catch ( error ) {
      next( error );
    }
  };

  getOne = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.findOne( { _id: id } ).populate( 'category' ).populate( 'images' );
      return res.send( product );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const product = req.body.product;
      const createdProduct = await ProductModel.create( product );
      return res.send( createdProduct );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const updates = req.body.updates;
      const product = await ProductModel.findOneAndUpdate( { _id: id }, { $set: { ...updates } }, { new: true } );
      return res.send( product );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      await ProductModel.deleteOne( { _id: id } );
      return res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};