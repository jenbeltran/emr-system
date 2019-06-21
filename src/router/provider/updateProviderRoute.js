//strict mode
'use strict';

let db = require('../../database');

//EDIT/UPDATE PATIENT PROFILE PAGE
// Exporting as a function to router.js
function showEditProviderForm(req, res, next) {
	if (req.session.isAdmin !== 1) {
		!req.session.isAdmin;
		res.redirect('/logout');
	} else {
		let query = 'SELECT * FROM care_provider WHERE careprovider_id =?';
		db.query(query, [ req.params.id ], (error, results, fields) => {
			res.render('provider/updateProvider', {
				username : req.session.username,
				isAdmin  : req.session.isAdmin,
				results  : results,
				pageId   : 'updateProvider',
				title    : 'Chancey | Update Care Provider Details'
			});
		});
	}
}

//UPDATE route - updates the provider and redirects to all providers page
function updateProviderDetailsRoute(req, res, next) {
	if (req.session.isAdmin !== 1) {
		!req.session.isAdmin;
		res.redirect('/logout');
	} else {
		let query =
			'UPDATE care_provider SET careprovider_firstname=?, careprovider_lastname=?, careprovider_username=? WHERE careprovider_id=?';
		db.query(
			query,
			[ req.body.provider_fname, req.body.provider_lname, req.body.provider_username, req.params.id ],
			(error, results, fields) => {
				res.redirect(`/provider/${req.params.id}`);
			}
		);
	}
}

module.exports = { get: showEditProviderForm, put: updateProviderDetailsRoute };
