const Router = require( 'express' );
const router = new Router();
const mediaController = require( '../controllers/media' );
const uploadSingleImage = require( '../middlewares/uploadMiddleware.js' );

router.post( '/upload', uploadSingleImage, mediaController.upload );
router.delete( '/delete/:filename', mediaController.delete );

module.exports = router;