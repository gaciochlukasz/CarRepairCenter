(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/validators/email.validation.ts":
/*!************************************************!*\
  !*** ./src/app/validators/email.validation.ts ***!
  \************************************************/
/*! exports provided: EmailValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailValidation", function() { return EmailValidation; });
var EmailValidation = /** @class */ (function () {
    function EmailValidation() {
    }
    EmailValidation.EmailValid = function (form) {
        var email = form.value;
        // tslint:disable-next-line:max-line-length
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = regex.test(email);
        if (!valid) {
            return { WrongEmail: { valid: false } };
        }
    };
    return EmailValidation;
}());



/***/ }),

/***/ "./src/app/validators/password.validation.ts":
/*!***************************************************!*\
  !*** ./src/app/validators/password.validation.ts ***!
  \***************************************************/
/*! exports provided: PasswordValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordValidation", function() { return PasswordValidation; });
var PasswordValidation = /** @class */ (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (form) {
        var password = form.get('newPassword').value;
        var confirmPassword = form.get('confirmPassword').value;
        if (password !== confirmPassword) {
            form.get('confirmPassword').setErrors({ MatchPassword: true }, { emitEvent: true });
        }
        else {
            return null;
        }
    };
    PasswordValidation.MatchRegistrationPassword = function (form) {
        var password = form.get('password').value;
        var passwordRepeat = form.get('passwordRepeat').value;
        if (password !== passwordRepeat) {
            form.get('passwordRepeat').setErrors({ MatchPassword: true }, { emitEvent: true });
        }
        else {
            return null;
        }
    };
    PasswordValidation.ValidCharacters = function (passwordControl) {
        var password = passwordControl.value;
        var isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/.test(password);
        if (!isValid) {
            return { WrongPassword: { valid: false } };
        }
    };
    PasswordValidation.ValidLowerCase = function (passwordControl) {
        var password = passwordControl.value;
        var isValid = /^(?=.*[a-z]).+$/.test(password);
        if (!isValid) {
            return { LowerCase: { valid: false } };
        }
    };
    PasswordValidation.ValidUpperCase = function (passwordControl) {
        var password = passwordControl.value;
        var isValid = /^(?=.*[A-Z]).+$/.test(password);
        if (!isValid) {
            return { UpperCase: { valid: false } };
        }
    };
    PasswordValidation.ValidDigit = function (passwordControl) {
        var password = passwordControl.value;
        var isValid = /^(?=.*\d).+$/.test(password);
        if (!isValid) {
            return { Digit: { valid: false } };
        }
    };
    PasswordValidation.ValidSpecChar = function (passwordControl) {
        var password = passwordControl.value;
        var isValid = /^(?=.*[^\da-zA-Z]).+$/.test(password);
        if (!isValid) {
            return { SpecChar: { valid: false } };
        }
    };
    PasswordValidation.ValidLen = function (passwordControl) {
        var password = passwordControl.value;
        var isValid = /^.{6,}$/.test(password);
        if (!isValid) {
            return { Len: { valid: false } };
        }
    };
    return PasswordValidation;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map