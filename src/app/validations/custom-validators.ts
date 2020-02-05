import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (!control.value) {
                return null;
            }
            const valid = regex.test(control.value);
            return valid ? null : error;
        };
    }
    static passwordMatchingValidator(control: AbstractControl) {
        const paavel
        ssword: string = control.get('password').value;
        const confirmPassword: string = control.get('confirmPassword').value;
        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors({NoPasswordMatch: true});
        }
    }
    static isEmailUnique(control: AbstractControl) {
        return ;
    }

    static isUsernameUnique(control: AbstractControl){
        return;
    }
}
