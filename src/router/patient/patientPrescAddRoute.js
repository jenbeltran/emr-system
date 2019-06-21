//strict mode
'use strict';

let db = require('../../database');

// Exporting as a function to router.js

function getAddNewPrescRoute(req, res, next) {
    console.log('Request Id:', req.params.id);
	res.render('patient/patientPrescAdd', {
		username : req.session.username,
        isAdmin  : req.session.isAdmin,
        getPatient_hcard    : req.session.hcard,
		pageId   : 'addNewPresc',
		title    : 'Chancey | Add New Patient Prescription Record'
	});
}

function postAddNewPrescRoute(req, res, next) {
    
    //
    let query =
		'INSERT INTO prescriptions_medication (patient_healthcard,prescription_name,dose_qty,days_supply,route_of_admin,date_filled) VALUES(?,?,?, ?, ?,?)';
	db.query(
		query,
		[ req.session.hcard, req.body.prescription_name, req.body.dose_qty, req.body.days_supply,req.body.route_of_admin,req.body.date_filled],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
          
            
            db.query(
                'select * from prescriptions_medication where patient_healthcard=?',
                 [ req.session.hcard ],
                 (err, dbUsername) => {
                         res.render('patient/patientPrescription', {
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

module.exports = { get: getAddNewPrescRoute, post: postAddNewPrescRoute};
