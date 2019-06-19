const path = require('path');
require('dotenv').config();

module.exports = {

	development: {
		client: 'mysql',
		connection: {
			host: '127.0.0.1',
			user: process.env.user,
			password: process.env.password,
			database: 'ibonfire',
			charset: 'utf8'
		}
	}
};
