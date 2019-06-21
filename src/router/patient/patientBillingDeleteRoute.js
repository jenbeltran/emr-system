//strict mode
'use strict';

let db = require('../../database');


// Exporting as a function to router.js
function getDeleteBillingRoute(req, res, next) {
	    //
        
    console.log('Request Id:', req.params.id);
    
    db.query(
       'select * from patient_billing where patient_healthcard=?',
        [ req.params.id ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientBillingDelete', {
                    username : req.session.username,
                    pageId   : 'patientBillingDelete',
                    title    : 'Chancey | Search Result - Patient Billing Information',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientBillingDelete', {
                    username : req.session.username,
                    pageId   : 'patientBillingDelete',
                    title    : 'Chancey | Search Result - Patient Billing Information',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postDeleteBillingRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
		'DELETE FROM patient_billing WHERE patient_healthcard =?';
	db.query(
		query,
		[ getPatientHealthCard ],
		(error, results, fields) => {
    
            console.log(query);
            console.log(getPatientHealthCard);
            // run another sql to get the newly updated billing details
            db.query(
                'select * from patient_billing where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
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
             );
            //

		}
	);

    //
}

module.exports = { get: getDeleteBillingRoute, post: postDeleteBillingRoute };
