//strict mode
'use strict';

let db = require('../../database');
let getLabName;

// Exporting as a function to router.js
function getUpdateLabRoute(req, res, next) {
	    //
        
        getLabName = req.params.lab;
    console.log('Request Id:', req.params.id);
    console.log('Request Vac:', req.params.lab);
    
    db.query(
       'select * from lab_results where patient_healthcard=? and test_name=?',
        [ req.params.id, req.params.lab ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientLabUpdate', {
                    username : req.session.username,
                    pageId   : 'patientLab',
                    title    : 'Chancey | Update Patient Laboratory Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientLabUpdate', {
                    username : req.session.username,
                    pageId   : 'patientLabUpdate',
                    title    : 'Chancey | Update Patient Laboratory Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postUpdateLabRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
		'UPDATE lab_results SET date_completed=?, result=?, abnormal=? WHERE patient_healthcard=? and test_name=?';
	db.query(
		query,
		[ req.body.date_completed, req.body.result, req.body.abnormal, getPatientHealthCard, getLabName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
            console.log(getPatientHealthCard);
            // run another sql to get the newly updated Lab details
            db.query(
                'select * from lab_results where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientLabResult', {
                             username : req.session.username,
                             pageId   : 'patientLabResult',
                             title    : 'Chancey | Patient Prescription Record',
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

module.exports = { get: getUpdateLabRoute, post: postUpdateLabRoute };
