/*Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'Username',
        fieldLabel: 'Username',
        inputType: 'text',
        visible: true,
        saveToProfile: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Enter your username");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('You must accept the terms and conditions.');
                return false;
            }
        }
    }]
});*/
