//strict mode
'use strict';

let db = require('../../database');

//Password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

//REGISTER PAGE
// Exporting as a function to router.js

function getRegisterRoute(req, res, next) {
	res.render('authentication/register', {
		username : req.session.username,
		isAdmin  : req.session.isAdmin,
		pageId   : 'register',
		title    : 'Chancey | Register',
		message  : req.flash('error')
	});
}

function postRegisterRoute(req, res, next) {
	// if the any of the text boxes are empty,
	//a flash notication will notify that all fields must be filled
	if (
		!req.body.provider_fname ||
		!req.body.provider_lname ||
		!req.body.provider_username ||
		!req.body.password ||
		!req.body.confirmpassword
	) {
		req.flash('error', 'All fields must be filled');
		res.redirect('/register');
		// if the password boxes don't match,
		//a flash notification will notify that passwords must match
	} else if (req.body.password !== req.body.confirmpassword) {
		req.flash('error', 'Both password fields must match');
		res.redirect('/register');
	} else {
		// if the username is not in the db
		// then hash password and log hash and user info in the db
		// a flash notification will notify you that registration has been successful
		let query = 'SELECT careprovider_username FROM care_provider WHERE careprovider_username=?';
		db.query(query, [ req.body.provider_username ], (err, dbUsername) => {
			if (dbUsername < 1 || dbUsername == undefined) {
				// if the checkbox is checked, then add user as super admin user to db
				let isChecked = false;
				if (req.body.super_admin == 'on') {
					isChecked = true;
				}
				bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
					let query =
						'INSERT into care_provider (careprovider_firstname, careprovider_lastname, careprovider_username, careprovider_password, is_super_admin_user) VALUES(?, ?, ?, ?, ?)';
					db.query(
						query,
						[
							req.body.provider_fname,
							req.body.provider_lname,
							req.body.provider_username,
							hash,
							isChecked
						],
						(err) => {
							if (err) next(err);
							else {
								req.flash('success', 'Care provider successfully registered');
								res.redirect('/provider');
							}
						}
					);
				});
			} else {
				// if the username is already in the db
				// a flash notificatiom will notify you that username is already taken
				req.flash('error', 'Username already in system');
				res.redirect('/register');
			}
		});
	}
}

module.exports = { get: getRegisterRoute, post: postRegisterRoute };
