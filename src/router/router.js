//strict mode
'use strict';

//Adding Express
let express = require('express');

// Create instance of an express router
let router = express.Router();

//Adding authentication route functions
let loginRoute = require('./authentication/loginRoute');
let logoutRoute = require('./authentication/logoutRoute');
let registerRoute = require('./authentication/registerRoute');

//Adding patient route functions
let searchPatientRoute = require('./patient/searchPatientRoute');
let patientProfileRoute = require('./patient/patientProfileRoute');
let addNewPatientRoute = require('./patient/addNewPatientRoute');
let updatePatientRoute = require('./patient/updatePatientRoute');
let patientMenuRoute = require('./patient/patientMenuRoute');
let patientBillingRoute = require('./patient/patientBillingRoute');

// Routes for Updates
let patientBillingUpdateRoute = require('./patient/patientBillingUpdateRoute');
let patientProfileUpdateRoute = require('./patient/patientProfileUpdateRoute');
let patientImmunizationUpdateRoute = require('./patient/patientImmunizationUpdateRoute');
let patientPrescUpdateRoute = require('./patient/patientPrescUpdateRoute');
let patientLabUpdateRoute = require('./patient/patientLabUpdateRoute');
let patientRadioUpdateRoute = require('./patient/patientRadioUpdateRoute');
let patientAllergyUpdateRoute = require('./patient/patientAllergyUpdateRoute');
let patientNotesUpdateRoute = require('./patient/patientNotesUpdateRoute');

// Routes for Insert
let patientBillingAddRoute = require('./patient/patientBillingAddRoute');
let patientImmunizationAddRoute = require('./patient/patientImmunizationAddRoute');
let patientPrescAddRoute = require('./patient/patientPrescAddRoute');
let patientLabAddRoute = require('./patient/patientLabAddRoute');
let patientRadioAddRoute = require('./patient/patientRadioAddRoute');
let patientAllergyAddRoute = require('./patient/patientAllergyAddRoute');
let patientNotesAddRoute = require('./patient/patientNotesAddRoute');

// Routes for Delete
let patientBillingDeleteRoute = require('./patient/patientBillingDeleteRoute');
let patientImmunizationDeleteRoute = require('./patient/patientImmunizationDeleteRoute');
let patientNotesDeleteRoute = require('./patient/patientNotesDeleteRoute');


let patientImmunizationRoute = require('./patient/patientImmunizationRoute');
let patientPrescriptionRoute = require('./patient/patientPrescriptionRoute');
let patientLabResultRoute = require('./patient/patientLabResultRoute');
let patientRadiologyRoute = require('./patient/patientRadiologyRoute');
let patientAllergyRoute = require('./patient/patientAllergyRoute');

//Adding provider route functions
let searchProviderRoute = require('./provider/searchProviderRoute');
let allProviders = require('./provider/allProviders');
let providerProfileRoute = require('./provider/providerProfileRoute');
let updateProviderRoute = require('./provider/updateProviderRoute');
let deleteProviderRoute = require('./provider/deleteProvider');

/**
 * Define routes
 */

// Login Page
router.get('/login', loginRoute.get);
router.post('/login', loginRoute.post);

// Logout
router.get('/logout', logoutRoute.get);

// Register care provider page
router.get('/register', registerRoute.get);
router.post('/register', registerRoute.post);

//Patient search and results page
router.get('/patient/search', searchPatientRoute.get);
router.post('/patient/search', searchPatientRoute.post);

// Add new patient page
router.get('/patient/new', addNewPatientRoute.get);
router.post('/patient/new', addNewPatientRoute.post);

// Patient profile page
router.get('/patient/:id/profile', patientProfileRoute.get);
router.get('/patient/:id/ProfileUpdate', patientProfileUpdateRoute.get);
router.post('/patient/ProfileUpdate', patientProfileUpdateRoute.post);

// Edit/Update patient details
router.get('/patient/:id/update', updatePatientRoute.get);

// This route loads the Main Menu for the patient page
router.get('/patient/:id/main', patientMenuRoute.get);

