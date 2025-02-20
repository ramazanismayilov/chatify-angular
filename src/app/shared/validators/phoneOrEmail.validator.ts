import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneOrEmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\+[\d]+$/;

    const isValidEmail = emailPattern.test(value);
    const isValidPhone = phonePattern.test(value);
    if (!isValidEmail && !isValidPhone) {
        return { phoneOrEmail: 'Invalid email or phone number' };
    }

    return null;
}
