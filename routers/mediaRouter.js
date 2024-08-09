const Router = require( 'express' );
const router = new Router();
const authMiddleware = require( '../middlewares/authMiddleware' );

// const mediaController = require( '../controllers/media/mediaController.js' );
// const uploadMiddleware = require( '../middlewares/uploadMiddleware.js' );

const mediaController = require( '../controllers/media/vercelMediaController.js' );
const uploadMiddleware = require( '../middlewares/vercelUploadMiddleware.js' );

router.get( '/all', authMiddleware, mediaController.getAll );
router.post( '/', authMiddleware, uploadMiddleware, mediaController.upload );
router.delete( '/:id', authMiddleware, mediaController.delete );

module.exports = router;