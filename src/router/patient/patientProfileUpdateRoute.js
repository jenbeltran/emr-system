//strict mode
'use strict';

let db = require('../../database');


// Exporting as a function to router.js
function getUpdateBillingRoute(req, res, next) {
	    //
        
    console.log('Request Id:', req.params.id);
    
    db.query(
       'select * from patient_profile where patient_healthcard=?',
        [ req.params.id ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientProfileUpdate', {
                    username : req.session.username,
                    pageId   : 'patientProfileUpdate',
                    title    : 'Chancey | Update Patient Profile Information',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientProfileUpdate', {
                    username : req.session.username,
                    pageId   : 'patientProfileUpdate',
                    title    : 'Chancey | Update Patient Profile Information',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postUpdateBillingRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
		'UPDATE patient_profile SET patient_firstname=?, patient_lastname=?, patient_street=?, patient_contact=?, patient_DOB=?, patient_city=?, patient_province=?, patient_postalcode=?, patient_email=?  WHERE patient_healthcard=?';
	db.query(
		query,
		[ req.body.patient_firstname, req.body.patient_lastname, req.body.patient_street, req.body.patient_contact, req.body.patient_dob, req.body.patient_city, req.body.patient_province, req.body.patient_postalcode, req.body.patient_email, getPatientHealthCard ],
		(error, results, fields) => {
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
            console.log(getPatientHealthCard);
            // run another sql to get the newly updated profile details
            db.query(
                'select * from patient_profile where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientMenu', {
                             username : req.session.username,
                             pageId   : 'patientProfile',
                             title    : 'Chancey | Update Patient Profile Information',
                             isAdmin  : req.session.isAdmin,
                             result   : dbUsername,
                             getPatient_fname    : req.body.patient_firstname,
                         getPatient_lname    : req.body.patient_lastname,
                         getPatient_hcard    : req.session.hcard,
                         getPatient_street    : req.body.patient_street,
                         getPatient_city    : req.body.patient_city,
                         getPatient_province    : req.body.patient_province,
                         getPatient_contact    : req.body.patient_contact
                         });
                         next();
                 }
             );
            //

		}
	);

    //
}

module.exports = { get: getUpdateBillingRoute, post: postUpdateBillingRoute };
