import { Component, OnInit } from '@angular/core';
import { GridDef, SortModel } from 'src/app/models/gridDef';
import { GridDefService } from 'src/app/services/grid-def.service';
import { ColDefService } from 'src/app/services/col-def.service';
import { ColumnApi, GridApi, GridOptions } from "ag-grid-community";
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';
import { forkJoin } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title = 'PLS Budget';
  public show: boolean = false;
  public onToggle(): void {
    this.show = !this.show;
  }

  ngOnInit() {
  }
  public offices: Array<any> = [
    { text: '1001 MANAGEMENT OFFICE' },
    { text: '1002 MANAGEMENT OFFICE' }
  ];
  public buildings: Array<any> = [
    { text: 'BLDG 1012' },
    { text: 'BLDG 1013' },
    { text: 'BLDG 1014' },
    { text: 'BLDG 1015' },
  ];
  public years: Array<any> = [
    { text: "2019" },
    { text: "2018" },
    { text: "2017" },
    { text: "2016" },
    { text: "2015" },
    { text: "2014" },
  ]
  public budgetListingGridColumnDefs = this.colDefService.budgetListingGridColumnDefs;

  public rowData = [
    {
      year: 2014, type: '5-year budget', description: 'Budget ID 1796', hyperionVersion: '4', lastUploadDate: '10-Sep-2014', lastModifiedDate: '05-Aug-2014 15:33',
      versions: [
        { version: "1", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "2", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "3", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "4", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },

      ]
    },
    {
      year: 2015, type: '5-year budget', description: 'Budget ID 1796', hyperionVersion: '4', lastUploadDate: '10-Sep-2014', lastModifiedDate: '05-Aug-2014 15:33',
      versions: [
        { version: "1", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "2", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "3", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "4", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },

      ]
    },
    {
      year: 2016, type: '5-year budget', description: 'Budget ID 1796', hyperionVersion: '4', lastUploadDate: '10-Sep-2014', lastModifiedDate: '05-Aug-2014 15:33',
      versions: [
        { version: "1", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "2", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "3", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },
        { version: "4", remarks: 'BV_ID 4673', status: 'Frozen', lockedBy: 'spl\erictstsang', lastModifiedDate: '04-Mar-2014 12:01', whatIfVersions: '0' },

      ]
    },
  ];
  public selectedYear = this.years[0];
  public selectedOffice = this.offices[0];
  public selectedBuilding = this.buildings[0];

  public opened: boolean = false;
  private gridApi;
  private gridColumnApi;
  private detailGridApi;
  private detailColumnApi;
  public budgetListDetailCellRendererParams;
  public detailRowHeight;
  public defaultColDef;
  public goMain;
  public centreTop;
  public centreLeft;

  constructor(
    private router: Router,
    private gridDefService: GridDefService,
    private colDefService: ColDefService,
    private notificationService: NotificationService,
    private msalService: MsalService
  ) {
    this.budgetListDetailCellRendererParams = this.colDefService.budgetListDetailCellRendererParams;
    this.budgetListDetailCellRendererParams.detailGridOptions.onGridReady = this.detailGridReady.bind(this);
    this.budgetListDetailCellRendererParams.detailGridOptions.getContextMenuItems = this.getContextMenuItems.bind(this);
  }
  public get name(){
    if(this.msalService.getUser())
    return this.msalService.getUser().name;
    else
    return '';
  }
  saveGrids() {
    var responses = [];
    if (this.gridApi != undefined) {
      var r = this.saveGrid("budgetListGrid", this.gridApi, this.gridColumnApi)
      responses.push(r);
    }

    if(this.detailGridApi != undefined){
      var r = this.saveGrid("budgetListDetailGrid", this.detailGridApi, this.detailColumnApi);
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

    console.log('detail', this.budgetListDetailCellRendererParams)
    return this.gridDefService.save(gridDef);
  }
  logout()
  {
   this.msalService.logout();
  }
  configGrid(gridApi: GridApi, columnApi: ColumnApi, gridDef: GridDef) {
    var colStates = gridDef.colStates;
    var sortModels = gridDef.sortModels;

    columnApi.setColumnState(colStates);
    gridApi.setSortModel(sortModels);
  }
  goMainPage() {
    this.router.navigateByUrl('/main')
  }
  detailGridReady(params){
    this.detailColumnApi = params.columnApi;
    this.detailGridApi = params.api;

    console.log('detailColumnApi', this.detailColumnApi);
    console.log('detailGridApi', this.detailGridApi);

    this.gridDefService.getGridDef("budgetListDetailGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.detailGridApi, this.detailColumnApi, response.gridDef);
      }
    })

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log('gridapi', this.gridApi);
    console.log('gridColumnApi', this.gridColumnApi);

    this.gridDefService.getGridDef("budgetListGrid").subscribe(response => {
      if (response.gridDef != null) {
        this.configGrid(this.gridApi, this.gridColumnApi, response.gridDef);
      }
    })
  }
  close() {
    this.opened = false;
  }
  submit() {
    this.goMainPage();
  }
  getContextMenuItems(params) {
    var result = [
      {
        name: "View Budget",
        action: () => {
          this.goMainPage();
        },
        cssClasses: ["redFont", "bold"]
      },
      {
        name: "Copy Buget",
        action: () => {
          this.centreTop = 20;
          this.centreLeft = (window.innerWidth - 800) / 2;
          this.opened = true;
        },
      },
      {
        name: "Delete"
      },
      {
        name: "Approve"
      },
      {
        name: "Reject"
      },
      {
        name: "Req for Approve"
      },
      {
        name: "Unapprove"
      },
      {
        name: "Freeze"
      },
      {
        name: "Unfreeze"
      },
      "separator",
      "copy",
      "export"
    ];
    return result;
  }
}
