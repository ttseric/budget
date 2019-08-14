import { Component, OnInit } from '@angular/core';
import { GridDef, SortModel } from 'src/app/models/gridDef';
import { GridDefService } from 'src/app/services/grid-def.service';
import { ColDefService } from 'src/app/services/col-def.service';
import { ColumnApi, GridApi, GridOptions } from "ag-grid-community";
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';
import { forkJoin } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { BudgetTerm, BudgetDetailTerm } from 'src/app/models/BudgetTerm';
import { BuildTermDetailService } from 'src/app/services/build-term-detail.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public splitButtonData: Array<any> = [{
    text: 'Option 1'
  }, {
    text: 'Option 2',
  }, {
    text: 'Option 3',
  }];
  public rowData: BudgetTerm[] = [
    {
      budgetTermId: 0,
      seq: 1,
      isLocked: false,
      warning: 'N',
      escalation: "By Term",
      leaseTermLength: '24/00',
      evpTermLength: '00/30',
      rfpTermLength: '00/15',
      tenant: 'Vacant',
      leaseExpireDate: new Date(2025, 11, 1),
      itemEndDate: new Date(2025, 11, 31),
      assumptionLevel: 'GL',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false,
      isDirty: false,
      budgetDetailTerms: [
        { budgetTermId: 0, budgetTermDetailId: 0, isLocked: false, budgetTermName: '1st term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 0, budgetTermDetailId: 1, isLocked: false, budgetTermName: '1st term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 0, budgetTermDetailId: 2, isLocked: false, budgetTermName: '1st term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 0, budgetTermDetailId: 3, isLocked: false, budgetTermName: '2nd term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 0, budgetTermDetailId: 4, isLocked: false, budgetTermName: '2nd term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 0, budgetTermDetailId: 5, isLocked: false, budgetTermName: '2nd term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
      ],
      contractualTerms: [
        { budgetTermId: 0, budgetTermDetailId: 0, isLocked: false, budgetTermName: 'Contractual Lease', termType: "Lease", from: new Date(2016, 5, 1), to: new Date(), termLength: "", remarks: '' },
      ]
    },
    {
      budgetTermId: 1,
      seq: 2,
      isLocked: false,
      warning: 'N',
      escalation: "By Term",
      leaseTermLength: '24/00',
      evpTermLength: '00/30',
      rfpTermLength: '00/15',
      tenant: 'Vacant',
      leaseExpireDate: new Date(2025, 11, 1),
      itemEndDate: new Date(2025, 11, 31),
      assumptionLevel: 'GL',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false,
      isDirty: false,
      budgetDetailTerms: [

        { budgetTermId: 1, budgetTermDetailId: 6, isLocked: false, budgetTermName: '1st term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 1, budgetTermDetailId: 7, isLocked: false, budgetTermName: '1st term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 1, budgetTermDetailId: 8, isLocked: false, budgetTermName: '1st term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 1, budgetTermDetailId: 9, isLocked: false, budgetTermName: '2nd term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 1, budgetTermDetailId: 10, isLocked: false, budgetTermName: '2nd term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 1, budgetTermDetailId: 11, isLocked: false, budgetTermName: '2nd term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
      ],
      contractualTerms: [
      ]
    },
    {
      budgetTermId: 2,
      seq: 3,
      isLocked: false,
      warning: 'N',
      escalation: "By Term",
      leaseTermLength: '24/00',
      evpTermLength: '00/30',
      rfpTermLength: '00/15',
      tenant: 'Vacant',
      leaseExpireDate: new Date(2025, 11, 1),
      itemEndDate: new Date(2025, 11, 31),
      assumptionLevel: 'GL',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false,
      isDirty: false,
      budgetDetailTerms: [

        { budgetTermId: 2, budgetTermDetailId: 12, isLocked: false, budgetTermName: '1st term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 2, budgetTermDetailId: 13, isLocked: false, budgetTermName: '1st term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 2, budgetTermDetailId: 14, isLocked: false, budgetTermName: '1st term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 2, budgetTermDetailId: 15, isLocked: false, budgetTermName: '2nd term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 2, budgetTermDetailId: 16, isLocked: false, budgetTermName: '2nd term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 2, budgetTermDetailId: 17, isLocked: false, budgetTermName: '2nd term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
      ],
      contractualTerms: []
    },
    {
      budgetTermId: 3,
      seq: 4,
      isLocked: false,
      warning: 'N',
      escalation: "By Term",
      leaseTermLength: '24/00',
      evpTermLength: '00/30',
      rfpTermLength: '00/15',
      tenant: 'Vacant',
      leaseExpireDate: new Date(2025, 11, 1),
      itemEndDate: new Date(2025, 11, 31),
      assumptionLevel: 'GL',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false,
      isDirty: false,
      budgetDetailTerms: [

        { budgetTermId: 3, budgetTermDetailId: 18, isLocked: false, budgetTermName: '1st term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 3, budgetTermDetailId: 19, isLocked: false, budgetTermName: '1st term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 3, budgetTermDetailId: 20, isLocked: false, budgetTermName: '1st term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 3, budgetTermDetailId: 21, isLocked: false, budgetTermName: '2nd term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 3, budgetTermDetailId: 22, isLocked: false, budgetTermName: '2nd term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 3, budgetTermDetailId: 23, isLocked: false, budgetTermName: '2nd term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
      ],
      contractualTerms: []
    },
    {
      budgetTermId: 4,
      seq: 5,
      isLocked: false,
      warning: 'N',
      escalation: "By Term",
      leaseTermLength: '24/00',
      evpTermLength: '00/30',
      rfpTermLength: '00/15',
      tenant: 'Vacant',
      leaseExpireDate: new Date(2025, 11, 1),
      itemEndDate: new Date(2025, 11, 31),
      assumptionLevel: 'GL',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false,
      isDirty: false,
      budgetDetailTerms: [

        { budgetTermId: 4, budgetTermDetailId: 24, isLocked: false, budgetTermName: '1st term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 4, budgetTermDetailId: 25, isLocked: false, budgetTermName: '1st term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 4, budgetTermDetailId: 26, isLocked: false, budgetTermName: '1st term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 4, budgetTermDetailId: 27, isLocked: false, budgetTermName: '2nd term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 4, budgetTermDetailId: 28, isLocked: false, budgetTermName: '2nd term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 4, budgetTermDetailId: 29, isLocked: false, budgetTermName: '2nd term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
      ],
      contractualTerms: []
    },
    {
      budgetTermId: 5,
      seq: 6,
      isLocked: false,
      warning: 'N',
      escalation: "By Term",
      leaseTermLength: '24/00',
      evpTermLength: '00/30',
      rfpTermLength: '00/15',
      tenant: 'Vacant',
      leaseExpireDate: new Date(2025, 11, 1),
      itemEndDate: new Date(2025, 11, 31),
      assumptionLevel: 'GL',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false,
      isDirty: false,
      budgetDetailTerms: [

        { budgetTermId: 5, budgetTermDetailId: 30, isLocked: false, budgetTermName: '1st term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 5, budgetTermDetailId: 31, isLocked: false, budgetTermName: '1st term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 5, budgetTermDetailId: 32, isLocked: false, budgetTermName: '1st term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "01/00", remarks: '' },
        { budgetTermId: 5, budgetTermDetailId: 33, isLocked: false, budgetTermName: '2nd term', termType: "Lease", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 5, budgetTermDetailId: 34, isLocked: false, budgetTermName: '2nd term', termType: "RVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
        { budgetTermId: 5, budgetTermDetailId: 35, isLocked: false, budgetTermName: '2nd term', termType: "EVP", from: new Date(2025, 11, 1), to: new Date(2025, 11, 31), termLength: "24/00", remarks: '' },
      ],
      contractualTerms: []
    }
  ];
  public pcRowData = [
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '2017-11-01',
      endDate: '31-10-2021',
      bf: 'M',
      amount: 90027.95
    },
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '2017-11-01',
      endDate: '31-10-2021',
      bf: 'M',
      amount: 90027.95
    },
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '2017-11-01',
      endDate: '31-10-2021',
      bf: 'M',
      amount: 90027.95
    },
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '2017-11-01',
      endDate: '31-10-2021',
      bf: 'M',
      amount: 90027.95
    },
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '2017-11-01',
      endDate: '31-10-2021',
      bf: 'M',
      amount: 90027.95
    },
  ]
  public rentRowData = [
    {
      rrDate: '01-11-2021',
      condition: 'OMR',
      collarAmount: 103030,
      collarRate: 10,
      capAmount: 1049840,
      capRate: 0.5
    },
    {
      rrDate: '01-11-2021',
      condition: 'OMR',
      collarAmount: 103030,
      collarRate: 10,
      capAmount: 1049840,
      capRate: 0.5
    },
    {
      rrDate: '01-11-2021',
      condition: 'OMR',
      collarAmount: 103030,
      collarRate: 10,
      capAmount: 1049840,
      capRate: 0.5
    }
  ]
  public currentTermRowData = [
    {
      evpFrom: '2017-11-01',
      evpTo: '2025-10-31',
      md1: '96/00',
      termForm: '2017-11-01',
      termTo: '2025-10-31',
      md2: '96/00',
      renew: true,
      remarks: 'testing'
    },
    {
      evpFrom: '2017-11-01',
      evpTo: '2025-10-31',
      md1: '96/00',
      termForm: '2017-11-01',
      termTo: '2025-10-31',
      md2: '96/00',
      renew: true,
      remarks: 'testing'
    },
    {
      evpFrom: '2017-11-01',
      evpTo: '2025-10-31',
      md1: '96/00',
      termForm: '2017-11-01',
      termTo: '2025-10-31',
      md2: '96/00',
      renew: true,
      remarks: 'testing'
    },
  ]
  private termGridApi: GridApi;
  private pcGridApi: GridApi;
  private rentGridApi: GridApi;
  private currentTermGridApi: GridApi;
  private termGridColumnApi: ColumnApi;
  private pcGridColumnApi: ColumnApi;
  private rentGridColumnApi: ColumnApi;
  private currentTermColumnApi: ColumnApi;
  private termDetailGridApi: GridApi;
  private termDetailGridColumnApi: ColumnApi;

  public components;
  public show: boolean = false;
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
  public get termGridColDefs() {
    return this.colDefService.termGridColumnDefs;
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
  public byTermCellrendererParams;
  constructor(
    private gridDefService: GridDefService,
    private colDefService: ColDefService,
    private notificationService: NotificationService,
    private buildTermDetailService: BuildTermDetailService
  ) {
    this.components = colDefService.components;
    this.byTermCellrendererParams = this.colDefService.byTermCellrendererParams;
    this.byTermCellrendererParams.detailGridOptions.onGridReady = this.onByTermDetailGridReady.bind(this);
    this.byTermCellrendererParams.detailGridOptions.onSelectionChanged = this.onByTermDetailGridSelectionChanged.bind(this);
    this.byTermCellrendererParams.detailGridOptions.getContextMenuItems = this.getDetailTermContextMenuItems.bind(this);
    this.byTermCellrendererParams.detailGridOptions.context = { componentParent: this };
  }

  public get getTermMenu() {
    return this.getTermContextMenuItems.bind(this);
  }
  ngOnInit() {
  }

  addRowToDetail(params) {
    var bugetTerm: BudgetTerm = params.node.data;
    var newRow = { budgetTermId: bugetTerm.budgetTermId, budgetTermDetailId: 0, budgetTermName: 'New Term', isLocked: false, termType: "", from: new Date(), to: new Date(), termLength: "00/00", remarks: '' };
    var budget = this.rowData.filter(x => x.budgetTermId == bugetTerm.budgetTermId)[0];

    budget.budgetDetailTerms.push(newRow);
    params.api.updateRowData({ add: [newRow], addIndex: 0 });
    this.detailValueChanged(newRow);

  }
  deleteRow(params){
    var row = params.node.data;

    this.detailValueChanged(row);
    var budgetTerm = this.rowData.filter(x=>x.budgetTermId == row.budgetTermId)[0];
    budgetTerm.budgetDetailTerms = budgetTerm.budgetDetailTerms.filter(x=>x.budgetTermDetailId != row.budgetTermDetailId);
    params.api.updateRowData({remove: [row]});

  }
  rebuildDetail(params){
    var budgetTerm: BudgetTerm = params.node.data;
    var row = this.rowData.filter(x=>x.budgetTermId == budgetTerm.budgetTermId)[0];

    this.buildTermDetailService.budgetTerm = budgetTerm;
    this.buildTermDetailService.execute();

    row.budgetDetailTerms = [...this.buildTermDetailService.budgetDetailTerms];

    if(params.node.detailNode.detailGridInfo != undefined){
      params.node.detailNode.detailGridInfo.api.setRowData([]);
      params.node.detailNode.detailGridInfo.api.updateRowData({add: [...row.contractualTerms, ...this.buildTermDetailService.budgetDetailTerms]});
    }
  }
  print() {
    console.log('rowData', this.rowData);
  }
  onByTermDetailGridReady(params) {
    this.termDetailGridApi = params.api;
    this.termDetailGridColumnApi = params.columnApi;
  }
  onTermGridReady(params) {
    this.termGridApi = params.api;
    this.termGridColumnApi = params.columnApi;
    this.gridDefService.getGridDef("termGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.termGridApi, this.termGridColumnApi, response.gridDef);
      }
    })
  }
  onPCGridReady(params) {
    this.pcGridApi = params.api;
    this.pcGridColumnApi = params.columnApi;
    this.gridDefService.getGridDef("pcGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.pcGridApi, this.pcGridColumnApi, response.gridDef);
      }
    })
  }
  onRentGridReady(params) {
    this.rentGridApi = params.api;
    this.rentGridColumnApi = params.columnApi;
    this.gridDefService.getGridDef("rentGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.rentGridApi, this.rentGridColumnApi, response.gridDef);
      }
    })
  }
  onCurrentTermGridReady(params) {
    this.currentTermGridApi = params.api;
    this.currentTermColumnApi = params.columnApi;
    this.gridDefService.getGridDef("currentTermGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.currentTermGridApi, this.currentTermColumnApi, response.gridDef);
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
    if (this.termGridApi != undefined) {
      var r = this.saveGrid("termGrid", this.termGridApi, this.termGridColumnApi);
      responses.push(r);
    }
    if (this.pcGridApi != undefined) {
      var r = this.saveGrid("pcGrid", this.pcGridApi, this.pcGridColumnApi);
      responses.push(r);
    }
    if (this.rentGridApi != undefined) {
      var r = this.saveGrid("rentGrid", this.rentGridApi, this.rentGridColumnApi);
      responses.push(r);
    }
    if (this.currentTermGridApi != undefined) {
      var r = this.saveGrid("currentTermGrid", this.currentTermGridApi, this.currentTermColumnApi);
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
  public selectedRowsString = '';
  public detailSelectedRowsString = ''
  onByTermDetailGridSelectionChanged(event) {
    var selectedRows = this.termDetailGridApi.getSelectedRows();
    var selectedRowsString = '';
    selectedRows.forEach(function (selectedRow, index) {
      if (index > 5) {
        return;
      }
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.tenant;
    });
    if (selectedRows.length >= 5) {
      selectedRowsString += " - and " + (selectedRows.length - 5) + " others";
    }
    this.detailSelectedRowsString = selectedRowsString;
    console.log('select detail');
    this.termGridApi.stopEditing();
  }
  onSelectionChanged(event) {
    var selectedRows = this.termGridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function (selectedRow, index) {
      if (index > 5) {
        return;
      }
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.tenant;
    });

    if (selectedRows.length >= 5) {
      selectedRowsString += " - and " + (selectedRows.length - 5) + " others";
    }
    this.selectedRowsString = selectedRowsString;
    this.termDetailGridApi.stopEditing();
  }

  public detailValueChanged(any) {

    if (any.budgetTermId == undefined || any.budgetTermId == null)
      return;

    var parentRow = this.rowData.filter(x => x.budgetTermId == any.budgetTermId)[0];

    parentRow.isDirty = true;

    this.termGridApi.refreshCells();
  }

  getTermContextMenuItems(params) {
    var menuItems = [];
    var budgetTerm = params.node.data;

    if(budgetTerm != null && budgetTerm.isLocked == false){
      menuItems.push({
        name: "Rebuild Detail",
        action: ()=>{
          this.rebuildDetail(params);
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
    return this.rowData.filter(x => x.budgetTermId == budgetTermId)[0];
  }

  getDetailTermContextMenuItems(params) {
    console.log('menu params', params);
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
