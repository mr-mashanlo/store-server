const UserController = require( './userController' );
const MongoUserController = require( './mongoUserController' );

const mongoUserController = new MongoUserController();
const userController = new UserController( mongoUserController );

module.exports = userController;