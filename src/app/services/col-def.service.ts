import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColDefService {

  public termGridColumnDefs;
  public pcGridColumnDefs = [
    {
      headerName: 'Charge Code',
      field: "chargeCode",
      width: 80
    },
    {
      headerName: 'Description',
      field: "description",
      width: 80
    },
    {
      headerName: 'Shop',
      field: "shop",
      width: 80
    },
    {
      headerName: 'Start Date',
      field: "startDate",
      width: 80
    },
    {
      headerName: 'End Date',
      field: "endDate",
      width: 80
    },
    {
      headerName: 'B.F',
      field: "bf",
      width: 80
    },
    {
      headerName: 'Amount',
      field: "amount",
      width: 80,
      cellStyle: { 'text-align': 'right' }
    }
  ]
  public rentGridColumnDefs = [
    {
      headerName: 'R.R. Date',
      field: "rrDate",
      width: 80
    },
    {
      headerName: 'Condition',
      field: "condition",
      width: 80
    },
    {
      headerName: 'Collar Amount(Cal.)',
      field: "collarAmount",
      width: 80
    },
    {
      headerName: 'Collar Rate /sf(Amt.)',
      field: "collarRate",
      width: 80
    },
    {
      headerName: 'Cap Amount(Cal.)',
      field: "capAmount",
      width: 80
    },
    {
      headerName: 'Cap Rate /sf(Amt.)',
      field: "capRate",
      width: 80
    },
  ]
  public currentTermGridColumnDefs = [
    {
      headerName: 'EVP From',
      field: "evpFrom",
      width: 80
    },
    {
      headerName: 'EVP To',
      field: "evpTo",
      width: 80
    },
    {
      headerName: 'M/D',
      field: "md1",
      width: 80
    },
    {
      headerName: 'Term From',
      field: "termForm",
      width: 80
    },
    {
      headerName: 'Term To',
      field: "termTo",
      width: 80
    },
    {
      headerName: 'M/D',
      field: "md2",
      width: 80
    },
    {
      headerName: 'Renew',
      field: "renew",
      width: 80
    },
    {
      headerName: 'Remarks',
      field: "remarks",
      width: 80
    }
  ]
  public budgetListingGridColumnDefs = [
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
  public budgetListDetailCellRendererParams = {
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
      enableRangeSelection: true,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      }
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.versions);
    },
  };
  constructor(

  ) { 
    this.buildTermDefs();
  }
  buildTermDefs(){
    var tradeCategories = {
      '1': "Trade 1",
      '2': "Trade 2",
      '3': "Trade 3",
      '4': "Trade 4"
    };
    this.termGridColumnDefs = [
      {
        headerName: 'Seq',
        field: "seq",
        width: 80,
        resizable: true,
        editable: true,
        cellEditor: 'numeric'
      },
      {
        headerName: '',
        field: "col1",
        width: 30,
      },
      {
        headerName: 'Lock',
        field: "lock",
        width: 80,
      },
      {
        headerName: "Is C.R",
        field: 'isCR',
        width: 60,
        editable: true,
        cellEditor: "checkbox",
        cellRenderer: (params)=>{
          return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
        }
      },
      {
        headerName: "warning",
        field: "warning",
        width: 60,
        editable: true
      },
      {
        headerName: "Warn Text",
        field: "warningText",
        width: 60,
        editable: true
      },
      {
        headerName: "Portfolio",
        field: "protfolio",
        width: 100,
        editable: true,
        cellEditor: "select",
        cellEditorParams: {
          values: ['Shop', 'Office']
        }
      },
      {
        headerName: "Unit",
        field: "unit",
        width: 100,
      },
      {
        headerName: "Floor",
        field: "floor",
        width: 100,
      },
      {
        headerName: "Tenant",
        field: "tenant",
        editable: true
      },
      {
        headerName: "Shop",
        field: "shop",
        editable: true
      },
      {
        headerName: "Trade Category",
        field: "tradeCategory",
        editable: true,
        cellEditor: "select",
        cellEditorParams: {
          values: extractValues(tradeCategories)
        },
        valueFormatter: function(params) {
          return lookupValue(tradeCategories, params.value);
        },
        valueParser: function(params) {
          return lookupKey(tradeCategories, params.newValue);
        }
      },
      {
        headerName: "Lease Exp. Date",
        field: "leaseExpDate",
        editable: true,
        cellEditor: "datePicker"
      },
      {
        headerName: "Ass. Level",
        field: "assLevel",
        editable: true
      }, 
      {
        headerName: "Ass. Group",
        field: "assGroup",
        editable: true
      },
      {
        headerName: "1st Renew",
        field: "firstRenew",
        width: 100,
        editable: true,
        cellEditor: "checkbox",
        cellRenderer: (params)=>{
          return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
        }
      },
      {
        headerName: "2nd Renew",
        field: "secondRenew",
        width: 100,
        editable: true,
        cellEditor: "checkbox",
        cellRenderer: (params)=>{
          return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
        }
      },
      {
        headerName: "3rd Renew",
        field: "thirdRenew",
        width: 100,
        editable: true,
        cellEditor: "checkbox",
        cellRenderer: (params)=>{
          return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
        }
      },
  
    ];
  }
}

function extractValues(mappings) {
  return Object.keys(mappings);
}
function lookupValue(mappings, key) {
  return mappings[key];
}
function lookupKey(mappings, name) {
  for (var key in mappings) {
    if (mappings.hasOwnProperty(key)) {
      if (name === mappings[key]) {
        return key;
      }
    }
  }
}
