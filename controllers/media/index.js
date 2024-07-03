const MediaController = require( './mediaController' );
const LocalMediaController = require( './localMediaController' );

const localMediaController = new LocalMediaController();
const mediaController = new MediaController( localMediaController );

module.exports = mediaController;