//strict mode
'use strict';

var db = require('../../database');

//PATIENT PRESCRIPTION
// Exporting as a function to router.js

function getpatientPrescriptionRoute(req, res, next) {
	//
    console.log('Request Id:', req.params.id);
    
    db.query(
        //'select * from patient_profile t1, prescriptions_medication t2 where t1.patient_healthcard=t2.patient_healthcard and t2.patient_healthcard=?',
        'select * from prescriptions_medication where patient_healthcard=?',
        [ req.params.id ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientPrescription', {
                    username : req.session.username,
                    pageId   : 'patientPrescription',
                    title    : 'Chancey | Search Result - Patient Prescription Information',
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
                res.render('patient/patientPrescription', {
                    username : req.session.username,
                    pageId   : 'patientPrescription',
                    title    : 'Chancey | Search Result - Patient Prescription Information',
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

module.exports = { get: getpatientPrescriptionRoute };
