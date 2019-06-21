//strict mode
'use strict';

let db = require('../../database');
let getVaccineName;

// Exporting as a function to router.js
function getUpdateBillingRoute(req, res, next) {
	    //
        
        getVaccineName = req.params.vac;
    console.log('Request Id:', req.params.id);
    console.log('Request Vac:', req.params.vac);
    
    db.query(
       'select * from patient_immunization where patient_healthcard=? and vaccine_name=?',
        [ req.params.id, req.params.vac ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientImmunizationUpdate', {
                    username : req.session.username,
                    pageId   : 'patientImmunization',
                    title    : 'Chancey | Update Patient Immunization Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientImmunizationUpdate', {
                    username : req.session.username,
                    pageId   : 'patientImmunizationUpdate',
                    title    : 'Chancey | Update Patient Immunization Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postUpdateBillingRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
		'UPDATE patient_immunization SET date_completed=?, date_next_visit=? WHERE patient_healthcard=? and vaccine_name=?';
	db.query(
		query,
		[ req.body.date_completed, req.body.date_next_visit, getPatientHealthCard, getVaccineName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
            console.log(getPatientHealthCard);
            console.log(req.params.vac);
            // run another sql to get the newly updated Immunization details
            db.query(
                'select * from patient_immunization where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientImmunization', {
                             username : req.session.username,
                             pageId   : 'patientImmunization',
                             title    : 'Chancey | Update Patient Immunization Record',
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

module.exports = { get: getUpdateBillingRoute, post: postUpdateBillingRoute };