// Route for billing information
router.get('/patient/:id/billing', patientBillingRoute.get);
router.get('/patient/:id/BillingUpdate', patientBillingUpdateRoute.get);
router.post('/patient/BillingUpdate', patientBillingUpdateRoute.post);
router.get('/patient/:id/BillingAdd', patientBillingAddRoute.get);
router.post('/patient/BillingAdd', patientBillingAddRoute.post);
router.get('/patient/:id/BillingDelete', patientBillingDeleteRoute.get);
router.post('/patient/BillingDelete', patientBillingDeleteRoute.post);


// Route for Immunization Status
router.get('/patient/:id/immunization', patientImmunizationRoute.get);
router.get('/patient/:id/:vac/ImmunizationUpdate', patientImmunizationUpdateRoute.get);
router.post('/patient/ImmunizationUpdate', patientImmunizationUpdateRoute.post);
router.get('/patient/:id/ImmunizationAdd', patientImmunizationAddRoute.get);
router.post('/patient/ImmunizationAdd', patientImmunizationAddRoute.post);
router.get('/patient/:id/:vac/ImmunizationDelete', patientImmunizationDeleteRoute.get);
router.post('/patient/ImmunizationDelete', patientImmunizationDeleteRoute.post);


// Route for Prescription
router.get('/patient/:id/prescription', patientPrescriptionRoute.get);
router.get('/patient/:id/:presc/PrescUpdate', patientPrescUpdateRoute.get);
router.post('/patient/PrescUpdate', patientPrescUpdateRoute.post);
router.get('/patient/:id/PrescAdd', patientPrescAddRoute.get);
router.post('/patient/PrescAdd', patientPrescAddRoute.post);


// Route for Lab Result
router.get('/patient/:id/labresult', patientLabResultRoute.get);
router.get('/patient/:id/:lab/LabUpdate', patientLabUpdateRoute.get);
router.post('/patient/LabUpdate', patientLabUpdateRoute.post);
router.get('/patient/:id/LabAdd', patientLabAddRoute.get);
router.post('/patient/LabAdd', patientLabAddRoute.post);


//Route for Radiology
router.get('/patient/:id/radiology', patientRadiologyRoute.get);
router.get('/patient/:id/:radio/RadioUpdate', patientRadioUpdateRoute.get);
router.post('/patient/RadioUpdate', patientRadioUpdateRoute.post);
router.get('/patient/:id/RadioAdd', patientRadioAddRoute.get);
router.post('/patient/RadioAdd', patientRadioAddRoute.post);


//Route for Allergies
router.get('/patient/:id/allergy', patientAllergyRoute.get);
router.get('/patient/:id/:allergy/AllergyUpdate', patientAllergyUpdateRoute.get);
router.post('/patient/AllergyUpdate', patientAllergyUpdateRoute.post);
router.get('/patient/:id/AllergyAdd', patientAllergyAddRoute.get);
router.post('/patient/AllergyAdd', patientAllergyAddRoute.post);

//Route for Patient Notes
router.get('/patient/:id/NotesUpdate', patientNotesUpdateRoute.get);
router.post('/patient/NotesUpdate', patientNotesUpdateRoute.post);
router.get('/patient/:id/NotesDelete', patientNotesDeleteRoute.get);
router.post('/patient/NotesDelete', patientNotesDeleteRoute.post);
router.get('/patient/:id/NotesAdd', patientNotesAddRoute.get);
router.post('/patient/NotesAdd', patientNotesAddRoute.post);

//Care provider search and results page
router.get('/provider/search', searchProviderRoute.get);
router.post('/provider/searchresults', searchProviderRoute.post);

// Care provider profile page
router.get('/provider/:id', providerProfileRoute.get);

//Care provider all results page
router.get('/provider', allProviders.get);

// Edit/Update care provider details
router.get('/provider/:id/update', updateProviderRoute.get);
router.put('/provider/:id', updateProviderRoute.put);

// Delete care provider
router.get('/delete/:id', deleteProviderRoute.delete);

//Catch all route
router.get('*', (req, res) => {
	res.redirect('/patient/search');
});
module.exports = router;
