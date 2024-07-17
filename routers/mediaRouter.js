const Router = require( 'express' );
const router = new Router();
const mediaController = require( '../controllers/media' );
const uploadSingleImage = require( '../middlewares/uploadMiddleware.js' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.get( '/', authMiddleware, mediaController.get );
router.post( '/upload', authMiddleware, uploadSingleImage, mediaController.upload );
router.delete( '/delete/:filename', authMiddleware, mediaController.delete );

module.exports = router;