module.exports = class UserController {

  constructor( controller ) {
    this.controller = controller;
  }

  getAll = ( req, res, next ) => {
    this.controller.getAll( req, res, next );
  };

  getOne = ( req, res, next ) => {
    this.controller.getOne( req, res, next );
  };

  update = ( req, res, next ) => {
    this.controller.update( req, res, next );
  };

  delete = ( req, res, next ) => {
    this.controller.delete( req, res, next );
  };

};