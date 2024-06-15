const {check} = require('express-validator')

exports.passwordResetValidator = [
    check('email','Please include a valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
]