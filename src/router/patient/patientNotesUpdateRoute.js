//strict mode
'use strict';

let db = require('../../database');

// Exporting as a function to router.js
function getUpdateNotesRoute(req, res, next) {
	    //
        
    console.log('Request Id:', req.params.id);
    req.session.NoteId = req.params.id;
    db.query(
       'select * from patient_notes where id=?',
        [ req.params.id ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientNotesUpdate', {
                    username : req.session.username,
                    pageId   : 'patientProfileUpdate',
                    title    : 'Chancey | Update Patient Notes',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientNotesUpdate', {
                    username : req.session.username,
                    pageId   : 'patientProfileUpdate',
                    title    : 'Chancey | Update Patient Notes',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postUpdateNotesRoute(req, res, next) {
	
    let getPatientNoteId = req.session.NoteId;
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
		'UPDATE patient_notes SET patient_note=? WHERE id=?';
	db.query(
		query,
		[ req.body.patient_note, getPatientNoteId ],
		(error, results, fields) => {
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
            console.log(getPatientHealthCard);
            // run another sql to get the newly updated profile details
            db.query(
                'select * from patient_profile where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                     //
                     db.query(
                        'SELECT * FROM patient_notes WHERE patient_healthcard=?',
                        [ req.session.hcard ],
                        (err, patientNotes) => {
                     //
                         res.render('patient/patientMenu', {
                             username : req.session.username,
                             pageId   : 'patientProfile',
                             title    : 'Chancey | Update Patient Profile Information',
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
             );
            //

		}
	);

    //
}

module.exports = { get: getUpdateNotesRoute, post: postUpdateNotesRoute };
