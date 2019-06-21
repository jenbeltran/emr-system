//strict mode
'use strict';

let db = require('../../database');

//SEARCH PROVIDER PAGE
// Exporting as a function to router.js

function searchProviderRoute(req, res, next) {
	if (req.session.isAdmin !== 1) {
		!req.session.isAdmin;
		res.redirect('/logout');
	} else {
		res.render('provider/searchProvider', {
			username : req.session.username,
			isAdmin  : req.session.isAdmin,
			pageId   : 'searchProvider',
			title    : 'Chancey | Search Care Provider'
		});
	}
}

function pullSearchProviderRoute(req, res, next) {
	if (req.session.isAdmin !== 1) {
		!req.session.isAdmin;
		res.redirect('/logout');
	} else {
		let query =
			'SELECT careprovider_id, careprovider_firstname, careprovider_lastname, careprovider_username, is_super_admin_user FROM care_provider WHERE careprovider_firstname =? OR careprovider_lastname =?';
		db.query(query, [ req.body.provider_fname, req.body.provider_lname ], (error, results, fields) => {
			if (results < 1 || results == undefined) {
				req.flash('error', 'No care providers found');
				res.redirect('/provider/search');
			} else {
				res.render('provider/searchResults', {
					username : req.session.username,
					isAdmin  : req.session.isAdmin,
					results  : results,
					pageId   : 'searchResultsProvider',
					title    : 'Chancey | Search Care Provider'
				});
			}
		});
	}
}

module.exports = { get: searchProviderRoute, post: pullSearchProviderRoute };
