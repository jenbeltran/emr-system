//strict mode
'use strict';

let db = require('../../database');

//PROVIDER PROFILE PAGE
// Exporting as a function to router.js

function getAllProvidersRoute(req, res) {
	if (req.session.isAdmin !== 1) {
		!req.session.isAdmin;
		res.redirect('/logout');
	} else {
		let query =
			'SELECT careprovider_id, careprovider_firstname, careprovider_lastname, careprovider_username, is_super_admin_user FROM care_provider';
		db.query(query, (error, results, fields) => {
			res.render('provider/allProviders', {
				username : req.session.username,
				isAdmin  : req.session.isAdmin,
				results  : results,
				pageId   : 'allProviders',
				title    : 'Chancey | All Care Providers'
			});
		});
	}
}

// function getAllProvidersRoute(req, res) {
//     db.query('SELECT * FROM care_provider', (providerData) => {
//         console.log('test');
//         console.log(providerData);
//         res.render('provider/allProviders', {
//             username: req.session.username,
//             isAdmin: req.session.isAdmin,
//             pageId: 'providerProfile',
//             title: 'Chancey | All Care Providers',
//             providerData: providerData
//         });
//     });
// }

module.exports = { get: getAllProvidersRoute };
