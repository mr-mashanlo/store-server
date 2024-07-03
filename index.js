require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );
const mediaRouter = require( './routers/mediaRouter' );

const app = express();
app.use( cors( { origin: [ process.env.FRONT_URI ] } ) );
app.use( express.json() );
app.use( '/uploads', express.static( path.join( __dirname, 'uploads' ) ) );
app.use( '/media', mediaRouter );

const start = async () => {
  try {
    app.listen( process.env.PORT, () => console.log( `Server is running on port ${process.env.PORT}` ) );
  } catch ( error ) {
    console.log( error );
  }
};

start();