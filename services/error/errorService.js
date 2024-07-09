class GeneralError extends Error {
  constructor( errors = [], code = 500 ) {
    super();
    this.errors = errors;
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}

class BadRequest extends GeneralError {
  constructor( errors = [] ) {
    super( errors, 400 );
  }
}

class Unauthorized extends GeneralError {
  constructor( errors = [] ) {
    super( errors, 401 );
  }
}

class Forbidden extends GeneralError {
  constructor( errors = [] ) {
    super( errors, 403 );
  }
}

class NotFound extends GeneralError {
  constructor( errors = [] ) {
    super( errors, 404 );
  }
}

module.exports = { GeneralError, BadRequest, Unauthorized, Forbidden, NotFound };