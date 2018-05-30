import express from 'express';
import proxy from 'http-proxy-middleware';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { logs, port } from './config';
import { v1 } from './api/routes/v1';

const app = express();

app.use(morgan(logs));
app.use(cors());
app.use(helmet());

// Healthcheck and login/register
app.use('/v1', v1);

// TODO - fill in temporary proxies before writing service discovery
// Protected routes
const apiUsers = proxy('/api/users', {
	target: 'users.mydomain.com:3002/api/v1/users'
});
app.use(apiUsers);

// Unprotected Routes (get product, charge card, etc)
// ....
// END TODO


app.listen(port, () => {});

module.exports = app;
