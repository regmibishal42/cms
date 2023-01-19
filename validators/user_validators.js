import Joi from "joi";

const create_user_validation = Joi.object({
    username:Joi.string().min(4).required(),
    password:Joi.string().min(4).max(20).required(),
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    image:Joi.string().min(5).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    role:Joi.string().valid('customer').required()
});

const parameters_validation = Joi.object({
    id:Joi.number().required().greater(0)
});

const user_role_validation = Joi.object({
    id:Joi.number().required().greater(0),
    role:Joi.string().valid('customer','admin','employee').required(),
});

const user_update_validation = Joi.object({
    id:Joi.number().required().greater(0),
    password:Joi.string().min(4).max(20).optional(),
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const login_credentials_validator = Joi.object({
    username:Joi.string().min(4).max(20).required(),
    password:Joi.string().min(4).max(20).required(),
})

const userValidator = {
    create_user_validation,
    parameters_validation,
    user_update_validation,
    user_role_validation,
    login_credentials_validator
};

export default userValidator;