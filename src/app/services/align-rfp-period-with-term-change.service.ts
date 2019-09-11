import { Injectable } from '@angular/core';
import { DateRangeMDService } from './date-range-md.service';
import { RfpAssumption } from '../models/BudgetTerm';

@Injectable({
  providedIn: 'root'
})
export class AlignRfpPeriodWithTermChangeService {

  public oldDate: Date;
  public newDate: Date;
  public rfpAssumptions: RfpAssumption[];

  constructor(
    private dateRangeMDService: DateRangeMDService
  ) { }

  public execute(){
    if(this.oldDate != null && this.newDate !=null){
      var diffMD = this.dateRangeMDService.calcMDwithNegetiveResult(this.oldDate, this.newDate);

      for(var i=0;i<this.rfpAssumptions.length;i++){
        var rfp = this.rfpAssumptions[i];
        var mdArr = diffMD.split("/");
        var months = parseInt(mdArr[0]);
        var days = parseInt(mdArr[1]) - 1;

        rfp.rfpFrom.setMonth(rfp.rfpFrom.getMonth() + months);
        rfp.rfpFrom.setDate(rfp.rfpFrom.getDate() + days);
        rfp.rfpTo.setMonth(rfp.rfpTo.getMonth() + months);
        rfp.rfpTo.setDate(rfp.rfpTo.getDate() + days);
      }
    }
  }
}
