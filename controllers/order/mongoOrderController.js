const OrderModel = require( '../../schemas/orderModel' );
const AddressModel = require( '../../schemas/addressModel' );

module.exports = class MongoOrderController {

  getAll = async ( req, res, next ) => {
    try {
      const orders = await OrderModel.find().populate( { path: 'products.product', populate: { path: 'images' } } ).sort( { _id: -1 } );
      return res.send( orders );
    } catch ( error ) {
      next( error );
    }
  };

  getOwn = async ( req, res, next ) => {
    try {
      const user = req.me.id;
      const orders = await OrderModel.find( { user } ).populate( { path: 'products.product', populate: { path: 'images' } } ).sort( { _id: -1 } );
      return res.send( orders );
    } catch ( error ) {
      next( error );
    }
  };

  getOne = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const order = await OrderModel.findOne( { _id: id } ).populate( 'user' ).populate( 'address' ).populate( { path: 'products.product', populate: { path: 'images' } } );
      return res.send( order );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const user = req.me.id;
      const products = req.body.products;
      const address = await AddressModel.findOne( { user } );
      const order = await OrderModel.create( { user, address: address._id, products } );
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