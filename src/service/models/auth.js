"use strict";

import mongoose from 'mongoose';
import crypto from 'crypto';
import moment from 'moment-timezone';

const roles = ['admin', 'owner', 'user'];

const authSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: 'String',
    ref: 'User',
    required: true,
  },
	password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
	role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  expires: { type: Date },
});

authSchema.statics = {
  /**
   * Generate a refresh token object and saves it into the database
   *
   * @param int id
	 * @param string label
   * @returns {Auth}
   */
  generateToken(id, label, expiration = 30) {
    const token = `${id}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(expiration, 'days').toDate();
    const tokenObject = new Auth({
      token, id, label, expires
    });

    tokenObject.save();

    return tokenObject;
  },

	/**
	 * Find a User by Token
	 *
	 * @param string token
	 * @returns {User}
	 */
	async findWithToken(details) {
		const { email, password,
			Object } = details;
		    const user = await this.findOne({ userName: email }).exec();
		    const err = {
		      status: httpStatus.UNAUTHORIZED,
		      isPublic: true,
		    };
		    if (password) {
		      if (user && await user.passwordMatches(password)) {
		        return { user, accessToken: user.token() };
		      }
		      err.message = 'Incorrect email or password';
		    } else if (refreshObject && refreshObject.userEmail === email) {
		      return { user, accessToken: user.token() };
		    } else {
		      err.message = 'Incorrect email or refreshToken';
		    }
		    throw new APIError(err);
		  }

};

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;
