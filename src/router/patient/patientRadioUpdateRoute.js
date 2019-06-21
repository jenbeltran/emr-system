//strict mode
'use strict';

let db = require('../../database');
let getRadioName;

// Exporting as a function to router.js
function getUpdateRadioRoute(req, res, next) {
	    //
        
        getRadioName = req.params.radio;
    console.log('Request Id:', req.params.id);
    console.log('Request Vac:', req.params.radio);
    
    db.query(
       'select * from radiology where patient_healthcard=? and exam_type=?',
        [ req.params.id, req.params.radio ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientRadioUpdate', {
                    username : req.session.username,
                    pageId   : 'patientRadio',
                    title    : 'Chancey | Update Patient Radiology Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientRadioUpdate', {
                    username : req.session.username,
                    pageId   : 'patientRadioUpdate',
                    title    : 'Chancey | Update Patient Radiology Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postUpdateRadioRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
		'UPDATE radiology SET date_completed=?, result=? WHERE patient_healthcard=? and exam_type=?';
	db.query(
		query,
		[ req.body.date_completed, req.body.result, getPatientHealthCard, getRadioName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
            console.log(getPatientHealthCard);
            // run another sql to get the newly updated Lab details
            db.query(
                'select * from radiology where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientRadiology', {
                             username : req.session.username,
                             pageId   : 'patientRadioResult',
                             title    : 'Chancey | Patient Radiology Record',
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

module.exports = { get: getUpdateRadioRoute, post: postUpdateRadioRoute };
