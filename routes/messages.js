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
		    //console.log(messages);
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
	    	res.render('result', { title: 'Send Result', result: token, id: req.params.id });
	    })
	    .catch(function(err) {
	    	throw exception(err);
	    })
	});

router.get('/sendOneMinute/:id', function(req, res, next) {

	console.log('in send ' + req.params.id);

	var messageoptions = {
	    uri: '/push/v1/messageApp/' + req.params.id + '/send',
	    headers: {},
	    json: {
		    "Override": true,
		    "MessageText": "New information available!",
		    "SendTime": "2015-12-10 15:10"
	    }
	};

	RestClient
		.post(messageoptions)
		.then(function(response) {
		    var token = response.body.tokenId;
	    	console.log(token);
	    	res.render('result', { title: 'Send One Minute Result', result: token, id: req.params.id });
	    })
	    .catch(function(err) {
	    	throw exception(err);
	    })
	});

router.get('/customize/:id', function(req, res, next) {
	res.render('message-customize', { title: 'Customize & Send', messageId: req.params.id });
})

router.post('/contact', function(req, res, next) {

	console.log('in send id ' + req.body.id);
	console.log('in send sub ' + req.body.subscriberKey);
	console.log('in send msg ' + req.body.message);

	var messageoptions = {
	    uri: '/push/v1/messageContact/' + req.body.id + '/send',
	    headers: {},
	    json: {
	    	"SubscriberKeys": [
	    		req.body.subscriberKey
	    	],
	    	"Override":true,
	    	"MessageText":req.body.message,
	    	"SendTime": "2012-10-31 09:00"
	    }
	};

	RestClient
		.post(messageoptions)
		.then(function(response) {
		    var token = response.body.tokenId;
	    	console.log(token);
	    	res.render('result', { title: 'Send Result', result: token, id: req.body.id });
	    })
	    .catch(function(err) {
	    	throw exception(err);
	    })
	});

router.get('/status/:id/:token', function(req, res, next) {

	console.log('in status ' + req.params.id + ' token ' + req.params.token);

	var messageoptions = {
	    uri: '/push/v1/messageList/' + req.params.id + '/deliveries/' + req.params.token,
	    headers: {}
	};

	RestClient
		.get(messageoptions)
		.then(function(response) {
		    var status = response.body;
	    	console.log(status);
	    	res.render('result', { title: 'Send Result', result: req.params.token, id: req.params.id, status: status });
	    })
	    .catch(function(err) {
	    	throw exception(err);
	    })
	});

module.exports = router;