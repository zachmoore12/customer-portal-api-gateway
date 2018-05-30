const path = require('path');

require('dotenv-safe').load({
  path: path.join(__dirname, '../.env'),
	sample: path.join(__dirname, '../.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {},
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
	jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES || 30
};
