//strict mode
'use strict';

let db = require('../../database');
let getPrescName;

// Exporting as a function to router.js
function getDeletePrescRoute(req, res, next) {
	    //
        
        getPrescName = req.params.presc;
    console.log('Request Id:', req.params.id);
    console.log('Request Vac:', req.params.presc);
    
    db.query(
       'select * from prescriptions_medication where patient_healthcard=? and prescription_name=?',
        [ req.params.id, req.params.presc ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientPrescDelete', {
                    username : req.session.username,
                    pageId   : 'patientPresc',
                    title    : 'Chancey | Delete Patient Prescription Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientPrescDelete', {
                    username : req.session.username,
                    pageId   : 'patientPrescDelete',
                    title    : 'Chancey | Delete Patient Prescription Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postDeletePrescRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
    'DELETE FROM prescriptions_medication WHERE  patient_healthcard=? and prescription_name=?';
	db.query(
		query,
		[ getPatientHealthCard, getPrescName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            // run another sql to get the newly updated details
            db.query(
                'select * from prescriptions_medication where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientPrescription', {
                             username : req.session.username,
                             pageId   : 'patientPresc',
                             title    : 'Chancey | Delete Patient Prescription Record',
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

module.exports = { get: getDeletePrescRoute, post: postDeletePrescRoute };
