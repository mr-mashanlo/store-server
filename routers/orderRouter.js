const Router = require( 'express' );
const router = new Router();
const orderController = require( '../controllers/order' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.post( '/', authMiddleware, orderController.create );
router.get( '/', authMiddleware, orderController.getAll );
router.get( '/own', authMiddleware, orderController.getOne );
router.get( '/:id', authMiddleware, orderController.getOne );
router.put( '/:id', authMiddleware, orderController.update );
router.delete( '/:id', authMiddleware, orderController.delete );

module.exports = router;