export function validateCredentials (authMode, formValues) {
    if(authMode === 'login' && (!formValues.email || !formValues.password)) {
        return 'Email & Password Required !' ;
    }
    else if (authMode === 'signup' && (!formValues.fullname || !formValues.email || !formValues.password)) {
        return 'All fields are required !' ;
    }
    return;
}