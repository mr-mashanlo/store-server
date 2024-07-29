const Router = require( 'express' );
const router = new Router();
const mediaController = require( '../controllers/media' );
const uploadMiddleware = require( '../middlewares/uploadVercelMiddleware.js' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.get( '/all', authMiddleware, mediaController.getAll );
router.post( '/', authMiddleware, uploadMiddleware, mediaController.upload );
router.delete( '/:filename', authMiddleware, mediaController.delete );

module.exports = router;