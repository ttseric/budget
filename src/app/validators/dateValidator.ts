import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { RfpAssumption } from '../models/BudgetTerm';

export function IsDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        console.log('isdate', control.value);
        var isDate = control.value != null && !Number.isNaN(control.value.getTime());
        console.log('isvalidateDate', isDate);
        if (isDate)
            return null;
        else {
            return { 'IsDate': { value: isDate } };
        }
    };
}
export function StartDateBiggerThanEndDate():ValidatorFn {
    return (editingRfpFormGroup: FormGroup ): { [key: string]: any} | null =>{
        if(editingRfpFormGroup == undefined)
            return null;
            var hasRfpFrom = editingRfpFormGroup.get('rfpFrom').value != null;
            var hasRfpTo = editingRfpFormGroup.get('rfpTo').value != null;
    
            if(!hasRfpFrom || !hasRfpTo)
                return null;
            
            var rfpFrom = editingRfpFormGroup.get('rfpFrom').value.getTime();
            var rfpTo = editingRfpFormGroup.get('rfpTo').value.getTime();

            if(rfpFrom > rfpTo){
                return {'StartDateBiggerThanEndDate': {value: true}};
            }

    }
}
export function CheckOverlap(editingRfpRowData: RfpAssumption[]):ValidatorFn {
    return (editingRfpFormGroup: FormGroup ): { [key: string]: any} | null =>{

        if(editingRfpFormGroup == undefined)
            return null;

        var hasRfpFrom = editingRfpFormGroup.get('rfpFrom').value != null;
        var hasRfpTo = editingRfpFormGroup.get('rfpTo').value != null;

        if(!hasRfpFrom || !hasRfpTo)
            return null;

        var rfpId = editingRfpFormGroup.get('rfpAssumptionId').value;
        var hasOverlap = false;
        var rfps = editingRfpRowData.filter(x=>x.rfpAssumptionId != rfpId);
        var rfpFrom = editingRfpFormGroup.get('rfpFrom').value.getTime();
        var rfpTo = editingRfpFormGroup.get('rfpTo').value.getTime();

        for(var i=0;i<rfps.length;i++){
            var rfp = rfps[i];

            var from = rfp.rfpFrom.getTime();
            var to = rfp.rfpTo.getTime();
            
            if(rfpFrom <= from && rfpTo >= to)
                hasOverlap = true;
            else if(rfpFrom >= from && rfpTo <= to)
                hasOverlap =  true;
            else if(rfpFrom <= from && rfpTo >= from)
                hasOverlap = true;
            else if(rfpFrom <= to && rfpTo >= to)
                hasOverlap = true;
            else
                hasOverlap = false;

            if(hasOverlap){
                return {'HasOverLap': { value: true}}
            }
        }


    }
}