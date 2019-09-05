import { Component, OnInit } from '@angular/core';
import { GridDef, SortModel } from 'src/app/models/gridDef';
import { GridDefService } from 'src/app/services/grid-def.service';
import { ColDefService } from 'src/app/services/col-def.service';
import { ColumnApi, GridApi, GridOptions } from "ag-grid-community";
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';
import { forkJoin } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';
import * as $ from 'jquery';
import * as _ from "lodash";
import 'jquery-ui/ui/widgets/datepicker';
import { BudgetTerm, TermAssumption, RfpAssumption } from 'src/app/models/BudgetTerm';
import { BuildBudgetTermByTermsService } from 'src/app/services/build-budget-term-by-terms.service';
import { RevenueGridColDefService } from 'src/app/services/revenue-grid-col-def.service';
import { Router } from '@angular/router';
import { TermAssumptionColDefService } from 'src/app/services/term-assumption-col-def.service';
import { GridComponentsService } from 'src/app/services/grid-components.service';
import { DateRangeMDService } from 'src/app/services/date-range-md.service';
import { RebuildBudgetItemService } from 'src/app/services/rebuild-budget-item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateValidator } from 'src/app/validators/dateValidator';
import { send } from 'q';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public gridContext = { componentParent: this};
  public showDataRow = null;
  public revenueGridOptions = { alignedGrids: [], suppressHorizontalScroll: true };
  public revenueFooterGridOptions = { alignedGrids: [] };
  public showEditAssumptionDialog = false;
  public pcRowData = [];
  public rentRowData = [];
  public currentTermReadOnlyDataRow = [];
  public editingTermAssumptionRowData = [];
  public editingRfpRowData =[];
  public editingBudgetTerm: BudgetTerm;

  private pcGridApi: GridApi;
  private rentGridApi: GridApi;
  private pcGridColumnApi: ColumnApi;
  private rentGridColumnApi: ColumnApi;
  private revenueGridApi: GridApi;
  private revenueGridColumnApi: ColumnApi;
  private currentTermReadonlyGridApi: GridApi;
  private currentTermReadOnlyColumnApi: ColumnApi;
  public components;
  public showMenu: boolean = false;
  public centreTop;
  public centreLeft;
  public width;

  public get termAssumptionReadOnlyColDefs() {
    return this.termAssumptionColDefService.termAssumptionReadOnlyColDefs;
  }
  public get rfpAssumptionReadOnlyColDefs() {
    return this.termAssumptionColDefService.rfpAssumptionReadOnlyColDefs;
  }
  public onToggle(): void {
    this.showMenu = !this.showMenu;
  }
  public get defaultColDef() {
    return this.colDefService.defaultColDef
  }
  public get revenueDefaultColDefs() {
    return this.revenueGridColDefService.defaultColDef;
  }
  public get revenueRowData() {
    return this.revenueGridColDefService.rowData;
  }
  public get revenueFooterRowData() {
    return this.revenueGridColDefService.footerRowData;
  }
  public get revenueColDefs() {
    return this.revenueGridColDefService.colDef;
  }
  public get revenueFooterColDefs() {
    return this.revenueGridColDefService.footerColDef;
  }
  public get termAssumptionGridColDefs() {
    return this.termAssumptionColDefService.termAssumptionColDefs;
  }

  public get pcGridColDefs() {
    return this.colDefService.pcGridColumnDefs;
  }
  public get rentGridColDefs() {
    return this.colDefService.rentGridColumnDefs;
  }
  public get currentTermColDefs() {
    return this.colDefService.currentTermGridColumnDefs;
  }


  public rfpAssumptionColDefs;
  constructor(
    private router: Router,
    private gridDefService: GridDefService,
    private colDefService: ColDefService,
    private notificationService: NotificationService,
    private buildBudgetTermByTermsService: BuildBudgetTermByTermsService,
    private revenueGridColDefService: RevenueGridColDefService,
    private termAssumptionColDefService: TermAssumptionColDefService,
    private gridComponentService: GridComponentsService,
    public dateRangeMDService: DateRangeMDService,
    public rebuildBudgetItemService: RebuildBudgetItemService
  ) {
    this.components = gridComponentService.components;
    this.revenueGridOptions.alignedGrids.push(this.revenueFooterGridOptions);
    this.revenueFooterGridOptions.alignedGrids.push(this.revenueGridOptions);
  }


  ngOnInit() {
    this.showDataRow = this.revenueRowData[0];
    this.pcRowData = this.showDataRow.pcCharges;
    this.rentRowData = this.showDataRow.rentReviews;
    this.currentTermReadOnlyDataRow = this.showDataRow.currentTermAssumptions;
    this.editingTermAssumptionRowData = this.showDataRow.editingTermAssumptions;
  }
  onCellFocused(event) {
    if (event.rowIndex == null)
      return;
    var row = this.revenueGridApi.getDisplayedRowAtIndex(event.rowIndex);
    this.showDataRow = row.data;
    this.pcRowData = row.data.pcCharges;
    this.rentRowData = row.data.rentReviews;
    this.currentTermReadOnlyDataRow = this.showDataRow.currentTermAssumptions;
    this.editingTermAssumptionRowData = this.showDataRow.editingTermAssumptions;
  }
  public goHomePage() {
    this.router.navigateByUrl('')
  }

  rebuidAllDetail(){
    for(var i=0;i<this.revenueRowData.length;i++){
      var budgeTerm = this.revenueRowData[i];

      this.rebuildDetail(budgeTerm);
    }
  }
  rebuildDetail(budgeTerm: BudgetTerm) {

    this.buildBudgetTermByTermsService.budgetTerm = budgeTerm;
    this.buildBudgetTermByTermsService.execute();

    budgeTerm.currentTermAssumptions = this.buildBudgetTermByTermsService.currentTermAssumptions;
    budgeTerm.editingTermAssumptions = _.cloneDeep(budgeTerm.currentTermAssumptions);
    this.editingTermAssumptionRowData = budgeTerm.editingTermAssumptions;

    if (this.currentTermReadonlyGridApi) {
      this.currentTermReadonlyGridApi.setRowData([]);
      this.currentTermReadonlyGridApi.updateRowData({ add: budgeTerm.currentTermAssumptions });
    }

  }

  onRevenueGridReady(params) {
    this.revenueGridApi = params.api;
    this.revenueGridColumnApi = params.columnApi;
    this.revenueGridColumnApi.autoSizeAllColumns();
    this.rebuidAllDetail();
    this.gridDefService.getGridDef("revenueGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.revenueGridApi, this.revenueGridColumnApi, response.gridDef);
      }
    })
  }
  onRevenueFooterGridReady(params) {

  }
  onCurrentTermReadOnlyGridReady(params) {
    this.currentTermReadonlyGridApi = params.api
    this.currentTermReadOnlyColumnApi = params.columnApi;
    this.currentTermReadOnlyColumnApi.autoSizeAllColumns();
    this.currentTermReadOnlyDataRow = this.showDataRow.currentTermAssumptions;
  }
  onRfpAssumptionGridReady(params) {
  }

  onPCGridReady(params) {
    this.pcGridApi = params.api;
    this.pcGridColumnApi = params.columnApi;
    this.pcGridColumnApi.autoSizeAllColumns();
    this.gridDefService.getGridDef("pcGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.pcGridApi, this.pcGridColumnApi, response.gridDef);
      }
    })
  }
  onRentGridReady(params) {
    this.rentGridApi = params.api;
    this.rentGridColumnApi = params.columnApi;
    this.rentGridColumnApi.autoSizeAllColumns();
    this.gridDefService.getGridDef("rentGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.rentGridApi, this.rentGridColumnApi, response.gridDef);
      }
    })
  }

  configGrid(gridApi: GridApi, columnApi: ColumnApi, gridDef: GridDef) {
    var colStates = gridDef.colStates;
    var sortModels = gridDef.sortModels;

    columnApi.setColumnState(colStates);
    gridApi.setSortModel(sortModels);
  }

  saveGrids() {
    var responses = [];
    if (this.pcGridApi != undefined) {
      var r = this.saveGrid("pcGrid", this.pcGridApi, this.pcGridColumnApi);
      responses.push(r);
    }
    if (this.rentGridApi != undefined) {
      var r = this.saveGrid("rentGrid", this.rentGridApi, this.rentGridColumnApi);
      responses.push(r);
    }

    if (this.revenueGridApi != undefined) {
      var r = this.saveGrid("revenueGrid", this.revenueGridApi, this.revenueGridColumnApi);
      responses.push(r);
    }

    var join = forkJoin(responses);
    join.subscribe(responses => {
      this.notificationService.show({
        content: 'Grid settings saved.',
        cssClass: 'button-notification',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'center', vertical: 'top' },
        type: { style: 'success', icon: true },
        hideAfter: 2000
      });
    })
  }
  saveGrid(gridName: string, gridApi: GridApi, columnApi: ColumnApi) {
    if (gridApi == undefined)
      return;

    var sortModels: SortModel[] = gridApi.getSortModel();
    var columnStates: ColumnState[] = columnApi.getColumnState();
    var gridDef: GridDef = {
      gridName: gridName,
      sortModels: sortModels,
      colStates: columnStates
    }

    return this.gridDefService.save(gridDef);
  }

  public close() {
    this.showEditAssumptionDialog = false;
    this.editingAssumption = null;
    this.editingRowIndex = -1;
    this.editingRfpRowIndex = -1;
  }

  public get getRevenueMenu() {
    return this.getRevenueContextMenuItems.bind(this);
  }
  getRevenueContextMenuItems(params) {
    var menuItems = [];
    var budgetTerm = params.node.data;

    if (budgetTerm != null && budgetTerm.isLocked == false) {
      menuItems.push({
        name: "Rebuild Terms",
        action: () => {
          this.rebuildDetail(params.node.data);
        }
      });
      menuItems.push({
        name: "Edit Terms",
        action: () => {
          this.editingBudgetTerm = budgetTerm;
          this.showEditAssumptionDialog = true;
          this.centreTop = 20;
          this.width = window.innerWidth * 0.8 > 1300 ? 1300: window.innerWidth * 0.8;
          this.centreLeft = (window.innerWidth - this.width) / 2;
        }
      });

      if (!budgetTerm.isLocked) {
        menuItems.push({
          name: "Lock",
          action: () => {
            budgetTerm.isLocked = true;
          }
        })
      }
    } else {
      menuItems.push({
        name: "Un-Lock",
        action: () => {
          budgetTerm.isLocked = false;
        }
      })
    }

    menuItems.push("separator");
    menuItems.push("copy");
    menuItems.push("copyWithHeaders");
    menuItems.push("export");

    return menuItems;
  }

  getBudgetTerm(budgetTermId: number): BudgetTerm {
    return this.revenueRowData.filter(x => x.budgetTermId == budgetTermId)[0];
  }

  public rebuildBudget(termAssumption: TermAssumption){
    var budgeTerm = this.revenueRowData.filter(x=>x.budgetTermId == termAssumption.budgetTermId)[0];

    this.rebuildBudgetItemService.bugetTerm = budgeTerm;
    this.rebuildBudgetItemService.execute();
  }

  public editingRfp: RfpAssumption;
  public editingRfpRowIndex: number;
  public editingAssumption: TermAssumption;
  public editingRowIndex:number;
  public editingAssumptionFormGroup: FormGroup;
  public editingRfpFormGroup: FormGroup;
  public showErrorDialog: boolean = false;
  public errorMessage: string;
  public showRemoveAssumptionDialog: boolean;
  public showRemoveRfpDialog: boolean;
  
  public closeErrorDialog(){
    this.showErrorDialog = false;
  }

  public hasOverlapPeriod():boolean{
    var rfpId = this.editingRfpFormGroup.get('rfpAssumptionId').value;
    var rfpFrom = this.editingRfpFormGroup.get('rfpFrom').value.getTime();
    var rfpTo = this.editingRfpFormGroup.get('rfpTo').value.getTime();
    var rfps = this.editingRfpRowData.filter(x=> x.rfpAssumptionId != rfpId);


    for(var i=0;i<rfps.length;i++){
      var rfp = rfps[i];

      var from = rfp.rfpFrom.getTime();
      var to = rfp.rfpTo.getTime();

      if(rfpFrom <= from && rfpTo >= to)
      return false;

      if(rfpFrom >= from && rfpTo <= to)
      return false;

      if(rfpFrom <= from && rfpTo >= from)
      return false;

      if(rfpFrom <= to && rfpTo >= to)
      return false;
    }

    return true;
  }
  public rfpSaveHandler({sender, rowIndex, formGroup, isNew}){
    

    if(this.hasOverlapPeriod() == false){
      this.errorMessage = "RFP Period overlapped";
      this.showErrorDialog = true;
      return;
    }

    this.editingRfp.rfpFrom = this.editingRfpFormGroup.get('rfpFrom').value;
    this.editingRfp.rfpTo = this.editingRfpFormGroup.get('rfpTo').value;
    this.editingRfp.rfpMD = this.editingRfpFormGroup.get('rfpMD').value;
    this.editingRfp.remarks = this.editingRfpFormGroup.get('remarks').value;

    this.editingRfpRowIndex = -1;
    this.editingRfp = null;
    sender.closeRow(rowIndex);
  }
  public saveHandler({sender, rowIndex, formGroup, isNew}){
    this.editingAssumption.evpTo = this.editingAssumptionFormGroup.get('evpTo').value;
    this.editingAssumption.evpMD = this.editingAssumptionFormGroup.get('evpMD').value;
    this.editingAssumption.termTo = this.editingAssumptionFormGroup.get('termTo').value;
    this.editingAssumption.termMD = this.editingAssumptionFormGroup.get('termMD').value;
    this.editingAssumption.remarks = this.editingAssumptionFormGroup.get('remarks').value;

    this.rebuildBudget(this.editingAssumption);
    this.editingRowIndex = -1;
    this.editingAssumption = null;
    sender.closeRow(rowIndex);
  }
  public rfpCancelHandler({sender, rowIndex}){
    this.editingRfpRowIndex = -1;
    sender.closeRow(rowIndex);
  }
  public cancelHandler({sender, rowIndex}){
    this.editingRowIndex = -1;
    sender.closeRow(rowIndex);
  }
  public expandHandler(event){
    this.editingAssumption = event.dataItem;
    this.editingRfpRowData = event.dataItem.rfpAssumptions;
  }
  public collapseHandler(event){
    this.editingRfpRowIndex = -1;
  }

  public removeTermAssumption(action){
    this.showRemoveAssumptionDialog = false;

    if(action == 'yes'){
      this.editingTermAssumptionRowData.splice(this.editingRowIndex, 1);
      this.rebuildBudget(this.editingTermAssumptionRowData[0]);
    }
      this.editingRowIndex = -1;
  }
  public removeRfp(action){
    this.showRemoveRfpDialog = false;
    
    if(action == 'yes'){
      this.editingRfpRowData.splice(this.editingRfpRowIndex, 1);
    }
      this.editingRfpRowIndex = -1;
  }
  public removeHandler(event){
    this.editingRowIndex = event.rowIndex;
    this.showRemoveAssumptionDialog = true;
  }
  public rfpRemoveHandler(event){
    this.editingRfpRowIndex = event.rowIndex;
    this.showRemoveRfpDialog = true;
  }
  public rfpAddHandler({sender}){
    var newRfp = new RfpAssumption();
    var lastRfp = this.editingRfpRowData[this.editingRfpRowData.length-1];

    if(lastRfp){
      newRfp.rfpFrom = new Date(lastRfp.rfpTo.getTime());
      newRfp.rfpFrom.setDate(newRfp.rfpFrom.getDate() + 1);
    }else{
      newRfp.rfpFrom = new Date(this.editingAssumption.termFrom);
    }
    
    newRfp.rfpMD = this.editingBudgetTerm.rfpMD;
    newRfp.rfpTo = this.dateRangeMDService.calcEndDate(newRfp.rfpFrom, newRfp.rfpMD);
    this.editingRfpRowData.push(newRfp);
    this.editingRfp = newRfp;

    this.editingRfpFormGroup = new FormGroup({
      'rfpAssumptionId': new FormControl(newRfp.rfpAssumptionId),
      'rfpFrom': new FormControl(newRfp.rfpFrom),
      'rfpTo': new FormControl(newRfp.rfpTo),
      'rfpMD': new FormControl(newRfp.rfpMD),
      'remarks': new FormControl(newRfp.remarks)
    });

    this.editingRfpRowIndex = this.editingRfpRowData.length-1;
    sender.editRow(this.editingRfpRowIndex, this.editingRfpFormGroup);
  }

  public addHandler({sender}){
    if(this.editingRowIndex != null && this.editingRowIndex > 0){
      sender.closeRow(this.editingRowIndex);
      this.editingRowIndex = -1;
      this.editingAssumption = null;
      this.editingRfpRowIndex = -1;
    }
    var newAssumption = new TermAssumption();
    var lastAssumption = this.editingTermAssumptionRowData[this.editingTermAssumptionRowData.length-1];
    var termTo = new Date(lastAssumption.termTo.getTime());
    var prevEndDate = new Date(termTo.getTime());

    prevEndDate.setDate(prevEndDate.getDate() + 1);
    newAssumption.budgetTermId = this.showDataRow.budgetTermId;
    newAssumption.evpFrom = null;
    newAssumption.evpTo = null;
    newAssumption.evpMD = lastAssumption.evpMD;
    newAssumption.termFrom = null;
    newAssumption.termTo = null;
    newAssumption.termMD = lastAssumption.termMD;
    newAssumption.remarks = '';
    newAssumption.prevEndDate = null;

    this.editingTermAssumptionRowData.push(newAssumption);
    this.editingAssumption = newAssumption;
    this.rebuildBudget(this.editingAssumption);

    this.editingAssumptionFormGroup = new FormGroup({
      'budgetTermId': new FormControl(newAssumption.budgetTermId),
      'evpTo': new FormControl(newAssumption.evpTo),
      'evpMD': new FormControl(newAssumption.evpMD, []),
      'termTo': new FormControl(newAssumption.termTo,[Validators.required, DateValidator()]),
      'termMD': new FormControl(newAssumption.termMD, [Validators.required, Validators.pattern("([0-9]{2})(\/)([0-9]{2})")]),
      'remarks': new FormControl(newAssumption.remarks)
    })

    this.editingRowIndex = this.editingTermAssumptionRowData.length-1
    sender.editRow(this.editingRowIndex, this.editingAssumptionFormGroup);
  }
  public rfpEditHandler({sender, rowIndex, dataItem}){
    sender.closeRow(rowIndex);
    this.editingRfp = dataItem;
    this.editingRfpRowIndex = rowIndex;
    this.editingRfpFormGroup = new FormGroup({
      'rfpAssumptionId': new FormControl(dataItem.rfpAssumptionId),
      'rfpFrom': new FormControl(dataItem.rfpFrom),
      'rfpTo': new FormControl(dataItem.rfpTo),
      'rfpMD': new FormControl(dataItem.rfpMD),
      'remarks': new FormControl(dataItem.remarks)
    });

    sender.editRow(rowIndex, this.editingRfpFormGroup);
  }
  public editHandler({sender, rowIndex, dataItem}){
    sender.closeRow(rowIndex);
    this.editingRowIndex = undefined;
    this.editingAssumptionFormGroup = new FormGroup({
      'budgetTermId': new FormControl(dataItem.budgetTermId),
      'evpTo': new FormControl(dataItem.evpTo),
      'evpMD': new FormControl(dataItem.evpMD, [Validators.pattern("([0-9]{2})(\/)([0-9]{2})")]),
      'termTo': new FormControl(dataItem.termTo,[Validators.required, DateValidator()]),
      'termMD': new FormControl(dataItem.termMD, [Validators.required, Validators.pattern("([0-9]{2})(\/)([0-9]{2})")]),
      'remarks': new FormControl(dataItem.remarks)
    })

    this.editingAssumption = dataItem;
    this.editingRowIndex = rowIndex;
    sender.editRow(rowIndex, this.editingAssumptionFormGroup);
  }
  public onTermToChange(event)
  {
    var termFrom = this.editingAssumption.termFrom;
    var termTo = this.editingAssumptionFormGroup.get('termTo').value;
    var termMD = this.dateRangeMDService.calcMD(termFrom, termTo);

    this.editingAssumptionFormGroup.patchValue({'termMD': termMD});
    
  }
  public onTermMDChange(event){
    var termMD = this.editingAssumptionFormGroup.get("termMD").value;

    if(termMD == ''){
      this.editingAssumptionFormGroup.patchValue({'termTo': null});
    }else{
      var termFrom = this.editingAssumption.termFrom;
      var termTo = this.dateRangeMDService.calcEndDate(termFrom, termMD);
  
      this.editingAssumptionFormGroup.patchValue({'termTo': termTo});
    }

  }
  public onRfpToChange(event){
    var rfpForm = this.editingRfpFormGroup.get('rfpFrom').value;
    var rfpTo = this.editingRfpFormGroup.get('rfpTo').value;
    var rfpMD = this.dateRangeMDService.calcMD(rfpForm, rfpTo);

    this.editingRfpFormGroup.patchValue({"rfpMD": rfpMD});
  }
  public onRfpFromChange(event){
    var rfpForm = this.editingRfpFormGroup.get('rfpFrom').value;
    var rfpTo = this.editingRfpFormGroup.get('rfpTo').value;
    var rfpMD = this.dateRangeMDService.calcMD(rfpForm, rfpTo);

    this.editingRfpFormGroup.patchValue({"rfpMD": rfpMD});
  }
  public onRfpMDChange(event){
    var rfpForm = this.editingRfpFormGroup.get('rfpFrom').value;
    var rfpMD = this.editingRfpFormGroup.get('rfpMD').value;
    var rfpTo = this.dateRangeMDService.calcEndDate(rfpForm, rfpMD);

    this.editingRfpFormGroup.patchValue({"rfpTo": rfpTo});
  }
  public onEvpToChange(event){
    var evpFrom = new Date(this.editingAssumption.prevEndDate.getTime());
    var evpTo = this.editingAssumptionFormGroup.get('evpTo').value;
    var evpMD = this.dateRangeMDService.calcMD(evpFrom, evpTo);
    var termFrom = new Date(evpTo.getTime());
    termFrom.setDate(termFrom.getDate() + 1);
    var termMD = this.editingAssumptionFormGroup.get('termMD').value;
    var termTo = this.dateRangeMDService.calcEndDate(termFrom, termMD);
    
    this.editingAssumption.evpFrom = evpFrom;
    this.editingAssumption.termFrom = termFrom;
    this.editingAssumptionFormGroup.patchValue({"termTo": termTo});
    this.editingAssumptionFormGroup.patchValue({'evpMD': evpMD});
  }
  public onEvpMDChange(event){
    console.log('evp md change event', event);
    var evpMD = this.editingAssumptionFormGroup.get('evpMD').value;
    console.log('evp md value', evpMD);

    if(evpMD == ''){
      var termFrom = new Date(this.editingAssumption.prevEndDate.getTime());

      this.editingAssumption.termFrom = null;
      this.editingAssumptionFormGroup.patchValue({'evpTo': null});
      this.editingAssumptionFormGroup.patchValue({'evpFrom': null});

    }
    else{
      var evpFrom = new Date(this.editingAssumption.prevEndDate.getTime());
      var evpTo = this.dateRangeMDService.calcEndDate(evpFrom, evpMD);
      var termFrom = new Date(evpTo.getTime());
      termFrom.setDate(termFrom.getDate() + 1);
      var termMD = this.editingAssumptionFormGroup.get('termMD').value;
      var termTo = this.dateRangeMDService.calcEndDate(termFrom, termMD);
      
      this.editingAssumption.termFrom = termFrom;
      this.editingAssumptionFormGroup.patchValue({'termTo': termTo});
      this.editingAssumptionFormGroup.patchValue({'evpTo': evpTo});
    }
  }
}
