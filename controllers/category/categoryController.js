module.exports = class CategoryController {

  constructor( controller ) {
    this.controller = controller;
  }

  getAll = ( req, res, next ) => {
    this.controller.getAll( req, res, next );
  };

  create = ( req, res, next ) => {
    this.controller.create( req, res, next );
  };

  delete = ( req, res, next ) => {
    this.controller.delete( req, res, next );
  };

};