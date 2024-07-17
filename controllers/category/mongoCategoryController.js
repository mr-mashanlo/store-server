const CategoryModel = require( '../../schemas/categoryModel' );

module.exports = class MongoCategoryController {

  getAll = async ( req, res, next ) => {
    try {
      const categories = await CategoryModel.find();
      res.send( categories );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const title = req.body.title;
      const slug = req.body.slug;
      await CategoryModel.create( { title, slug } );
      res.send( { success: true, msg: 'Created' } );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      await CategoryModel.deleteOne( { _id: id } );
      res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};