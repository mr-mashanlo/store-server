const Router = require( 'express' );
const router = new Router();
const userController = require( '../controllers/user' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.get( '/', authMiddleware, userController.getAll );
router.get( '/me', authMiddleware, userController.getOne );
router.get( '/:id', authMiddleware, userController.getOne );
router.put( '/me', authMiddleware, userController.update );
router.put( '/:id', authMiddleware, userController.update );
router.delete( '/:id', authMiddleware, userController.delete );

module.exports = router;