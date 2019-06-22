//strict mode
'use strict';

let db = require('../../database');

// Exporting as a function to router.js
function getAddNotesRoute(req, res, next) {
	    //
        console.log('Request Id:', req.params.id);
        res.render('patient/patientNotesAdd', {
            username : req.session.username,
            isAdmin  : req.session.isAdmin,
            getPatient_hcard    : req.session.hcard,
            pageId   : 'addNewNotes',
            title    : 'Chancey | Add New Patient Notes'
        });
        //
}

function postAddNotesRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    let getTodaysDate = new Date(Date.now()).toDateString();
    //
    let query =
		'INSERT INTO patient_notes (patient_healthcard,patient_note,date_created) VALUES(?, ?, ?)';
	db.query(
		query,
		[ getPatientHealthCard,req.body.patient_note, getTodaysDate ],
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

module.exports = { get: getAddNotesRoute, post: postAddNotesRoute };
