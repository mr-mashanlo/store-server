const AddressController = require( './addressController' );
const MongoAddressController = require( './mongoAddressController' );

const mongoAddressController = new MongoAddressController();
const addressController = new AddressController( mongoAddressController );

module.exports = addressController;