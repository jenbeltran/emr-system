//strict mode
'use strict';

let db = require('../../database');
let getVaccineName;

// Exporting as a function to router.js
function getDeleteImmunizationRoute(req, res, next) {
	    //
        
        getVaccineName = req.params.vac;
    console.log('Request Id:', req.params.id);
    console.log('Request Vac:', req.params.vac);
    
    db.query(
       'select * from patient_immunization where patient_healthcard=? and vaccine_name=?',
        [ req.params.id, req.params.vac ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientImmunizationDelete', {
                    username : req.session.username,
                    pageId   : 'patientImmunization',
                    title    : 'Chancey | Delete Patient Immunization Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientImmunizationDelete', {
                    username : req.session.username,
                    pageId   : 'patientImmunizationDelete',
                    title    : 'Chancey | Delete Patient Immunization Record',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postDeleteImmunizationRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
    'DELETE FROM patient_immunization WHERE  patient_healthcard=? and vaccine_name=?';
	db.query(
		query,
		[ getPatientHealthCard, getVaccineName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
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

module.exports = { get: getDeleteImmunizationRoute, post: postDeleteImmunizationRoute };
