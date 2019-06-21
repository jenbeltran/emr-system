//strict mode
'use strict';

var db = require('../../database');

//ADD NEW PATIENT ALLERGY
// Exporting as a function to router.js

function getPatientAllergyRoute(req, res, next) {
    //
    console.log('Request Id:', req.params.id);
    
    db.query(
        //'select * from patient_profile t1, allergies t2 where t1.patient_healthcard=t2.patient_healthcard and t2.patient_healthcard=?',
        'select * from allergies where patient_healthcard=?',
        [ req.params.id ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientAllergy', {
                    username : req.session.username,
                    pageId   : 'patientAllergy',
                    title    : 'Chancey | Search Result - Patient Allergies Information',
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
                res.render('patient/patientAllergy', {
                    username : req.session.username,
                    pageId   : 'patientAllergy',
                    title    : 'Chancey | Search Result - Patient Allergies Information',
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

module.exports = { get: getPatientAllergyRoute };
