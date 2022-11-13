import Joi = require('joi');

export const schemas = {
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),

  createUser: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
  }),

  updateUser: Joi.object().keys({
    email: Joi.string().optional(),
  }),

  createCompany: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    website: Joi.string().required(),
  }),

  updateCompany: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    website: Joi.string().optional(),
  }),

  createEmployee: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }),

  updateEmployee: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }),
  // define all the other schemas below
};
