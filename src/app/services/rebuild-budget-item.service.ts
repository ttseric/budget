import { Injectable } from '@angular/core';
import { TermAssumption, BudgetTerm } from '../models/BudgetTerm';
import { DateRangeMDService } from './date-range-md.service';
import { AlignRfpPeriodWithTermChangeService } from './align-rfp-period-with-term-change.service';

@Injectable({
  providedIn: 'root'
})
export class RebuildBudgetTermService {

  public bugetTerm: BudgetTerm;

  constructor(
    private dateRangeMDService: DateRangeMDService,
    private alignRfpPeriodService: AlignRfpPeriodWithTermChangeService
  ) { }

  public execute(){
    var assumptions = this.bugetTerm.editingTermAssumptions;
    console.log('assumptions', assumptions);
    var contractualTerms = this.bugetTerm.contractualTerms;
    var today = new Date();
    var yesterday = new Date(today.getDate() -1 );
    var startDate = contractualTerms.length > 0 ? contractualTerms[0].termTo : assumptions.length > 0 ? assumptions[0].termTo : yesterday;
    startDate = new Date(startDate.getTime());
    startDate.setDate(startDate.getDate() + 1);

    var i = contractualTerms.length > 0 ? 1: 0; //no need to calc first row because it is contractual
    for(i;i<assumptions.length;i++){
      var ass = assumptions[i];
      var oldTermFrom = ass.termFrom == null? null: new Date(ass.termFrom.getTime());
      
      ass.prevEndDate = new Date(startDate.getTime());
      ass.seq = i + 1;
      
      if((!ass.evpMD || ass.evpMD.length == 0) && ass.evpTo){ //only evpTo has value, calc MD from last row end date
        ass.evpMD = this.dateRangeMDService.calcMD(startDate, ass.evpTo);
      }

      if(ass.evpMD && ass.evpMD.length > 0){
        ass.evpFrom = new Date(startDate.getTime());
        ass.evpTo = this.dateRangeMDService.calcEndDate(ass.evpFrom, ass.evpMD);
        startDate = new Date(ass.evpTo.getTime());
        startDate.setDate(startDate.getDate() + 1);
      }
      else{
        ass.evpFrom = null;
        ass.evpTo = null;
      }
      
      if((!ass.termMD || ass.termMD.length == 0) && ass.termTo){
        ass.termMD = this.dateRangeMDService.calcMD(startDate, ass.termTo);
      }

      if(ass.termMD && ass.termMD.length > 0){
        ass.termFrom = new Date(startDate.getTime());
        ass.termTo = this.dateRangeMDService.calcEndDate(ass.termFrom, ass.termMD);
        startDate = new Date(ass.termTo.getTime());
        startDate.setDate(startDate.getDate() + 1);
      }else{
        ass.termFrom = null;
        ass.termTo = null;
      }


      //adjust rfp period if term period has changed

      var newTermFrom = ass.termFrom == null? null: new Date(ass.termFrom.getTime());
      if(oldTermFrom != null && newTermFrom !=null)
      {
        this.alignRfpPeriodService.oldDate = oldTermFrom;
        this.alignRfpPeriodService.newDate = newTermFrom;
        this.alignRfpPeriodService.rfpAssumptions = ass.rfpAssumptions;
        this.alignRfpPeriodService.execute();
      }

    }
  }

}
