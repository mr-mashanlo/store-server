module.exports = class MediaController {

  constructor( controller ) {
    this.controller = controller;
  }

  upload = ( req, res, next ) => {
    this.controller.upload( req, res, next );
  };

  delete = ( req, res, next ) => {
    this.controller.delete( req, res, next );
  };

};