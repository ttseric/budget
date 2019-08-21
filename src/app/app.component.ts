import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PLS Budget';
  public splitButtonData: Array<any> = [{
    text: 'Option 1'
  }, {
    text: 'Option 2',
  }, {
    text: 'Option 3',
  }];
  public dropdownButtonData: Array<any> = [{
    text: 'Option 1'
  }, {
    text: 'Option 2',
  }, {
    text: 'Option 3',
  }];
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
  public columnDefs = [
    {
      headerName: 'Year',
      field: "year",
      cellRenderer: "agGroupCellRenderer"
    },
    {
      headerName: 'Type',
      field: "type"
    },
    {
      headerName: 'Description',
      field: "description"
    },
    {
      headerName: "Hyperion Version",
      field: 'hyperionVersion'
    },
    {
      headerName: "LastUploadDate",
      field: "lastUploadDate"
    },
    {
      headerName: "LastModifiedDate",
      field: "lastModifiedDate"
    }
  ];
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
  private gridApi;
  private gridColumnApi;
  public detailCellRendererParams;
  public detailRowHeight;
  public defaultColDef;

  public userInfo: any = null;
  public isIframe: boolean;

  constructor(
    private http: HttpClient,
    private broadcastService: BroadcastService,
    private msalService: MsalService,
    private authService: AuthenticationService
  ) {

    console.log('get user', this.msalService.getUser());
    console.log('token internal', this.msalService.getCachedTokenInternal(["user.read"]));
    console.log('cache', this.msalService.getCacheStorage());
    console.log('service', this.msalService);
    this.msalService.acquireTokenSilent(['user.read']).then(x => {
      console.log('token', x);
    })
    this.isIframe = window !== window.parent && !window.opener;
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: "version" },
          { field: "remarks" },
          { field: "status" },
          {
            field: "lockedBy",
          },
          { field: "lastUpdatedBy" },
          { field: "lastModifiedDate" },
          { field: "whatIfVersions" }
        ],
        onFirstDataRendered(params) {
          params.api.sizeColumnsToFit();
        }
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.versions);
      }
    };
  }

  public get name() {
    if (this.msalService.getUser())
      return this.msalService.getUser().name;
    else
      return '';
  }
  public get loggedIn() {
    return this.authService.isLoggedIn;
  }
  login() {
    this.msalService.loginPopup(["user.read"]);
  }

  logout() {
    this.msalService.logout();
  }
  ngOnInit() {

    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      console.log("login failure " + JSON.stringify(payload));
      this.msalService.loginRedirect();

    });

    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      console.log("login success " + JSON.stringify(payload));

      this.authService.login(payload._token);
    });

  }

}
