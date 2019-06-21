//strict mode
'use strict';

//dotenv for personal environment
require('dotenv').config(); // Run this first to ensure all environment variables are set

// Express to use JS in backend
let express = require('express');

let methodOverride = require('method-override');

//Connects REST routes
let router = require('./router/router');

//Creates sessions for login authentication
let session = require('express-session'),
	defaultSessionValues = require('../middleware/default-session-values'),
	authentication = require('../middleware/authentication');

//Adding flash messages
let flash = require('connect-flash');

// Create an instance of an express application
const app = express();

//Allows HTML page rendering
app.set('view engine', 'ejs');

//Allows CSS
app.use(express.static('public'));

// Parse all incoming <form> data into an object we can access in our routes with `req.body`
app.use(express.urlencoded({ extended: true }));

//to use put and delete requests
app.use(methodOverride('_method'));

//Express Session middleware
app.use(
	session({
		secret            : process.env.SESSION_SECRET, // Used to cryptographically "sign" the session ID
		resave            : false, // Forces the session to be saved back to the session store, just a sane default
		saveUninitialized : true, // All HTTP requests without a session have a session started for them
		cookie            : {
			httpOnly : true, // Makes cookie inaccessible to client side JS
			maxAge   : 12000000 // Cookie will expire after two hours
		}
	})
);

//Connecting flash
app.use(flash());
app.use(function(req, res, next) {
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// Middleware to prepare default values for sessions
// This must come after the session middleware to ensure its values are set properly
app.use(defaultSessionValues);

//Connects all routes
app.use(router);

// isLoggedIn - authentication middleware
app.use(authentication);

/**
 * Start server
 */
app.listen(process.env.HTTP_PORT, () => {
	console.log(`Express server started on port ${process.env.HTTP_PORT}.`);
});
