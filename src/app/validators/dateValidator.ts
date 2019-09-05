import { AbstractControl, ValidatorFn } from '@angular/forms';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

export function IsDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        var isDate = control.value != null && !Number.isNaN(control.value.getTime());
        console.log('isvalidateDate', isDate);
        if (isDate)
            return null;
        else {
            return { 'IsDate': { value: isDate } };
        }
    };
}

export function SmallerThanMaxDate(maxDate: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

        console.log('max date', maxDate);
        console.log('max date control', control);
        var isSmallerThanMaxDate = control.value.getTime() < maxDate.getTime();

        if (isSmallerThanMaxDate)
            return null;
        else {
            return { 'SmallerThanMaxDate': { value: isSmallerThanMaxDate } };
        }
    };
}

export function BiggerThanMinDate(minDate: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        var isBiggerThanMinDate = control.value.getTime() > minDate.getTime();
        console.log('isbiggerthanmindate: ', isBiggerThanMinDate)
        if (isBiggerThanMinDate) {
            return null;
        } else {
            return { 'BiggerThanMinDate': { value: isBiggerThanMinDate } };
        }
    }
}
