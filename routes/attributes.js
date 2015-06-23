//messages.js
var express = require('express');
var router = express.Router();
var FuelRest = require('fuel-rest');
var options  = {
    auth: {
        // options you want passed when Fuel Auth is initialized
        clientId: process.env.FUEL_CLIENT_ID
        , clientSecret: process.env.FUEL_CLIENT_SECRET
    }
};

var RestClient = new FuelRest(options);


/* GET messages listing. */
router.get('/', function(req, res, next) {


	var messageoptions = {
	    uri: 'contacts/v1/attributeSets/name:MobilePush%20Demographics',
	    headers: {}
	};	

	RestClient.get(messageoptions, function(err, response) {
		console.log("in attributes")
	    if(err) {
	        // error here
	        console.log(err);
	    }

	    // will be delivered with 200, 400, 401, 500, etc status codes
	    // response.body === payload from response
	    // response.res === full response from request client
	    console.log(response);

	    var mobilePush = response.body;

	    res.render('Attributes', { title: 'Attributes: MobilePush Demographics', myMobilePush: mobilePush  });

	});
});


module.exports = router;