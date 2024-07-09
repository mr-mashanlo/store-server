const MediaController = require( './mediaController' );
const MongoMediaController = require( './mongoMediaController' );

const mongoMediaController = new MongoMediaController();
const mediaController = new MediaController( mongoMediaController );

module.exports = mediaController;