const ProductModel = require( '../../schemas/productModel' );

module.exports = class MongoProductController {

  getAll = async ( req, res, next ) => {
    try {
      const products = await ProductModel.find();
      res.send( products );
    } catch ( error ) {
      next( error );
    }
  };

  getOne = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const product = await ProductModel.findOne( { _id: id } );
      res.send( product );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const product = req.body.product;
      await ProductModel.create( product );
      res.send( { success: true, msg: 'Created' } );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const updates = req.body.updates;
      await ProductModel.updateOne( { _id: id }, { $set: { ...updates } } );
      res.send( { success: true, msg: 'Updated' } );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      await ProductModel.deleteOne( { _id: id } );
      res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};