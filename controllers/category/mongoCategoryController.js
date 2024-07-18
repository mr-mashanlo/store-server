const CategoryModel = require( '../../schemas/categoryModel' );
const ProductModel = require( '../../schemas/productModel' );

module.exports = class MongoCategoryController {

  getAll = async ( req, res, next ) => {
    try {
      const categories = await CategoryModel.find();
      return res.send( categories );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const title = req.body.title;
      const slug = req.body.slug;
      const category = await CategoryModel.create( { title, slug } );
      return res.send( category );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const slug = req.params.slug;
      await ProductModel.updateMany( { category: slug }, { $set: { category: 'default' } } );
      await CategoryModel.deleteOne( { slug } );
      return res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};