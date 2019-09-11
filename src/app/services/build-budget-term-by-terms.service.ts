import { Injectable } from '@angular/core';
import { BudgetTerm, TermAssumption, RfpAssumption } from '../models/BudgetTerm';

@Injectable({
  providedIn: 'root'
})
export class BuildBudgetTermByTermsService {
  public budgetTerm: BudgetTerm;
  public startDate: Date;
  public currentTermAssumptions;

  constructor() {
  }

  private isRenew(numOfTerm: number):boolean{
    var renew: boolean;
    switch (numOfTerm) {
      case 1:
        renew = this.budgetTerm.firstRenew;
        break;
      case 2:
        renew = this.budgetTerm.secondRenew;
        break;
      case 3:
        renew = this.budgetTerm.thirdRenew;
        break;
      default:
        renew = this.budgetTerm.thirdRenew;
        break;
    }
    return renew;
  }
  calcStartDate():Date{
    var d = new Date();

    if(this.budgetTerm.contractualTerms.length>0){
      var contractualTerm = this.budgetTerm.contractualTerms[0];

      d = new Date(contractualTerm.termTo.getTime());
      d.setDate(d.getDate() + 1);

    }

    return d;
  }
  public execute(){
    this.startDate = this.calcStartDate();
    this.currentTermAssumptions = [];
    
    if(this.budgetTerm.contractualTerms.length > 0){
      this.currentTermAssumptions.push(this.budgetTerm.contractualTerms[0]);
    }

    var numOfTerm: number = 1;
    while(this.startDate.getTime() <= this.budgetTerm.itemEndDate.getTime()){
      var renew  = this.isRenew(numOfTerm);
      var termAssumption: TermAssumption = new TermAssumption();
 
      termAssumption.budgetTermId = this.budgetTerm.budgetTermId;
      termAssumption.prevEndDate = new Date(this.startDate.getTime());

      if(!renew){
        this.buildEVP(this.budgetTerm.evpMD, this.startDate, termAssumption);
      }

      if(renew){
        var startDate = new Date(this.startDate.getTime());
        this.buildLease(this.budgetTerm.leaseMD, startDate, termAssumption);
      }else{
        var startDate = new Date(termAssumption.evpTo.getTime());
        startDate.setDate(startDate.getDate() + 1);
        this.buildLease(this.budgetTerm.leaseMD, startDate, termAssumption);
      }

      if(!renew){
        var startDate = new Date(termAssumption.termFrom.getTime());
        this.buildRfp(this.budgetTerm.rfpMD, startDate, termAssumption);
      }

      termAssumption.seq = numOfTerm + 1;
      this.startDate = new Date(termAssumption.termTo.getTime());
      this.startDate.setDate(this.startDate.getDate() + 1);

      this.currentTermAssumptions.push(termAssumption);
      numOfTerm++;
    }
  }
  buildRfp(rfpMD: string, startDate: Date, termAssumption: TermAssumption){
    var from: Date = new Date(startDate.getTime());
    var to: Date = new Date(from.getTime());

    var mdArr = rfpMD.split("/");
    var months = parseInt(mdArr[0])
    var days = parseInt(mdArr[1]);
    var rfpAssumption: RfpAssumption = new RfpAssumption;

    if (months > 0) {
      to.setMonth(to.getMonth() + (months));
    }
    if (days > 0) {
      to.setDate(to.getDate() + days);
    }

    to.setDate(to.getDate() - 1);

    rfpAssumption.rfpAssumptionId = this.randomNumber();
    rfpAssumption.rfpFrom = from;
    rfpAssumption.rfpTo = to;
    rfpAssumption.rfpMD = rfpMD;

    termAssumption.rfpAssumptions.push(rfpAssumption);
  }
  buildLease(leaseMD: string, startDate: Date, termAssumption: TermAssumption){
    var from: Date = new Date(startDate.getTime());
    var to: Date = new Date(from.getTime());

    var mdArr = leaseMD.split("/");
    var months = parseInt(mdArr[0])
    var days = parseInt(mdArr[1]);

    if (months > 0) {
      to.setMonth(to.getMonth() + (months));
    }
    if (days > 0) {
      to.setDate(to.getDate() + days);
    }

    to.setDate(to.getDate() - 1);

    termAssumption.termFrom = from;
    termAssumption.termTo = to;
    termAssumption.termMD = leaseMD;
  }
  buildEVP(evpMD: string, startDate: Date, termAssumption: TermAssumption){
    var from: Date = new Date(startDate.getTime());
    var to: Date = new Date(from.getTime());

    var mdArr = evpMD.split("/");
    var months = parseInt(mdArr[0])
    var days = parseInt(mdArr[1]);

    if (months > 0) {
      to.setMonth(to.getMonth() + (months));
    }
    if (days > 0) {
      to.setDate(to.getDate() + days);
    }

    to.setDate(to.getDate() - 1);

    termAssumption.evpFrom = from;
    termAssumption.evpTo = to;
    termAssumption.evpMD = evpMD;
    termAssumption.evpToError = "error here";
  }
  public randomNumber(): number {
    return Math.floor(Math.random() * 101);
  }
}
