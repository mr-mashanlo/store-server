const UserModel = require( '../../schemas/userModel' );
const TokenModel = require( '../../schemas/tokenModel' );

module.exports = class MongoUserController {

  getAll = async ( req, res, next ) => {
    try {
      const users = await UserModel.find().select( '-password' );
      res.send( users );
    } catch ( error ) {
      next( error );
    }
  };

  getOne = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const user = await UserModel.findOne( { _id: id } ).select( '-password' );
      res.send( user );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const updates = req.body.updates;
      await UserModel.updateOne( { _id: id }, { $set: { ...updates } } );
      res.send( { success: true, msg: 'Updated' } );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      await UserModel.deleteOne( { _id: id } );
      await TokenModel.deleteOne( { user: id } );
      res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};