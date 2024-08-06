const Router = require( 'express' );
const router = new Router();
const authController = require( '../controllers/auth/authController' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.post( '/signin', authController.signin );
router.post( '/signup', authController.signup );
router.get( '/logout', authMiddleware, authController.logout );
router.delete( '/delete', authMiddleware, authController.delete );
router.get( '/token', authController.token );

module.exports = router;