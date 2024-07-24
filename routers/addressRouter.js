const Router = require( 'express' );
const router = new Router();
const addressController = require( '../controllers/address' );
const authMiddleware = require( '../middlewares/authMiddleware' );

router.post( '/', authMiddleware, addressController.create );
router.get( '/', authMiddleware, addressController.getOne );
router.get( '/:id', authMiddleware, addressController.getOne );
router.put( '/', authMiddleware, addressController.update );
router.put( '/:id', authMiddleware, addressController.update );
router.delete( '/:id', authMiddleware, addressController.delete );

module.exports = router;