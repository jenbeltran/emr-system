//strict mode
'use strict';

let db = require('../../database');

//SEARCH PATIENT PAGE
// Exporting as a function to router.js

function searchPatientRoute(req, res, next) {
	res.render('patient/searchPatient', {
		username : req.session.username,
		isAdmin  : req.session.isAdmin,
		pageId   : 'searchPatient',
		title    : 'Chancey | Search Patient',
		message  : req.flash('success')
	});
}

function postSearchPatientRoute(req, res, next) {
   
//
console.log(req.body.search);
console.log(req.body.user_healthcard);
if (req.body.search=="SearchByName"){
    console.log(req.body.search);
    //
    
db.query(
    'SELECT * FROM patient_profile WHERE patient_firstname=? or patient_lastname=?',
    [ req.body.user_fname, req.body.user_lname ],
    (err, dbUsername) => {
        if (dbUsername < 1 || dbUsername == undefined) {
            username : req.session.username,
			req.flash('error', 'No Patients found with that First Name and/or Last Name');
			res.redirect('/patient/search');
        } else {
            req.session.fname = dbUsername[0].patient_firstname;
            req.session.lname = dbUsername[0].patient_lastname;
            req.session.hcard = dbUsername[0].patient_healthcard;
            req.session.street = dbUsername[0].patient_street;
            req.session.city = dbUsername[0].patient_city;
            req.session.province = dbUsername[0].patient_province;
            req.session.contact = dbUsername[0].patient_contact;
            res.render('patient/patientmenu', {
                username : req.session.username,
                pageId   : 'patientprofile',
                title    : 'Chancey | Search Result - Patient Profile',
                isAdmin  : req.session.isAdmin,
                result   : dbUsername,
                getPatient_fname    : req.session.fname,
                getPatient_lname    : req.session.lname,
                getPatient_hcard    : req.session.hcard,
                getPatient_street    : req.session.street,
                getPatient_city    : req.session.city,
                getPatient_province    : req.session.province,
                getPatient_contact    : req.session.contact
            });
        }
    }
);

    //
}else {
db.query(
    'SELECT * FROM patient_profile WHERE patient_healthcard=?',
    [ req.body.user_healthcard ],
    (err, dbUsername) => {
        if (dbUsername < 1 || dbUsername == undefined) {
            username : req.session.username,
			req.flash('error', 'No Patients found with that Health Card Number');
			res.redirect('/patient/search');
        } else {
            req.session.fname = dbUsername[0].patient_firstname;
            req.session.lname = dbUsername[0].patient_lastname;
            req.session.hcard = dbUsername[0].patient_healthcard;
            req.session.street = dbUsername[0].patient_street;
            req.session.city = dbUsername[0].patient_city;
            req.session.province = dbUsername[0].patient_province;
            req.session.contact = dbUsername[0].patient_contact;
            console.log("est" + dbUsername[0].patient_firstname);
            res.render('patient/patientmenu', {
                username : req.session.username,
                pageId   : 'patientprofile',
                title    : 'Chancey | Search Result - Patient Profile',
                isAdmin  : req.session.isAdmin,
                result   : dbUsername,
                getPatient_fname    : req.session.fname,
                getPatient_lname    : req.session.lname,
                getPatient_hcard    : req.session.hcard,
                getPatient_street    : req.session.street,
                getPatient_city    : req.session.city,
                getPatient_province    : req.session.province,
                getPatient_contact    : req.session.contact
            });
        }
    }
);
}
//
}

module.exports = { get: searchPatientRoute, post: postSearchPatientRoute };
