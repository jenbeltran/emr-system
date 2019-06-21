//strict mode
'use strict';

let db = require('../../database');

// Exporting as a function to router.js

function getAddNewRadioRoute(req, res, next) {
    console.log('Request Id:', req.params.id);
	res.render('patient/patientRadioAdd', {
		username : req.session.username,
        isAdmin  : req.session.isAdmin,
        getPatient_hcard    : req.session.hcard,
		pageId   : 'addNewRadio',
		title    : 'Chancey | Add New Patient Radiology Record'
	});
}

function postAddNewRadioRoute(req, res, next) {
    
    //
    let query =
		'INSERT INTO radiology (patient_healthcard,exam_type,date_completed,result) VALUES(?,?, ?, ?)';
	db.query(
		query,
		[ req.session.hcard, req.body.exam_type, req.body.date_completed, req.body.result],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
          
            
            db.query(
                'select * from radiology where patient_healthcard=?',
                 [ req.session.hcard ],
                 (err, dbUsername) => {
                         res.render('patient/patientRadiology', {
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

module.exports = { get: getAddNewRadioRoute, post: postAddNewRadioRoute};
