const Router = require( 'express' );
const router = new Router();
const categoryController = require( '../controllers/category' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.get( '/', authMiddleware, categoryController.getAll );
router.post( '/', authMiddleware, categoryController.create );
router.delete( '/:id', authMiddleware, categoryController.delete );

module.exports = router;