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
	res.render('interactions', { title: 'Interactions List' });
});

/* GET messages listing. */
router.get('/discovery', function(req, res, next) {

	var messageoptions = {
	    uri: '/interaction/v1/rest',
	    headers: {}
	};

	RestClient
		.get(messageoptions)
		.then(function(response) {
		    var messages = response.body;
		    console.log(messages.methods);
		    res.render('interactions-discovery', { title: 'Interactions List', myMessages: messages.methods });
		})
	    .catch(function(err) {
	        // error here
	        console.log(err);
	        res.render('error', {title: 'Error'});
	});
});

/* GET messages listing. */
router.get('/collections', function(req, res, next) {

	var messageoptions = {
	    uri: '/interaction/v1/interactions',
	    headers: {}
	};

	RestClient
		.get(messageoptions)
		.then(function(response) {
		    var messages = response.body;
		    console.log(messages);
		    res.render('interactions-collections', { title: 'Interactions List', myMessages: messages.items });
		})
	    .catch(function(err) {
	        // error here
	        console.log(err);
	        res.render('error', {title: 'Error'});
	});
});

/* GET messages listing. */
router.get('/events', function(req, res, next) {

	var messageoptions = {
	    uri: '/interaction/v1/eventDefinitions',
	    headers: {}
	};

	RestClient
		.get(messageoptions)
		.then(function(response) {
		    var messages = response.body;
		    console.log(messages);
		    res.render('interactions-events', { title: 'Interactions List', myMessages: messages.items });
		})
	    .catch(function(err) {
	        // error here
	        console.log(err);
	        res.render('error', {title: 'Error'});
	});
});

/* GET messages listing. */
router.get('/experiment', function(req, res, next) {

	var messageoptions = {
	    uri: '/interaction-experimental/v1/events',
	    headers: {},
	    json: {
	    	"ContactKey": "reid.carlberg@salesforce.com",
	    	"EventDefinitionKey": "ContactEvent-ba8189e2-3e6b-39e9-a94a-09ba387f033f",
	    	"Data" : {
	    		"favoritecolor": "puce2",
	    		"lastpurchaseamount": "13.00",
	    		"startdate": "12/26/2015",
	    		"userkey": "reid.carlberg@salesforce.com"
	    	}
	    }
	};

	RestClient
		.post(messageoptions)
		.then(function(response) {
		    var messages = response.body;
		    console.log(messages);
		    res.render('interactions-experiment', { title: 'Interactions Experiment', myMessages: messages });
		})
	    .catch(function(err) {
	        // error here
	        console.log(err);
	        res.render('error', {title: 'Error'});
	});
});

module.exports = router;