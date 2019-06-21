//strict mode
'use strict';

//LOGOUT PAGE
// Exporting as a function to router.js

function logoutRoute(req, res, next) {
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			res.redirect('/login');
		}
	});
}

module.exports = { get: logoutRoute };
