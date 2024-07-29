const MediaController = require( './mediaController' );
// const MongoMediaController = require( './mongoMediaController' );
const MongoVercelMediaController = require( './mongoVercelMediaController' );

// const mongoMediaController = new MongoMediaController();
const mongoVercelMediaController = new MongoVercelMediaController();
const mediaController = new MediaController( mongoVercelMediaController );

module.exports = mediaController;