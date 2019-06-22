//strict mode
'use strict';

let db = require('../../database');

//ADD NEW PATIENT PAGE
// Exporting as a function to router.js

function getAddNewPatientRoute(req, res, next) {
	res.render('patient/addNewPatient', {
		username : req.session.username,
		isAdmin  : req.session.isAdmin,
		pageId   : 'addNewPatient',
		title    : 'Chancey | Add New Patient'
	});
}

function postAddNewPatientRoute(req, res, next) {
    
    //
    let query =
		'INSERT INTO patient_profile (patient_healthcard,patient_firstname,patient_lastname,patient_street, patient_contact, patient_DOB, patient_city, patient_province, patient_postalcode, patient_email) VALUES(?, ?, ?, ?, ?,?,?,?,?,?)';
	db.query(
		query,
		[ req.body.patient_healthcard, req.body.patient_firstname, req.body.patient_lastname, req.body.patient_street, req.body.patient_contact, req.body.patient_DOB, req.body.patient_city, req.body.patient_province, req.body.patient_postalcode,req.body.patient_email ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
          
            
            db.query(
                'select * from patient_profile where patient_healthcard=?',
                 [ req.body.patient_healthcard ],
                 (err, dbUsername) => {

                    req.session.fname = req.body.patient_firstname;
                    req.session.lname = req.body.patient_lastname;
                    req.session.hcard = req.body.patient_healthcard;
                    req.session.street = req.body.patient_street;
                    req.session.city = req.body.patient_city;
                    req.session.province = req.body.patient_province;
                    req.session.contact = req.body.patient_contact;

                    db.query(
                        'SELECT * FROM patient_notes WHERE patient_healthcard=?',
                        [ req.session.hcard ],
                        (err, patientNotes) => {

                         res.render('patient/patientMenu', {
                             username : req.session.username,
                             pageId   : 'patientMenu',
                             title    : 'Chancey | Patient Profile',
                             isAdmin  : req.session.isAdmin,
                             result   : dbUsername,
                             patientNotes:   patientNotes,
                             getPatient_fname    : req.body.patient_firstname,
                         getPatient_lname    : req.body.patient_lastname,
                         getPatient_hcard    : req.body.patient_healthcard,
                         getPatient_street    : req.body.patient_street,
                         getPatient_city    : req.body.patient_city,
                         getPatient_province    : req.body.patient_province,
                         getPatient_contact    : req.body.patient_contact
                         });
                         next();
                        }
                        );
                 }
             );
            //

		}
	);

    //	
}

module.exports = { get: getAddNewPatientRoute, post: postAddNewPatientRoute};
