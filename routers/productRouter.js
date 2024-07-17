const Router = require( 'express' );
const router = new Router();
const productController = require( '../controllers/product' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.get( '/', authMiddleware, productController.getAll );
router.get( '/:id', authMiddleware, productController.getOne );
router.post( '/', authMiddleware, productController.create );
router.put( '/:id', authMiddleware, productController.update );
router.delete( '/:id', authMiddleware, productController.delete );

module.exports = router;