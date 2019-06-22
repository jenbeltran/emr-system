//strict mode
'use strict';

var db = require('../../database');

//PATIENT PROFILE PAGE
// Exporting as a function to router.js

function getpatientProfileRoute(req, res, next) {
    //
    
    console.log('Request Id:', req.params.id);
    
    db.query(
        'select * from patient_profile where patient_healthcard=?',
        [ req.params.id ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientMenu', {
                    username : req.session.username,
                    pageId   : 'patientprofile',
                    title    : 'Chancey | Search Result - Patient Profile',
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
                db.query(
                    'SELECT * FROM patient_notes WHERE patient_healthcard=?',
                    [ req.session.hcard ],
                    (err, patientNotes) => {

                res.render('patient/patientMenu', {
                username : req.session.username,
                pageId   : 'patientprofile',
                title    : 'Chancey | Search Result - Patient Profile',
                isAdmin  : req.session.isAdmin,
                result   : dbUsername,
                patientNotes:   patientNotes,
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
            }
        }
    );
    //
}
//

module.exports = { get: getpatientProfileRoute };
