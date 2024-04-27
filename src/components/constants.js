export const url = "https://demo-v1-env.eu-west-3.elasticbeanstalk.com"
export const MAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const validatePassword = (password) => {
    const errorMessages = [];

    if (password.length < 8 || password.length > 20) {
        errorMessages.push('Password length should be between 8 and 20 characters.\n');
    }
    if (!/[A-Z]/.test(password)) {
        errorMessages.push('Password must contain at least one uppercase character.\n');
    }
    if (!/[a-z]/.test(password)) {
        errorMessages.push('Password must contain at least one lowercase character.\n');
    }
    if (!/\d/.test(password)) {
        errorMessages.push('Password must contain at least one numeric character.\n');
    }
    if (!/[@$!%*?&]/.test(password)) {
        errorMessages.push('Password must contain at least one special symbol among @$.!-+');
    }

    return errorMessages;
};



//setErrors(validatePassword(password));

