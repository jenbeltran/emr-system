//strict mode
'use strict';

let db = require('../../database');

//DELETE route - deletes the book and redirects to all books page
function deleteProviderRoute(req, res, next) {
	if (req.session.isAdmin !== 1) {
		!req.session.isAdmin;
		res.redirect('/logout');
	} else {
		let query = 'DELETE FROM care_provider WHERE careprovider_id =?';
		db.query(query, [ req.params.id ], (error, results, fields) => {
			res.redirect('/provider');
		});
	}
}

module.exports = { delete: deleteProviderRoute };
