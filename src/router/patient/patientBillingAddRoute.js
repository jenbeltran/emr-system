//strict mode
'use strict';

let db = require('../../database');

// Exporting as a function to router.js

function getAddNewBillingRoute(req, res, next) {
    console.log('Request Id:', req.params.id);
	res.render('patient/patientBillingAdd', {
		username : req.session.username,
        isAdmin  : req.session.isAdmin,
        getPatient_hcard    : req.session.hcard,
		pageId   : 'addNewPatient',
		title    : 'Chancey | Add New Patient'
	});
}

function postAddNewBillingRoute(req, res, next) {
    
    //
    let query =
		'INSERT INTO patient_billing (patient_healthcard,ins_provider,ins_policy,creditcard_num, creditcard_code, creditcard_exp) VALUES(?, ?, ?, ?, ?,?)';
	db.query(
		query,
		[ req.session.hcard, req.body.ins_provider, req.body.ins_policy, req.body.creditcard_num, req.body.creditcard_code, req.body.creditcard_exp],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
          
            
            db.query(
                'select * from patient_billing where patient_healthcard=?',
                 [ req.session.hcard ],
                 (err, dbUsername) => {
                         res.render('patient/patientBilling', {
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

module.exports = { get: getAddNewBillingRoute, post: postAddNewBillingRoute};
