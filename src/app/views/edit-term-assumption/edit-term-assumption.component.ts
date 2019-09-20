// import { Component, OnInit } from '@angular/core';
// import { BudgetTerm, TermAssumption, RfpAssumption } from 'src/app/models/BudgetTerm';
// import { RebuildBudgetTermService } from 'src/app/services/rebuild-budget-item.service';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { AlignRfpPeriodWithTermChangeService } from 'src/app/services/align-rfp-period-with-term-change.service';

// @Component({
//   selector: 'app-edit-term-assumption',
//   templateUrl: './edit-term-assumption.component.html',
//   styleUrls: ['./edit-term-assumption.component.scss']
// })
// export class EditTermAssumptionComponent implements OnInit {

//   private editingBugetTerm: BudgetTerm
//   private editingAssumption: TermAssumption;
//   private editingRowIndex:number;
//   private editingRfpRowIndex:number;
//   private editingRfpRowData: RfpAssumption[];
//   private editingAssumptionFormGroup: FormGroup;
//   private showRemoveAssumptionDialog: boolean;

//   public get rowData():TermAssumption[]{
//     return this.editingBugetTerm.editingTermAssumptions;
//   }

//   constructor(
//     private rebuildBudgetTermService: RebuildBudgetTermService,
//     private alignRfpPeriodService: AlignRfpPeriodWithTermChangeService,

//   ) { }

//   ngOnInit() {
//   }
//   public rebuildBudget() {
//     this.rebuildBudgetTermService.bugetTerm = this.editingBugetTerm;
//     this.rebuildBudgetTermService.execute();
//   }
//   public saveHandler({ sender, rowIndex, formGroup, isNew }) {

//     var oldTermTo = new Date(this.editingAssumption.termTo.getTime());
//     var newTermTo = new Date(this.editingAssumptionFormGroup.get('termTo').value);

//     this.editingAssumption.evpTo = this.editingAssumptionFormGroup.get('evpTo').value;
//     this.editingAssumption.evpMD = this.editingAssumptionFormGroup.get('evpMD').value;
//     this.editingAssumption.termTo = this.editingAssumptionFormGroup.get('termTo').value;
//     this.editingAssumption.termMD = this.editingAssumptionFormGroup.get('termMD').value;
//     this.editingAssumption.remarks = this.editingAssumptionFormGroup.get('remarks').value;

//     if(oldTermTo!=null && newTermTo!=null){
//       this.alignRfpPeriodService.newDate = newTermTo;
//       this.alignRfpPeriodService.oldDate = oldTermTo;
//       this.alignRfpPeriodService.rfpAssumptions = this.editingAssumption.rfpAssumptions;

//       this.alignRfpPeriodService.execute();
//     }
    
//     this.rebuildBudget();
//     this.editingRowIndex = -1;
//     this.editingAssumption = null;
//     sender.closeRow(rowIndex);
//   }
//   public removeHandler(event) {
//     this.editingRowIndex = event.rowIndex;
//     this.showRemoveAssumptionDialog = true;
//   }
//   public addHandler({ sender }) {
//     if (this.editingRowIndex != null && this.editingRowIndex > 0) {
//       sender.closeRow(this.editingRowIndex);
//       this.editingRowIndex = -1;
//       this.editingAssumption = null;
//       this.editingRfpRowIndex = -1;
//     }
//     var newAssumption = new TermAssumption();
//     var lastAssumption = this.rowData[this.rowData.length - 1];
//     var termTo = new Date(lastAssumption.termTo.getTime());
//     var prevEndDate = new Date(termTo.getTime());

//     prevEndDate.setDate(prevEndDate.getDate() + 1);
//     newAssumption.budgetTermId = this.editingBugetTerm.budgetTermId;
//     newAssumption.evpFrom = null;
//     newAssumption.evpTo = null;
//     newAssumption.evpMD = lastAssumption.evpMD;
//     newAssumption.termFrom = null;
//     newAssumption.termTo = null;
//     newAssumption.termMD = lastAssumption.termMD;
//     newAssumption.remarks = '';
//     newAssumption.prevEndDate = null;

//     this.rowData.push(newAssumption);
//     this.editingAssumption = newAssumption;
//     this.rebuildBudget();

//     this.editingAssumptionFormGroup = new FormGroup({
//       'budgetTermId': new FormControl(newAssumption.budgetTermId),
//       'evpTo': new FormControl(newAssumption.evpTo, []),
//       'evpMD': new FormControl(newAssumption.evpMD, []),
//       'termTo': new FormControl(newAssumption.termTo, [Validators.required]),
//       'termMD': new FormControl(newAssumption.termMD, [Validators.required, Validators.pattern("([0-9]{2})(\/)([0-9]{2})")]),
//       'remarks': new FormControl(newAssumption.remarks)
//     })

//     this.editingRowIndex = this.rowData.length - 1
//     sender.editRow(this.editingRowIndex, this.editingAssumptionFormGroup);
//   }
//   public cancelHandler({ sender, rowIndex }) {
//     this.editingRowIndex = -1;
//     sender.closeRow(rowIndex);
//   }
//   public expandHandler(event) {
//     this.editingAssumption = event.dataItem;
//     this.editingRfpRowData = event.dataItem.rfpAssumptions;
//   }
//   public collapseHandler(event) {
//     this.editingRfpRowIndex = -1;
//   }
// }
