
function validatePresence(errors, form, field) {
    if(form[field].trim() !== "") {
        return errors
    }

    return addError(errors, field, `${field} can't be empty`)
}

function validateLength(errors, form, field, min, max) {
    if(form[field].trim().length < min) {
        return addError(errors, field, `${field} must be at least ${min} long.`)
    }

    if(form[field].trim().length > max) {
        return addError(errors, field, `${field} can't be more than ${max} long.`)
    }

    return errors
}

function validateEmail(errors, form, field){
	const filter = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/

	if(filter.test(form[field])){
		return errors
	}

	return addError(errors, field, 'not a valid email')
}

function validateNumeric(errors, form, field) {
	const number = /[0-9]/

	if(!form[field].match(number)) {
		return addError(errors, field, `${field} must contain at least one number`)
	}

	return errors
}

function validatePassword(errors, form, field) {
	errors = validatePresence(errors, form,'password')
	errors = validateNumeric(errors, form, 'password')
    errors = validateLength(errors, form, 'password', 6, 15)

	return errors
}

function validateZip(errors, form, field) {
    const letters = /[a-zA-Z]/

    errors = validatePresence(errors, form, 'zip')
    errors = validateNumeric(errors, form, 'zip')
    errors = validateLength(errors, form, 'zip', 5, 5)

    if(form[field].match(letters)){
        return addError(errors, field, `${field} cannot contain letters`)
    }
    return errors
}

function confirmPassword(errors, form, field) {
    let password = form['password']

    if (!form[field].match(password)){
        return addError(errors, field, 'passwords do not match')
    }
    return errors
}

function addError(errors, field, error) {
	if(errors[field]) {
		errors[field].push(error)
	} else {
		errors[field] = [error]
	}

	return errors
}


module.exports = {
	validatePresence: validatePresence,
	validateLength: validateLength,
	validateEmail: validateEmail,
	validateNumeric: validateNumeric,
	validatePassword: validatePassword,
    validateZip: validateZip,
    confirmPassword: confirmPassword,
	addError: addError,
}
