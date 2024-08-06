const CategoryModel = require( '../../schemas/categoryModel' );
const ProductModel = require( '../../schemas/productModel' );

class CategoryController {

  getAll = async ( req, res, next ) => {
    try {
      const categories = await CategoryModel.find();
      return res.send( categories );
    } catch ( error ) {
      next( error );
    }
  };

  getOne = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      const category = await CategoryModel.findOne( { _id: id } );
      return res.send( category );
    } catch ( error ) {
      next( error );
    }
  };

  create = async ( req, res, next ) => {
    try {
      const image = req.body.image;
      const title = req.body.title;
      const slug = req.body.slug;
      const category = await CategoryModel.create( { image, title, slug } );
      return res.send( category );
    } catch ( error ) {
      next( error );
    }
  };

  update = async ( req, res, next ) => {
    try {
      const id = req.body.id;
      const updates = req.body.updates;
      const category = await CategoryModel.findOneAndUpdate( { _id: id }, { $set: { ...updates } }, { new: true } );
      return res.send( category );
    } catch ( error ) {
      next( error );
    }
  };

  delete = async ( req, res, next ) => {
    try {
      const id = req.params.id;
      await ProductModel.updateMany( { category: id }, { $set: { category: 'default' } } );
      await CategoryModel.deleteOne( { _id: id } );
      return res.send( { success: true, msg: 'Deleted' } );
    } catch ( error ) {
      next( error );
    }
  };

};

const categoryController = new CategoryController();

module.exports = categoryController;