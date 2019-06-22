//strict mode
'use strict';

let db = require('../../database');
let getRadioName;

// Exporting as a function to router.js
function getDeleteRadioRoute(req, res, next) {
	    //
        
        getRadioName = req.params.radio;
    console.log('Request Id:', req.params.id);
    console.log('Request Vac:', req.params.radio);
    
    db.query(
       'select * from radiology where patient_healthcard=? and exam_type=?',
        [ req.params.id, req.params.radio ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientRadioDelete', {
                    username : req.session.username,
                    pageId   : 'patientRadio',
                    title    : 'Chancey | Delete Patient Radiology Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientRadioDelete', {
                    username : req.session.username,
                    pageId   : 'patientRadioDelete',
                    title    : 'Chancey | Delete Patient Radiology Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postDeleteRadioRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
    'DELETE FROM radiology WHERE  patient_healthcard=? and exam_type=?';
	db.query(
		query,
		[ getPatientHealthCard, getRadioName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            // run another sql to get the newly updated details
            db.query(
                'select * from radiology where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientRadiology', {
                             username : req.session.username,
                             pageId   : 'patientRadio',
                             title    : 'Chancey | Delete Patient Radiology Record',
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

module.exports = { get: getDeleteRadioRoute, post: postDeleteRadioRoute };
