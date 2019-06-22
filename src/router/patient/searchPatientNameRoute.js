//strict mode
'use strict';

let db = require('../../database');

//SEARCH PATIENT PAGE
// Exporting as a function to router.js

function postSearchPatientRoute(req, res, next) {
	res.render('patient/searchPatient', {
		username : req.session.username,
		isAdmin  : req.session.isAdmin,
		pageId   : 'searchPatient',
		title    : 'Chancey | Search Patient',
		message  : req.flash('success')
	});
}

function searchPatientRoute(req, res, next) {
   
//

db.query(
    'SELECT * FROM patient_profile WHERE patient_healthcard=?',
    [ req.params.id ],
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
            
            
            //
            db.query(
                'SELECT * FROM patient_notes WHERE patient_healthcard=?',
                [ req.session.hcard ],
                (err, patientNotes) => {
                    res.render('patient/patientmenu', {
                        username : req.session.username,
                        pageId   : 'patientprofile',
                        title    : 'Chancey | Search Result - Patient Profile',
                        isAdmin  : req.session.isAdmin,
                        result   : dbUsername,
                        patientNotes:   patientNotes,
                        getPatient_fname    : req.session.fname,
                        getPatient_lname    : req.session.lname,
                        getPatient_hcard    : req.session.hcard,
                        getPatient_street    : req.session.street,
                        getPatient_city    : req.session.city,
                        getPatient_province    : req.session.province,
                        getPatient_contact    : req.session.contact
                    });
                }
            );
            //
            
            
        }
    }
);

//
}

module.exports = { get: searchPatientRoute, post: postSearchPatientRoute };
