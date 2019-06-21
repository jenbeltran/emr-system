//strict mode
'use strict';

let db = require('../../database');

//PATIENT BILLING INFORMATION
// Exporting as a function to router.js

/*function getpatientBillingRoute(req, res) {
	res.render('patient/patientBilling', {
		username : req.session.username,
		isAdmin  : req.session.isAdmin,
		pageId   : 'patientBilling',
		title    : 'Chancey | Patient Billing Information'
	});
}*/

function getpatientBillingRoute(req, res, next) {
   
    //
    
    console.log('Request Id:', req.params.id);
    
    db.query(
       // 'select * from patient_profile t1, patient_billing t2 where t1.patient_healthcard=t2.patient_healthcard and t2.patient_healthcard=?',
       'select * from patient_billing where patient_healthcard=?',
        [ req.params.id ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientBilling', {
                    username : req.session.username,
                    pageId   : 'patientBilling',
                    title    : 'Chancey | Search Result - Patient Billing Information',
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
            } else {
                res.render('patient/patientBilling', {
                    username : req.session.username,
                    pageId   : 'patientBilling',
                    title    : 'Chancey | Search Result - Patient Billing Information',
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
        }
    );
    //

    
    }

module.exports = { get: getpatientBillingRoute };
