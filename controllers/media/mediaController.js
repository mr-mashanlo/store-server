module.exports = class MediaController {

  constructor( controller ) {
    this.controller = controller;
  }

  get = ( req, res, next ) => {
    this.controller.get( req, res, next );
  };

  upload = ( req, res, next ) => {
    this.controller.upload( req, res, next );
  };

  delete = ( req, res, next ) => {
    this.controller.delete( req, res, next );
  };

};