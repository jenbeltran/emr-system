//strict mode
'use strict';

let db = require('../../database');
let getPrescriptionName;

// Exporting as a function to router.js
function getUpdatePrescRoute(req, res, next) {
	    //
        
        getPrescriptionName = req.params.presc;
    console.log('Request Id:', req.params.id);
    console.log('Request Vac:', req.params.presc);
    
    db.query(
       'select * from prescriptions_medication where patient_healthcard=? and prescription_name=?',
        [ req.params.id, req.params.presc ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientPrescUpdate', {
                    username : req.session.username,
                    pageId   : 'patientPresc',
                    title    : 'Chancey | Update Patient Prescription Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientPrescUpdate', {
                    username : req.session.username,
                    pageId   : 'patientPrescUpdate',
                    title    : 'Chancey | Update Patient Prescription Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postUpdatePrescRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
		'UPDATE prescriptions_medication SET dose_qty=?, days_supply=?, route_of_admin=?, date_filled=? WHERE patient_healthcard=? and prescription_name=?';
	db.query(
		query,
		[ req.body.dose_qty, req.body.days_supply, req.body.route_of_admin, req.body.date_filled, getPatientHealthCard, getPrescriptionName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
            console.log(getPatientHealthCard);
            console.log(getPrescriptionName);
            // run another sql to get the newly updated Immunization details
            db.query(
                'select * from prescriptions_medication where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientPrescription', {
                             username : req.session.username,
                             pageId   : 'patientPrescription',
                             title    : 'Chancey | Update Patient Prescription Record',
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

module.exports = { get: getUpdatePrescRoute, post: postUpdatePrescRoute };
