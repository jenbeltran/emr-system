//strict mode
'use strict';

let db = require('../../database');

// Exporting as a function to router.js

function getAddNewAllergyRoute(req, res, next) {
    console.log('Request Id:', req.params.id);
	res.render('patient/patientAllergyAdd', {
		username : req.session.username,
        isAdmin  : req.session.isAdmin,
        getPatient_hcard    : req.session.hcard,
		pageId   : 'addNewAllergy',
		title    : 'Chancey | Add New Patient Allergy Medication Record'
	});
}

function postAddNewAllergyRoute(req, res, next) {
    
    //
    let query =
		'INSERT INTO allergies (patient_healthcard,medications,notes,severity_level) VALUES(?,?, ?, ?)';
	db.query(
		query,
		[ req.session.hcard, req.body.medications, req.body.notes, req.body.severity_level],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
          
            
            db.query(
                'select * from allergies where patient_healthcard=?',
                 [ req.session.hcard ],
                 (err, dbUsername) => {
                         res.render('patient/patientAllergy', {
                             username : req.session.username,
                             pageId   : 'patientMenu',
                             title    : 'Chancey | Patient Profile',
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
                         next();
                 }
             );
            //

		}
	);

    //	
}

module.exports = { get: getAddNewAllergyRoute, post: postAddNewAllergyRoute};
