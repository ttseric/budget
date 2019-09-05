import { AbstractControl, ValidatorFn } from '@angular/forms';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

export function DateValidator():ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} | null => {
        var isValidDate = control.value != null && !Number.isNaN(control.value.getTime());

        console.log('isvalidateDate', isValidDate);
        if(isValidDate)
        return null;
        else{
            return {'ValidDate': {value: isValidDate }};
        }
      };
}
