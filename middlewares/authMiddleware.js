const jwt = require( 'jsonwebtoken' );
const TokenModel = require( '../schemas/tokenModel' );
const { Unauthorized, Forbidden } = require( '../services/errorService' );

const authMiddleware = async ( req, res, next ) => {

  const { AToken } = req.cookies;
  if ( !AToken ) {
    return next( new Forbidden( [ { path: 'AToken', msg: 'Access token not found' } ] ) );
  }

  const tokens = await TokenModel.findOne( { AToken } );
  if ( !tokens ) {
    return next( new Forbidden( [ { path: 'TokenModel', msg: 'Tokens not found' } ] ) );
  }

  const verifiedAToken = jwt.verify( AToken, process.env.ACCESS_KEY, ( error, decoded ) => { return error || decoded; } );
  if ( verifiedAToken instanceof Error ) {
    return next( new Unauthorized( 'Access token is not valid', [ { path: 'AToken', msg: 'Access token is not valid' } ] ) );
  }

  req.user = { id: verifiedAToken._id, email: verifiedAToken.email };

  next();
};

module.exports = authMiddleware;