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
import { BudgetTerm } from 'src/app/models/BudgetTerm';
import { BuildBudgetTermByTermsService } from 'src/app/services/build-budget-term-by-terms.service';
import { RevenueGridColDefService } from 'src/app/services/revenue-grid-col-def.service';
import { Router } from '@angular/router';
import { TermAssumptionColDefService } from 'src/app/services/term-assumption-col-def.service';
import { GridComponentsService } from 'src/app/services/grid-components.service';
import { DateRangeMDService } from 'src/app/services/date-range-md.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public gridContext = { componentParent: this};
  public showEditTermGrid = false;
  public showDataRow = null;
  public revenueGridOptions = { alignedGrids: [], suppressHorizontalScroll: true };
  public revenueFooterGridOptions = { alignedGrids: [] };
  public showTermGrid = false;
  public splitButtonData: Array<any> = [{
    text: 'Option 1'
  }, {
    text: 'Option 2',
  }, {
    text: 'Option 3',
  }];
  public pcRowData = [];
  public rentRowData = [];
  public currentTermReadOnlyDataRow = [];
  public editingTermAssumptionRowData = [];

  private termGridApi: GridApi;
  private pcGridApi: GridApi;
  private rentGridApi: GridApi;
  private currentTermGridApi: GridApi;
  private pcGridColumnApi: ColumnApi;
  private rentGridColumnApi: ColumnApi;
  private revenueGridApi: GridApi;
  private revenueGridColumnApi: ColumnApi;
  private currentTermReadonlyGridApi: GridApi;
  private currentTermReadOnlyColumnApi: ColumnApi;
  private editingTermAssumptionGridApi:GridApi;
  private editingTermAssumptionColumnApi: ColumnApi;
  public components;
  public show: boolean = false;
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
    this.show = !this.show;
  }
  public get defaultColDef() {
    return this.colDefService.defaultColDef
  }
  public get animate(): any {
    return {
      type: 'slide',
      direction: 'down',
      duration: 200
    };
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
    public dateRangeMDService: DateRangeMDService
  ) {
    this.components = gridComponentService.components;
    this.rfpAssumptionColDefs = this.termAssumptionColDefService.rfpAssumptionColDefs;
    this.rfpAssumptionColDefs.detailGridOptions.onGridReady = this.onRfpAssumptionGridReady.bind(this);
    this.rfpAssumptionColDefs.detailGridOptions.getContextMenuItems = this.getDetailTermContextMenuItems.bind(this);
    this.rfpAssumptionColDefs.detailGridOptions.context = { componentParent: this };
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
  addRowToDetail(params) {
    var bugetTerm: BudgetTerm = params.node.data;
    var newRow = { budgetTermId: bugetTerm.budgetTermId, budgetTermDetailId: 0, budgetTermName: 'New Term', isLocked: false, termType: "", from: new Date(), to: new Date(), termLength: "00/00", remarks: '' };
    //var budget = this.rowData.filter(x => x.budgetTermId == bugetTerm.budgetTermId)[0];

    //budget.budgetDetailTerms.push(newRow);
    params.api.updateRowData({ add: [newRow], addIndex: 0 });
  }
  deleteRow(params) {
    var row = params.node.data;

    //var budgetTerm = this.rowData.filter(x=>x.budgetTermId == row.budgetTermId)[0];
    //budgetTerm.budgetDetailTerms = budgetTerm.budgetDetailTerms.filter(x=>x.budgetTermDetailId != row.budgetTermDetailId);
    params.api.updateRowData({ remove: [row] });

  }
  rebuildDetail(params) {
    var data: any = params.node.data;

    this.buildBudgetTermByTermsService.budgetTerm = data;
    this.buildBudgetTermByTermsService.execute();

    data.currentTermAssumptions = this.buildBudgetTermByTermsService.currentTermAssumptions;
    data.editingTermAssumptions = _.cloneDeep(data.currentTermAssumptions);
    this.editingTermAssumptionRowData = data.editingTermAssumptions;

    if (this.currentTermReadonlyGridApi) {
      this.currentTermReadonlyGridApi.setRowData([]);
      this.currentTermReadonlyGridApi.updateRowData({ add: data.currentTermAssumptions });
    }

  }
  print() {
    //console.log('rowData', this.rowData);
  }
  onRevenueGridReady(params) {
    this.revenueGridApi = params.api;
    this.revenueGridColumnApi = params.columnApi;
    this.revenueGridColumnApi.autoSizeAllColumns();
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
  }
  onRfpAssumptionGridReady(params) {
  }

  onEditingTermAssumptionGridReady(params) {
    this.editingTermAssumptionGridApi = params.api;
    this.editingTermAssumptionColumnApi = params.columnApi;
    this.editingTermAssumptionColumnApi.autoSizeAllColumns();
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
  // onCurrentTermGridReady(params) {
  //   this.currentTermGridApi = params.api;
  //   this.currentTermColumnApi = params.columnApi;
  //   this.currentTermColumnApi.autoSizeAllColumns();
  //   this.gridDefService.getGridDef("currentTermGrid").subscribe(response => {
  //     if (response.gridDef != null) {
  //       this.configGrid(this.currentTermGridApi, this.currentTermColumnApi, response.gridDef);
  //     }
  //   })
  // }
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

  public get getEditingTermMenu() {
    return this.getEditingTermAssumptionContextMenuItems.bind(this);
  }
  public close() {
    this.showEditTermGrid = false;
  }
  getEditingTermAssumptionContextMenuItems(params) {
    var menuItems = [];
    var budgetTerm = params.node.data;

    console.log('menu params',params);
    if (budgetTerm != null && budgetTerm.isLocked == false) {
      menuItems.push({
        name: "Rebuild Detail",
        action: () => {
          this.rebuildDetail(params);
        }
      }
      );
    }
    menuItems.push("separator");
    menuItems.push("copy");
    menuItems.push("copyWithHeaders");
    menuItems.push("export");

    return menuItems;
  }

  public get getRevenueMenu() {
    return this.getRevenueContextMenuItems.bind(this);
  }
  getRevenueContextMenuItems(params) {
    var menuItems = [];
    var budgetTerm = params.node.data;
    console.log('revenue param', params);
    if (budgetTerm != null && budgetTerm.isLocked == false) {
      menuItems.push({
        name: "Rebuild Terms",
        action: () => {
          this.rebuildDetail(params);
        }
      });
      menuItems.push({
        name: "Edit Terms",
        action: () => {
          this.showEditTermGrid = true;
          this.centreTop = 20;
          this.width = window.innerWidth * 0.5;
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

  getDetailTermContextMenuItems(params) {
    var menuItems = [];
    var budgetTermId = params.node.data.budgetTermId;
    var budgetTerm = this.getBudgetTerm(budgetTermId);

    if (budgetTerm != null && budgetTerm.isLocked == false) {
      menuItems.push({
        name: "New Item",
        action: () => {
          this.addRowToDetail(params);
        }
      })
    }
    if (budgetTerm != null && budgetTerm.isLocked == false) {
      menuItems.push({
        name: "Delete Item",
        action: () => {
          this.deleteRow(params);
        }
      })
    }
    menuItems.push("separator");
    menuItems.push("copy");
    menuItems.push("copyWithHeaders");
    menuItems.push("export");

    return menuItems;
  }
}
