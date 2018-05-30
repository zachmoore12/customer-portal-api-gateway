"use strict";

import httpStatus from 'http-status';
import moment from 'moment-timezone';

const Auth = require('./models/auth');
const { jwtExpirationInterval } = require('../config');

function generateToken(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = Auth.generateToken(user.id, user.userName, jwtExpirationInterval).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType, accessToken, refreshToken, expiresIn
  };
}

const login = async (req, res, next) => {
  try {
    const { user, accessToken } = await Auth.findWithToken(req.body);
    const token = generateToken(user, accessToken);
    return res.json({ token, user });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
	login
};
