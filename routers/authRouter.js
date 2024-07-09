const Router = require( 'express' );
const router = new Router();
const authController = require( '../controllers/auth' );

router.post( '/signin', authController.signin );
router.post( '/signup', authController.signup );
router.delete( '/delete', authController.delete );
router.get( '/token', authController.token );

module.exports = router;