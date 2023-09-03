import Joi from 'joi';

const addressSchema = Joi.object({
  recidence: Joi.string()
    .required()
    .messages({
      'base': 'Residence should be a string or a number',
      'required': 'Residence is required',
    }),

  landmark: Joi.string()
    .required()
    .messages({
      'base': 'Landmark should be a string',
      'required': 'Landmark is required',
    }),

  city: Joi.string()
    .required()
    .messages({
      'base': 'City should be a string',
      'required': 'City is required',
    }),

  state: Joi.string()
    .required()
    .messages({
      'base': 'State should be a string',
      'required': 'State is required',
    }),

  pincode: Joi.string()
    .regex(/^\d{6}$/) // Assuming 6-digit pincode, you can adjust this regex as needed
    .required()
    .messages({
      'base': 'Pincode should be a valid pincode',
      'required': 'Pincode is required',
    }),
});

export default addressSchema;
