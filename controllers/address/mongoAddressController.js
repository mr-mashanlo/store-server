const AddressModel = require( '../../schemas/addressModel' );

module.exports = class MongoAddressController {

  getOne = async ( req, res, next ) => {
    try {
      const myID = req.me.id;
      const userID = req.params.id;
      const address = await AddressModel.findOne( { user: userID || myID } );
      return res.send( address || {} );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const { district, city, street } = req.body;
      const user = req.me.id;

      const userAddress = await AddressModel.findOne( { user } );
      if ( userAddress ) {
        await AddressModel.updateOne( { user }, { $set: { district, city, street } } );
        const updatedUserAddress = await AddressModel.findOne( { user } );
        return res.send( updatedUserAddress );
      }

      const address = await AddressModel.create( { user, district, city, street } );
      return res.send( address );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const myID = req.me.id;
      const userID = req.params.id;
      const updates = req.body.updates;
      const address = await AddressModel.findOneAndUpdate( { user: userID || myID }, { $set: { ...updates } }, { new: true } );
      return res.send( address );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      await AddressModel.delete( id );
      return res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};