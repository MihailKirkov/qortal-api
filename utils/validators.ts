import validator from 'validator';


// Utility function to validate email
const isEmail = (email: string) => {
    return validator.isEmail(email);
};

export default isEmail;
