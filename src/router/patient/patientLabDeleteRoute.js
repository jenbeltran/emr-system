//strict mode
'use strict';

let db = require('../../database');
let getLabName;

// Exporting as a function to router.js
function getDeleteLabRoute(req, res, next) {
	    //
        
        getLabName = req.params.lab;
    console.log('Request Id:', req.params.id);
    console.log('Request Vac:', req.params.lab);
    
    db.query(
       'select * from lab_results where patient_healthcard=? and test_name=?',
        [ req.params.id, req.params.lab ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientPrescDelete', {
                    username : req.session.username,
                    pageId   : 'patientLab',
                    title    : 'Chancey | Delete Patient Lab Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientLabDelete', {
                    username : req.session.username,
                    pageId   : 'patientLabDelete',
                    title    : 'Chancey | Delete Patient Lab Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postDeleteLabRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
    'DELETE FROM lab_results WHERE  patient_healthcard=? and test_name=?';
	db.query(
		query,
		[ getPatientHealthCard, getLabName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            // run another sql to get the newly updated details
            db.query(
                'select * from lab_results where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientLabResult', {
                             username : req.session.username,
                             pageId   : 'patientLab',
                             title    : 'Chancey | Delete Patient Lab Record',
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

module.exports = { get: getDeleteLabRoute, post: postDeleteLabRoute };
