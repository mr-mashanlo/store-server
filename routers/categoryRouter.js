const Router = require( 'express' );
const router = new Router();
const categoryController = require( '../controllers/category' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.post( '/', authMiddleware, categoryController.create );
router.get( '/all', authMiddleware, categoryController.getAll );
router.get( '/:id', authMiddleware, categoryController.getOne );
router.put( '/:id', authMiddleware, categoryController.update );
router.delete( '/:id', authMiddleware, categoryController.delete );

module.exports = router;