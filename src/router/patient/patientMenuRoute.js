//strict mode
'use strict';

//PATIENT MAIN MENU
// Exporting as a function to router.js

function getpatientMenuRoute(req, res) {
	res.render('patient/patientMenu', {
		username : req.session.username,
		isAdmin  : req.session.isAdmin,
		pageId   : 'patientNotes',
		title    : 'Chancey | Patient Main Menu'
	});
}

module.exports = { get: getpatientMenuRoute };
