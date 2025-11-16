import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class PasswordService {
  passwordErrors:String[] = []
  static passwordMismatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(controlName)?.value;
      const confirmPassword = formGroup.get(matchingControlName)?.value;
      
      if (password !== confirmPassword) {
        formGroup.get(matchingControlName)?.setErrors({ passwordMismatch: true });
      } else {
        const confirmControl = formGroup.get(matchingControlName);
        if (confirmControl?.hasError('passwordMismatch')) {
          delete confirmControl.errors!['passwordMismatch'];
          if (Object.keys(confirmControl.errors!).length === 0) {
            confirmControl.setErrors(null);
          }
        }
      }

      return null;
    };
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const errors: ValidationErrors = {};

      const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(value);
      if (!passwordStrength) {
        errors['passwordStrength'] = true;
      }

      const minLength = 8 < value.length;
      if (!minLength) {
        this.passwordErrors.push('minlength');
      }

      const lowerCaseRequired = /[a-z]/.test(value);
      if (!lowerCaseRequired) {
        this.passwordErrors.push('lowerCaseRequired');
      }

      const upperCaseRequired = /[A-Z]/.test(value);
      if (!upperCaseRequired) {
        this.passwordErrors.push('upperCaseRequired');
      }

      const numberRequired = /\d/.test(value);
      if (!numberRequired) {
        this.passwordErrors.push('numberRequired');
      }

      const specialCharacterRequired = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
      if (!specialCharacterRequired) {
        this.passwordErrors.push('specialCharacterRequired');
      }

      return Object.keys(errors).length ? errors : null;
    }
  }
}