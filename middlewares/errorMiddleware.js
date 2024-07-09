const { GeneralError } = require( '../services/error' );

// eslint-disable-next-line no-unused-vars
const errorMiddleware = ( err, req, res, next ) => {
  if ( err instanceof GeneralError ) {
    return res.status( err.getCode() ).json( {
      errors: err.errors
    } );
  }
  return res.status( 500 ).json( {
    errors: err.errors
  } );
};

module.exports = errorMiddleware;