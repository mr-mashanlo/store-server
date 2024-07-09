const AuthController = require( './authController' );
const MongoAuthController = require( './mongoAuthController' );

const mongoAuthController = new MongoAuthController();
const authController = new AuthController( mongoAuthController );

module.exports = authController;