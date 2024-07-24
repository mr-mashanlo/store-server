const Router = require( 'express' );
const router = new Router();
const categoryController = require( '../controllers/category' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.get( '/all', authMiddleware, categoryController.getAll );
router.post( '/', authMiddleware, categoryController.create );
router.delete( '/:slug', authMiddleware, categoryController.delete );

module.exports = router;