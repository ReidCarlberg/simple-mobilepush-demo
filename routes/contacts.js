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
	var search = {
	    "conditionSet": {
	        "operator": "And",
	        "conditionSets": [],
	        "conditions": [{
	            "attribute": {
	                "key": "MobilePush Demographics.Device"
	            },
	                "operator": "equal",
	                "value": {
	                    "items": ["iPod touch 5G"]
	            	}
	       	 	}]
	   		 }
		};

	var messageoptions = {
	    uri: '/contacts/v1/contacts/search',
	    json: search,
	    headers: {}
	};	

	RestClient.post(messageoptions, function(err, response) {
		console.log("in contacts")
	    if(err) {
	        // error here
	        console.log(err);
	    }

	    // will be delivered with 200, 400, 401, 500, etc status codes
	    // response.body === payload from response
	    // response.res === full response from request client
	    console.log(response.body);

	    res.render('contacts', { title: 'Contact List' });

	});
});


module.exports = router;