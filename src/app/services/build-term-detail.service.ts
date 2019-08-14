import { Injectable } from '@angular/core';
import { BudgetTerm, BudgetDetailTerm } from '../models/BudgetTerm';
import { dateFieldName } from '@telerik/kendo-intl';

@Injectable({
  providedIn: 'root'
})
export class BuildTermDetailService {
  public budgetTerm: BudgetTerm;
  public startDate: Date;
  public budgetDetailTerms: BudgetDetailTerm[];

  constructor() {
    this.budgetDetailTerms = [];
  }
  private numberToEng(numOfTerm: number):string{
    var numberEnglishs = ["st", "nd", "rd"];
    if(numOfTerm - 1 >=0 && numOfTerm - 1 <=2){
      return numberEnglishs[numOfTerm - 1];
    }else{
      return "th";
    }
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

      d = new Date(contractualTerm.to.getTime());
      d.setDate(d.getDate() + 1);

    }

    return d;
  }
  public execute() {
    this.startDate = this.calcStartDate();
    this.budgetDetailTerms = [];
    var numOfTerm: number = 1;
    while (this.startDate.getTime() <= this.budgetTerm.itemEndDate.getTime()) {
      var renew = this.isRenew(numOfTerm);
      var evp: BudgetDetailTerm;
      var lease: BudgetDetailTerm;
      var rfp: BudgetDetailTerm;
      var termEng = numOfTerm + this.numberToEng(numOfTerm) + " Term";
      
      if(!renew){
        evp = this.buildDetailTerm(termEng, "EVP", this.budgetTerm.evpTermLength, this.startDate);
        this.budgetDetailTerms.push(evp);
      }else{
        evp = null;
      }
      if(evp == null){
        lease = this.buildDetailTerm(termEng, "Lease", this.budgetTerm.leaseTermLength, this.startDate);
        this.budgetDetailTerms.push(lease);
      }else{
        var leaseStartDate = new Date(evp.to.getTime());

        leaseStartDate.setDate(leaseStartDate.getDate() + 1);
        lease = this.buildDetailTerm(termEng, "Lease", this.budgetTerm.leaseTermLength, leaseStartDate);
        this.budgetDetailTerms.push(lease);
      }

      if(!renew){
        rfp = this.buildDetailTerm(termEng, "RFP", this.budgetTerm.rfpTermLength, lease.from);
        this.budgetDetailTerms.push(rfp);

      }else{
        rfp = null;
      }
      this.startDate = new Date(lease.to.getTime());
      this.startDate.setDate(this.startDate.getDate() + 1);
      numOfTerm++;
    }

  }

  buildDetailTerm(name: string, type: string, termLength: string, startDate: Date): BudgetDetailTerm {
    var detailTerm: BudgetDetailTerm = new BudgetDetailTerm();
    var from: Date = new Date(startDate);
    var to: Date = new Date(from.getTime());
    var mdArr = termLength.split("/");
    var months = parseInt(mdArr[0])
    var days = parseInt(mdArr[1]);

    if (months > 0) {
      to.setMonth(to.getMonth() + (months));
    }
    if (days > 0) {
      to.setDate(to.getDate() + days);
    }

    this.startDate = new Date(to.getTime());
    detailTerm.from = from;
    detailTerm.to = to;
    detailTerm.termType = type;
    detailTerm.termLength = termLength;
    detailTerm.budgetTermName = name;

    //this.budgetDetailTerms.push(detailTerm);
    return detailTerm
  }
}
