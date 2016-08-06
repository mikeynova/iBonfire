const User = require('../models/userModel.js');
const Helpers = require('../helpers/ctrl_helpers.js');

module.exports = {
	'/': {
		get: (req, res) => {
			console.log("Received GET at /user/");

			User.findAllUsers()
				.then((users) => {
					if (users.length === 0) {
						console.log('There are no users');
						res.end('There are no users');
					} else {
						console.log('We got users!')
						res.send(users);
					}
				})
				.catch((err) => {
            console.log('Error inside findAllUsers ', err);
        });
		},
		post: (req, res) => {
			console.log("Received POST at /user/");

			var newUser = {
				name: req.body.name,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
				cityState: req.body.cityState,
				FB_id: req.body.FB_id,
				FB_img: req.body.FB_img,
				FB_timeline: req.body.FB_timeline
			};

			User.findUserById(newUser.FB_id)
				.then((user) => {
					if (user) {
						console.log('User already exists!');
						res.end('User already exists!');
					} else {
						User.createUser(newUser)
							.then((result) => {
								console.log('Result from user controller', result);
								res.send(result);
							})
							.catch((err) => {
			            console.log('Error inside createUser ', err);
			        });
					}
				})
				.catch((err) => {
            console.log('Error inside findUserById ', err);
        });
		},
		put: (req, res) => {
			console.log("Received PUT at /user/");
			res.end("Received PUT at /user");
		},
		delete: (req, res) => {
			console.log("Received DELETE at /user/");
			res.end("Received Delete at /user");
		}
	},

	// User specs can be in the form of FB_id or latitude&longitude so that a user can be searched by either id or coordinates
	// For example:

	// Search by FB_id:
	// /user/115548485

	// Search by coordinates
	// /user/34.024212&-118.496475

	'/:user_specs': {
		get: (req, res) => {

			console.log("Received GET at /user/");


			var matchParams = req.params.user_specs;

			// This function checks for '=' to determine search field for user bonfires
			var userBonfires = Helpers.checkParamsUserBonfires(req.params.user_specs);

			if (matchParams.match("=")) {
				User.findUserBonfires(userBonfires.createdBy)
					.then((bonfires) => {
						if (!bonfires) {
							console.log('User with Facebook ID ' + userBonfires + ' has not lit any bonfires!');
							res.end('User with Facebook ID ' + userBonfires + ' has not lit any bonfires!');
						} else {
							console.log('Here are the users bonfires!');
							res.send(bonfires);
						}
					})
					.catch((err) => {
	            console.log('Error inside findUserBonfires ', err);
	        });

				return;
			}

			// This function checks the props to return a user by either location or FB ID
			var getParams = Helpers.checkParamsUser(req.params.user_specs);

			if (matchParams.match("&")) {
				User.findUserByLocation(getParams[0], getParams[1])
					.then((user) => {
						if (!user) {
							console.log('User at ' + getParams + ' does not exist!');
							res.end('User at' + getParams + ' does not exist!');
						} else {
							console.log('Found the user you are looking for!');
							res.send(user);
						}
					})
					.catch((err) => {
	            console.log('Error inside findUserByLocation ', err);
	        });
			}

			if (typeof getParams === 'string') {
				User.findUserById(getParams)
					.then((user) => {
						if (!user) {
							console.log('User with Facebook ID ' + getParams + ' does not exist!');
							res.end('User with Facebook ID ' + getParams + ' does not exist!');
						} else {
							console.log('Found the user you are looking for!');
							res.send(user);
						}
					})
					.catch((err) => {
	            console.log('Error inside findUserById ', err);
	        });
			}
		},
		post: (req, res) => {
			console.log('Received POST at /user/');
			res.end('Received POST at /user');
		},
		put: (req, res) => {
			console.log('Received PUT at /user/');
			res.end('Received PUT at /user');
		},
		delete: (req, res) => {
			console.log("Received DELETE at /user/");

			var userId = req.params.user_specs;

			User.findUserById(userId)
				.then((user) => {
					if (!user) {
						console.log('could not find user with the id of ' + userId);
						res.end('could not find user with the id of ' + userId);
					} else {
						User.deleteUser(userId)
							.then((response) => {
								console.log('deleted user with the id of ' + userId);
								res.end('deleted user with the id of ' + userId);
							})
							.catch((err) => {
			            console.log('Error inside deleteUser ', err);
			        });
					}

				})
				.catch((err) => {
            console.log('Error inside findUserById ', err);
        });
		}
	}
};

