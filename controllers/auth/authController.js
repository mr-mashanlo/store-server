module.exports = class AuthController {

  constructor( controller ) {
    this.controller = controller;
  }

  signin = ( req, res, next ) => {
    this.controller.signin( req, res, next );
  };

  signup = ( req, res, next ) => {
    this.controller.signup( req, res, next );
  };

  delete = ( req, res, next ) => {
    this.controller.delete( req, res, next );
  };

  token = ( req, res, next ) => {
    this.controller.token( req, res, next );
  };

};