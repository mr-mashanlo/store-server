const OrderController = require( './orderController' );
const MongoOrderController = require( './mongoOrderController' );

const mongoOrderController = new MongoOrderController();
const orderController = new OrderController( mongoOrderController );

module.exports = orderController;