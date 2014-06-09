
trimInput = function(value)
{
    return value.replace(/^s*$/g,'');
};

/**
 * Checks whether input field is empty or filled 
 */

isNotEmpty = function(value)
{
    if (value && value !== '') {
	return true;
    }
    Session.set('alert','Please fill in all required fields');
    return false;
};

/**
 * Validates the email field
 */

isEmail = function(value)
{
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
	return true;
    }
    Session.set('alert','Please enter a valid email address');
    return false;
};

/**
 * Validates the password, password shall be more than 6 characters
 */

isValidPassword = function(password)
{
    if (password.length < 6) {
        Session.set('alert','Your password should be at-least 6 characters or longer.');
	return false;
    }
    return true;
};

/**
 * Checks if password field and confirm password field match
 */

areValidPasswords = function(password,confirmPassword)
{
    if (!isValidPassword(password)) {
	return false;
    }
    if (password !== confirmPassword) {
	Session.set('alert','Your two passwords are not same');
	return false;
    }
    return true;
};

/*
 * Local Variables:
 * tab-width:8
 * End:
 * ex: shiftwidth=4 tabstop=8
 */
