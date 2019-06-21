'use strict';

/**
 * Applies default session values
 */
module.exports = function loginMiddleware(req, res, next) {
	console.log(req.session);
	// If the username is undefined, we can assume the session has not been set at all
	// and users will be directed to login page to log in
	if (req.session.username === undefined) {
		req.session.username = null;
		res.redirect('/login');
	}

	// Move onto next middleware (defined with app.use)
	next();
};
