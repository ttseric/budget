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

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public defaultColDef = {
    resizable: true,
    sortable: true
  }
  public splitButtonData: Array<any> = [{
    text: 'Option 1'
  }, {
    text: 'Option 2',
  }, {
    text: 'Option 3',
  }];
  public rowData = [
    {
      seq: 1,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      escalation: "By Term",
      leaseTerm: '24/00',
      evpTerm: '00/30',
      rfpTerm: '00/15',
      protfolio: 'Office',
      unit: 'G/F',
      floor: 'G/F',
      tenant: 'Vacant',
      shop: 'shop 1',
      tradeCategory: '2',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false,
      assumptions:[
        { termNo:'1st term', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'1st term', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'1st term', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''},
        { termNo:'2nd term', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'2nd term', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'2nd term', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''},
        { termNo:'3rd term', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'3rd term', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'3rd term', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''}
      ]
    },
    {
      seq: 2,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      protfolio: 'Shop',
      unit: '2/F',
      floor: '2/F',
      tenant: 'Tenant of CA00000530',
      shop: 'shop 2',
      tradeCategory: '2',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false,
      assumptions:[
        { termNo:'1st Year', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'1st Year', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'1st Year', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''},
        { termNo:'2nd Year', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'2nd Year', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'2nd Year', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''},
        { termNo:'3rd Year', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'3rd Year', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'3rd Year', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''},
        { termNo:'4th Year', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'4th Year', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'4th Year', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''},
        { termNo:'5th Year', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'5th Year', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'5th Year', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''},
        { termNo:'6th Year', termType: "Lease", from: "30-Nov-2020", to: "30-Nov-2022", term: "24/00", remarks:''},
        { termNo:'6th Year', termType: "EVP", from: "31-Oct-2020", to: "29-Nov-2020", term:"00/30", remarks: ''},
        { termNo:'6th Year', termType: "RFP", from: "30-Nov-2020", to: "14-Dec-2020", term: "00/15", remarks: ''},
      ]
    },
    {
      seq: 3,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      protfolio: 'Shop',
      unit: '13/F',
      floor: '13/F',
      tenant: 'Tenant of CA000000500',
      shop: 'shop 3',
      tradeCategory: '1',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false
    },
    {
      seq: 4,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      protfolio: 'Office',
      unit: '13/F',
      floor: '13/F',
      tenant: 'Tenant of CA000000500',
      shop: 'shop 3',
      tradeCategory: '4',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false
    },
    {
      seq: 5,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      protfolio: 'Office',
      unit: '13/F',
      floor: '13/F',
      tenant: 'Tenant of CA000000500',
      shop: 'shop 3',
      tradeCategory: '1',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false
    },
    {
      seq: 6,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      protfolio: 'Shop',
      unit: '13/F',
      floor: '13/F',
      tenant: 'Tenant of CA000000500',
      shop: 'shop 3',
      tradeCategory: '2',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false
    },
    {
      seq: 7,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      protfolio: 'Shop',
      unit: '13/F',
      floor: '13/F',
      tenant: 'Tenant of CA000000500',
      shop: 'shop 3',
      tradeCategory: '3',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false
    },
    {
      seq: 8,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      protfolio: 'Office',
      unit: '13/F',
      floor: '13/F',
      tenant: 'Tenant of CA000000500',
      shop: 'shop 3',
      tradeCategory: '2',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false
    },
    {
      seq: 9,
      col1: '',
      locked: '',
      isCR: true,
      warning: 'N',
      warningText: '',
      protfolio: 'Office',
      unit: '13/F',
      floor: '13/F',
      tenant: 'Tenant of CA000000500',
      shop: 'shop 3',
      tradeCategory: '1',
      unitZone: 'Zone A',
      leaseExpDate: '31-Oct-2025',
      itemEndDate: '31-Oct-2025',
      assLevel: 'GL',
      assGroup: 'Term GP 216',
      firstRenew: true,
      secondRenew: false,
      thirdRenew: false
    }
  ];
  public pcRowData = [
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '01-Nov-2017',
      endDate: '31-Oct-2021',
      bf: 'M',
      amount: 90027.95
    },
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '01-Nov-2017',
      endDate: '31-Oct-2021',
      bf: 'M',
      amount: 90027.95
    },
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '01-Nov-2017',
      endDate: '31-Oct-2021',
      bf: 'M',
      amount: 90027.95
    },
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '01-Nov-2017',
      endDate: '31-Oct-2021',
      bf: 'M',
      amount: 90027.95
    },
    {
      chargeCode: 'BASE RENT',
      description: 'BASE RENT DESC.',
      shop: 'shop 1',
      startDate: '01-Nov-2017',
      endDate: '31-Oct-2021',
      bf: 'M',
      amount: 90027.95
    },
  ]
  public rentRowData = [
    {
      rrDate: '01-Nov-2021',
      condition: 'OMR',
      collarAmount: 103030,
      collarRate: 10,
      capAmount: 1049840,
      capRate: 0.5
    },
    {
      rrDate: '01-Nov-2021',
      condition: 'OMR',
      collarAmount: 103030,
      collarRate: 10,
      capAmount: 1049840,
      capRate: 0.5
    },
    {
      rrDate: '01-Nov-2021',
      condition: 'OMR',
      collarAmount: 103030,
      collarRate: 10,
      capAmount: 1049840,
      capRate: 0.5
    }
  ]
  public currentTermRowData = [
    {
      evpFrom: '01-Nov-2017',
      evpTo: '31-Oct-2025',
      md1: '96/00',
      termForm: '01-Nov-2017',
      termTo: '31-Oct-2025',
      md2: '96/00',
      renew: true,
      remarks: 'testing'
    },
    {
      evpFrom: '01-Nov-2017',
      evpTo: '31-Oct-2025',
      md1: '96/00',
      termForm: '01-Nov-2017',
      termTo: '31-Oct-2025',
      md2: '96/00',
      renew: true,
      remarks: 'testing'
    },
    {
      evpFrom: '01-Nov-2017',
      evpTo: '31-Oct-2025',
      md1: '96/00',
      termForm: '01-Nov-2017',
      termTo: '31-Oct-2025',
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
  public components;
  public show: boolean = false;
  public onToggle(): void {
    this.show = !this.show;
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
  public get byTermCellrendererParams(){
    return this.colDefService.byTermCellrendererParams;
  }
  constructor(
    private gridDefService: GridDefService,
    private colDefService: ColDefService,
    private notificationService: NotificationService
  ) {
    this.components = { datePicker: getDatePicker(), checkbox: getCheckBox(), numeric: getNumeric() };
    console.log('hello')
    console.log('components', this.components);
  }

  ngOnInit() {
  }

  print(){
    console.log('rowData', this.rowData);
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
  public selectedRowsString ='';

  onSelectionChanged() {
    var selectedRows = this.termGridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
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
    //document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }
}
function getCheckBox() {
  function Checkbox() { }
  Checkbox.prototype.init = function (params) {
    console.log('params', params);
    this.eInput = document.createElement("input");
    this.eInput.type="checkbox";
    this.eInput.checked = params.value;
    this.eInput.setAttribute("style","margin-left:10px");
  };
  Checkbox.prototype.getGui = function () {
    return this.eInput;
  };
  Checkbox.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };
  Checkbox.prototype.getValue = function () {
    return this.eInput.checked;
  };
  Checkbox.prototype.destroy = function () { };
  Checkbox.prototype.isPopup = function () {
    return false;
  };
  return Checkbox;
}

function getNumeric() {
  function Numeric() { }
  Numeric.prototype.init = function (params) {
    console.log('params', params);
    this.eInput = document.createElement("input");
    this.eInput.type="number";
    this.eInput.min = "1";
    this.eInput.max = "100"
    this.eInput.value = params.value;
  };
  Numeric.prototype.getGui = function () {
    return this.eInput;
  };
  Numeric.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };
  Numeric.prototype.getValue = function () {
    return this.eInput.value;
  };
  Numeric.prototype.destroy = function () { };
  Numeric.prototype.isPopup = function () {
    return false;
  };
  return Numeric;
}

function getDatePicker() {
  function Datepicker() { }
  Datepicker.prototype.init = function (params) {
    console.log('params', params);
    this.eInput = document.createElement("input");
    this.eInput.value = params.value;
    $(this.eInput).datepicker({ dateFormat: "dd-M-yy" });
    $(this.eInput).datepicker("setDate", params.value);
  };
  Datepicker.prototype.getGui = function () {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function () {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function () { };
  Datepicker.prototype.isPopup = function () {
    return false;
  };
  return Datepicker;
}