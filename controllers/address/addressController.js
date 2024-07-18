module.exports = class AddressController {

  constructor( controller ) {
    this.controller = controller;
  }

  getOne = ( req, res, next ) => {
    this.controller.getOne( req, res, next );
  };

  create = ( req, res, next ) => {
    this.controller.create( req, res, next );
  };

  update = ( req, res, next ) => {
    this.controller.update( req, res, next );
  };

  delete = ( req, res, next ) => {
    this.controller.delete( req, res, next );
  };

};