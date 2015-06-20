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
	    uri: '/push/v1/message',
	    headers: {}
	};

	RestClient
		.get(messageoptions)
		.then(function(response) {
		    var messages = response.body;
		    console.log(messages.length);
		    res.render('messages', { title: 'Message List', myMessages: messages });
		})
	    .catch(function(err) {
	        // error here
	        console.log(err);
	        res.render('error', {title: 'Error'});
	});
});

router.get('/delete/:id', function(req, res, next) {

	console.log('in delete ' + req.params.id);
	
	var messageoptions = {
	    uri: '/push/v1/message/' + req.params.id,
	    headers: {}
	};

	RestClient
		.delete(messageoptions)
		.then(function(response) {
			res.render('result', { title: 'Delete Result', result: 'Delete successful.' });
		})
		.catch(function(err) {
			throw exception(err);
		});
});

router.get('/send/:id', function(req, res, next) {

	console.log('in send ' + req.params.id);

	var messageoptions = {
	    uri: '/push/v1/messageApp/' + req.params.id + '/send',
	    headers: {}
	};

	RestClient
		.post(messageoptions)
		.then(function(response) {
		    var token = response.body.tokenId;
	    	console.log(token);
	    	res.render('result', { title: 'Send Result', result: token });
	    })
	    .catch(function(err) {
	    	throw exception(err);
	    })
	});

module.exports = router;