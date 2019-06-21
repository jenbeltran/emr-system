//strict mode
'use strict';

let db = require('../../database');

// Exporting as a function to router.js

function getAddNewImmunizationRoute(req, res, next) {
    console.log('Request Id:', req.params.id);
	res.render('patient/patientImmunizationAdd', {
		username : req.session.username,
        isAdmin  : req.session.isAdmin,
        getPatient_hcard    : req.session.hcard,
		pageId   : 'addNewImmunization',
		title    : 'Chancey | Add New Patient Immunization Record'
	});
}

function postAddNewImmunizationRoute(req, res, next) {
    
    //
    let query =
		'INSERT INTO patient_immunization (patient_healthcard,vaccine_name,date_completed,date_next_visit) VALUES(?, ?, ?,?)';
	db.query(
		query,
		[ req.session.hcard, req.body.vaccine_name, req.body.date_completed, req.body.date_next_visit],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
          
            
            db.query(
                'select * from patient_immunization where patient_healthcard=?',
                 [ req.session.hcard ],
                 (err, dbUsername) => {
                         res.render('patient/patientImmunization', {
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

module.exports = { get: getAddNewImmunizationRoute, post: postAddNewImmunizationRoute};
