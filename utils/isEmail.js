import validator from 'validator';

// Utility function to validate email
const isEmail = (email) => {
    return validator.isEmail(email);
};

export default isEmail;
