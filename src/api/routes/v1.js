"use strict";

import express from 'express';
import validate from 'express-validation';
import service from '../../service/auth';
import { login } from '../shapes';

const router = express.Router();

// Unprotected routes
router.get('/api/healthcheck', (req, result) => result.send('Healthy'));

router.route('/login')
	.post(validate(login), service.login);

module.exports = {
	v1: router
};
