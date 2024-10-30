const bodyParser = require('body-parser');
//const compression = require('compression');
// const cookieParser = require('cookie-parser');
// const helmet = require('helmet');
const config = require('../config');
const logger = require('../utils/logger');

module.exports = (app) => {

	// Enable http logging
	if (config.get('server.enableHttpLogging'))
		app.use(logger.startHttpLogger());

	// Eanble CORS support
	if (config.get('server.security.enableCORS'))
		require('./CORS')(app);

	// Enable paths that we want to have it served statically
	if (config.get('server.enableStatic'))
		app.use(express.static(path.join(root, config.get('server.staticDirectory'))));

	// Enable request body parsing
	app.use(bodyParser.urlencoded({
		extended: true,
		limit: config.get('server.bodyParser.limit')
	}));

	// Enable request body parsing in JSON format
	app.use(bodyParser.json({
		limit: config.get('server.bodyParser.limit')
	}));

	// Enable request logger
	require('./requestLog')(app);
};