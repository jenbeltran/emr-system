//strict mode
'use strict';

let db = require('../../database');

//Password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

//LOGIN PAGE
// Exporting as a function to router.js
function getLoginRoute(req, res, next) {
	res.render('authentication/login', {
		username : req.session.username,
		isAdmin  : req.session.isAdmin,
		pageId   : 'login',
		title    : 'Chancey | Login',
		message  : req.flash('error')
	});
}

function postLoginRoute(req, res, next) {
	let query1 = 'SELECT careprovider_username FROM care_provider WHERE careprovider_username=?';
	db.query(query1, [ req.body.username ], (err, dbUsername) => {
		if (dbUsername < 1 || dbUsername == undefined) {
			req.flash('error', 'Incorrect username');
			res.redirect('/login');
		} else {
			// pull password from database
			let query2 =
				'SELECT careprovider_password, is_super_admin_user FROM care_provider WHERE careprovider_username=?';
			db.query(query2, [ req.body.username ], (err, results) => {
				if (err) next(err);
				else {
					console.log(results[0].is_super_admin_user);
					//compare hashed password from database to hashed req.body.password in form
					return bcrypt.compare(req.body.password, results[0].careprovider_password).then((passwordValid) => {
						// If invalid respond with authentication failure
						if (!passwordValid) {
							req.flash('error', 'Incorrect password');
							res.redirect('/login');
							// Else log the user in and redirect to home page
						} else {
							req.session.username = req.body.username;
							req.session.isAdmin = results[0].is_super_admin_user;
							req.flash('success', 'You have successfully logged in');
							res.redirect('/patient/search');
						}
						console.log(req.session);
					});
				}
			});
		}
	});
}
module.exports = { get: getLoginRoute, post: postLoginRoute };
