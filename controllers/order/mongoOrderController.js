const OrderModel = require( '../../schemas/orderModel' );

module.exports = class MongoOrderController {

  getAll = async ( req, res, next ) => {
    try {
      const orders = await OrderModel.find().populate( 'products.product' );
      return res.send( orders );
    } catch ( error ) {
      next( error );
    }
  };

  getOne = async ( req, res, next ) => {
    try {
      const myID = req.me.id;
      const userID = req.params.id;
      const order = await OrderModel.findOne( { _id: userID || myID } ).populate( 'product' );
      return res.send( order );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const user = req.me.id;
      const products = req.body.products;
      const order = await OrderModel.create( { user, products } );
      return res.send( order );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const updates = req.body.updates;
      await OrderModel.updateOne( { _id: id }, { $set: { ...updates } } );
      return res.send( { success: true, msg: 'Updated' } );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      await OrderModel.deleteOne( { _id: id } );
      return res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};