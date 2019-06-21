//strict mode
'use strict';

let db = require('../../database');
let getAllergyName;

// Exporting as a function to router.js
function getUpdateAllergyRoute(req, res, next) {
	    //
        
        getAllergyName = req.params.allergy;
    console.log('Request Id:', req.params.id);
    console.log('Request Allergy:', req.params.allergy);
    
    db.query(
       'select * from allergies where patient_healthcard=? and medications=?',
        [ req.params.id, req.params.allergy ],
        (err, dbUsername) => {
            if (dbUsername < 1 || dbUsername == undefined) {
                res.render('patient/patientAllergyUpdate', {
                    username : req.session.username,
                    pageId   : 'patientAllergy',
                    title    : 'Chancey | Update Patient Allergy Medication',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername,
                });
                next();
            } else {
                res.render('patient/patientAllergyUpdate', {
                    username : req.session.username,
                    pageId   : 'patientRadioAllergy',
                    title    : 'Chancey | Update Patient Allergy Medication',
                    isAdmin  : req.session.isAdmin,
                    result   : dbUsername
                });
                next();
            }
        }
    );
        //
}

function postUpdateAllergyRoute(req, res, next) {
	
    let getPatientHealthCard = req.session.hcard;
    //
    let query =
		'UPDATE allergies SET notes=?, severity_level=? WHERE patient_healthcard=? and medications=?';
	db.query(
		query,
		[ req.body.notes, req.body.severity_level, getPatientHealthCard, getAllergyName ],
		(error, results, fields) => {
    
            if (results < 1 || results == undefined) {
                console.log(error);
            }
            console.log(query);
            console.log(getPatientHealthCard);
            // run another sql to get the newly updated Lab details
            db.query(
                'select * from allergies where patient_healthcard=?',
                 [ getPatientHealthCard ],
                 (err, dbUsername) => {
                         res.render('patient/patientAllergy', {
                             username : req.session.username,
                             pageId   : 'patientAllergyResult',
                             title    : 'Chancey | Patient Allergy Medications',
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

module.exports = { get: getUpdateAllergyRoute, post: postUpdateAllergyRoute };
