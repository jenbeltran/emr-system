//strict mode
'use strict';

let db = require('../../database');

// Exporting as a function to router.js

function getAddNewLabRoute(req, res, next) {
    console.log('Request Id:', req.params.id);
	res.render('patient/patientLabAdd', {
		username : req.session.username,
        isAdmin  : req.session.isAdmin,
        getPatient_hcard    : req.session.hcard,
		pageId   : 'addNewLab',
		title    : 'Chancey | Add New Patient Laboratory Record'
	});
}

function postAddNewLabRoute(req, res, next) {
    
    //
    let query =
		'INSERT INTO lab_results (patient_healthcard,test_name,date_completed,result,abnormal) VALUES(?,?,?, ?, ?)';
	db.query(
		query,
		[ req.session.hcard, req.body.test_name, req.body.date_completed, req.body.result,req.body.abnormal],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
          
            
            db.query(
                'select * from lab_results where patient_healthcard=?',
                 [ req.session.hcard ],
                 (err, dbUsername) => {
                         res.render('patient/patientLabResult', {
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

module.exports = { get: getAddNewLabRoute, post: postAddNewLabRoute};
