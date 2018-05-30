"use strict";

import Joi from 'Joi';
import { roles } from '../../service/models/auth';

const login = {
	body: {
			username: Joi.string().email().required(),
      password: Joi.string().min(8).max(128).required()
    }
};

module.exports = {
	login
};
