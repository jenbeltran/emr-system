//strict mode
'use strict';

let db = require('../../database');

//PROVIDER PROFILE PAGE
// Exporting as a function to router.js

function getProviderProfileRoute(req, res) {
	if (req.session.isAdmin !== 1) {
		!req.session.isAdmin;
		res.redirect('/logout');
	} else {
		let query =
			'SELECT careprovider_id, careprovider_firstname, careprovider_lastname, careprovider_username, is_super_admin_user FROM care_provider WHERE careprovider_id=?';
		db.query(query, [ req.params.id ], (error, results, fields) => {
			res.render('provider/providerProfile', {
				username : req.session.username,
				isAdmin  : req.session.isAdmin,
				results  : results,
				pageId   : 'providerProfile',
				title    : 'Chancey | Care Provider Profile'
			});
		});
	}
}

module.exports = { get: getProviderProfileRoute };
