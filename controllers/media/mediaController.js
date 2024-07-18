module.exports = class MediaController {

  constructor( controller ) {
    this.controller = controller;
  }

  getAll = ( req, res, next ) => {
    this.controller.getAll( req, res, next );
  };

  upload = ( req, res, next ) => {
    this.controller.upload( req, res, next );
  };

  delete = ( req, res, next ) => {
    this.controller.delete( req, res, next );
  };

};