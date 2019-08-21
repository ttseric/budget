import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { BudgetTerm, TermAssumption, RfpAssumption } from '../models/BudgetTerm';
import { PopupEditorWrapper } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})
export class RevenueGridColDefService {
  public defaultColDef = {
    resizable: true,
    sortable: true,
    lockPosition: true,
    editable: false,
    filter: 'agTextColumnFilter',

  }
  public footerRowData = [
  ]

  public rowData: BudgetTerm[] = [
  ];
  public colDef;
  public footerColDef;
  public numerOfMonth: number;
  public startDate: Date;
  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.startDate = new Date(2019, 0, 1);
    this.numerOfMonth = 72;
    this.buildColDef();
    this.buildFooterDef();
    var footerData: any = {
      _2019Figures:{
        total: 0,
        _01:{
          value: 0
        },
        _02:{
          value: 0
        },
        _03:{
          value: 0
        },
        _04:{
          value: 0
        },
        _05:{
          value: 0
        },
        _06:{
          value: 0
        },
        _07:{
          value: 0
        },
        _08:{
          value: 0
        },
        _09:{
          value: 0
        },
        _10:{
          value: 0
        },
        _11:{
          value: 0
        },
        _12:{
          value: 0
        }
      },
      _2020Figures:{
        total: 0,
        _01:{
          value: 0
        },
        _02:{
          value: 0
        },
        _03:{
          value: 0
        },
        _04:{
          value: 0
        },
        _05:{
          value: 0
        },
        _06:{
          value: 0
        },
        _07:{
          value: 0
        },
        _08:{
          value: 0
        },
        _09:{
          value: 0
        },
        _10:{
          value: 0
        },
        _11:{
          value: 0
        },
        _12:{
          value: 0
        }
      },
      _2021Figures:{
        total: 0,
        _01:{
          value: 0
        },
        _02:{
          value: 0
        },
        _03:{
          value: 0
        },
        _04:{
          value: 0
        },
        _05:{
          value: 0
        },
        _06:{
          value: 0
        },
        _07:{
          value: 0
        },
        _08:{
          value: 0
        },
        _09:{
          value: 0
        },
        _10:{
          value: 0
        },
        _11:{
          value: 0
        },
        _12:{
          value: 0
        }
      },
      _2022Figures:{
        total: 0,
        _01:{
          value: 0
        },
        _02:{
          value: 0
        },
        _03:{
          value: 0
        },
        _04:{
          value: 0
        },
        _05:{
          value: 0
        },
        _06:{
          value: 0
        },
        _07:{
          value: 0
        },
        _08:{
          value: 0
        },
        _09:{
          value: 0
        },
        _10:{
          value: 0
        },
        _11:{
          value: 0
        },
        _12:{
          value: 0
        }
      },
      _2023Figures:{
        total: 0,
        _01:{
          value: 0
        },
        _02:{
          value: 0
        },
        _03:{
          value: 0
        },
        _04:{
          value: 0
        },
        _05:{
          value: 0
        },
        _06:{
          value: 0
        },
        _07:{
          value: 0
        },
        _08:{
          value: 0
        },
        _09:{
          value: 0
        },
        _10:{
          value: 0
        },
        _11:{
          value: 0
        },
        _12:{
          value: 0
        }
      },
      _2024Figures:{
        total: 0,
        _01:{
          value: 0
        },
        _02:{
          value: 0
        },
        _03:{
          value: 0
        },
        _04:{
          value: 0
        },
        _05:{
          value: 0
        },
        _06:{
          value: 0
        },
        _07:{
          value: 0
        },
        _08:{
          value: 0
        },
        _09:{
          value: 0
        },
        _10:{
          value: 0
        },
        _11:{
          value: 0
        },
        _12:{
          value: 0
        }
      },
    };
    
    for (var i = 0; i < 300; i++) {
      var sampleData:BudgetTerm = new BudgetTerm();

      sampleData.budgetTermId = i;
      sampleData.seq = i + 1;
      sampleData.warning = this.randomString().substring(0, 10);
      sampleData.unit = this.randomNumber().toString();
      sampleData.tenant = this.randomString().substring(0, 20);
      sampleData.shop = this.randomString().substring(0, 5);
      sampleData.floor = this.randomNumber() + "/f";
      sampleData.zone = this.randomString().substring(0,2);
      sampleData.expiryDate = this.randomDate();
      sampleData.termLevel = this.randomString().substring(0, 6);
      sampleData.termGroup = this.randomString().substring(0,6);
      sampleData.firstRenew = this.randomBool();
      sampleData.secondRenew = this.randomBool();
      sampleData.thirdRenew = this.randomBool();
      sampleData.chargeLevel = this.randomString().substring(0,6);
      sampleData.chargeGroup = this.randomString().substring(0,6);
      sampleData.leaseNo = this.randomString().substring(0,15);
      sampleData.businessUnit = this.randomString().substring(0,10);
      sampleData.commDate = this.randomDate();
      sampleData.lastSyncDate = this.randomDate();
      sampleData.trade = this.randomString().substring(0,10);
      sampleData.subTrade = this.randomString().substring(0,10);
      sampleData.itemStartDate = this.randomDate();
      sampleData.itemEndDate = new Date(2025, 12, 31);
      sampleData.weightedArea = this.randomNumber();
      sampleData.pcCharges = [];
      sampleData.rentReviews = [];
      sampleData.currentTermAssumptions = [];
      sampleData.isDirty = false;
      sampleData.isLocked = false;
      sampleData.evpMD = "02/00";
      sampleData.leaseMD = "24/00";
      sampleData.rfpMD = "01/00";
      sampleData.contractualTerms = [];

      var contracturalTerm = new TermAssumption();

      contracturalTerm.budgetTermId = sampleData.budgetTermId;
      contracturalTerm.termFrom = new Date(2015, 11, 5);
      contracturalTerm.termTo = new Date(2019, 11, 4)
      contracturalTerm.termMD = "48/00";
      contracturalTerm.isLocked = true;
      sampleData.contractualTerms.push(contracturalTerm);

      for(var k=2019;k<=2024;k++){
        var total = 0;
        var figureName = "_" + k + "Figures";
        sampleData[figureName] = {};
        for(var j=1;j<=12;j++){
          var monthName = j<=9? "_0" + j: "_" + j;
          var r = this.randonBigNumber();

          total += r;
          sampleData[figureName][monthName] = {};
          sampleData[figureName][monthName].value = r;
          sampleData[figureName][monthName].color = this.randomColor();
          footerData[figureName][monthName].value += r;
        }

        footerData[figureName].total += total;
        sampleData[figureName].total = total;
      }

      for(var l=0;l<10;l++){
        var pc = {
          chargeCode: this.randomString().substring(0,10),
          description: this.randomString().substring(0,30),
          shop: sampleData.shop,
          startDate: this.randomDate(),
          endDate: this.randomDate(),
          bf: this.randomString().substring(0,5),
          amount: this.randonBigNumber()
        }
        sampleData.pcCharges.push(pc);
      }

      for(var n=0;n<10;n++){
        var rent = {
          rrDate: this.randomDate(),
          condition: this.randomString().substring(0, 10),
          collarAmount: this.randomNumber(),
          collarRate: this.randomNumber(),
          capRate: this.randomNumber(),
          capAmount: this.randomNumber()
        }

        sampleData.rentReviews.push(rent);
      }

      for(var w=0;w<10;w++){
        var term: TermAssumption = {
          budgetTermId: sampleData.budgetTermId,
          termAssumptionId: 0,
          seq: w,
          evpFrom: this.randomDate(),
          evpTo: this.randomDate(),
          evpMD: "01/00",
          termFrom: this.randomDate(),
          termTo:this.randomDate(),
          termMD: "24/00",
          renew: this.randomBool(),
          remarks: this.randomString().substring(0,30),
          error:"",
          isLocked: false,
          rfpAssumptions:[]
        }

        for(var v=0;v<5;v++){
            var rfp: RfpAssumption = {
              rfpAssumptionId: 0,
              rfpFrom: this.randomDate(),
              rfpTo: this.randomDate(),
              rfpMD: "02/00",
              remarks: this.randomString().substring(0,10),
              error:""
            }
            term.rfpAssumptions.push(rfp);
        }

        sampleData.currentTermAssumptions.push(term);
      }
      sampleData.editingTermAssumptions = [...sampleData.currentTermAssumptions];
      this.rowData.push(sampleData);
    }
  
    this.footerRowData.push(footerData);
  }
  public randomColor():string{
    var i = Math.floor(Math.random() * 6);
    return this.colors[i];
  }
  public colors = [
    "rgba(255, 251, 175, 0.4)",
    "rgba(255,58,40, 0.4)",
    "rgba(255, 128, 171, 0.4)",
    "rgba(185, 247, 202, 0.4)",
    "rgba(127,255,255, 0.4);",
    "rgba(255,178,127, 0.4);"
  ]
  public randomBool():boolean{
    return Math.random() >= 0.5;
  }
  public randomDate(): Date {
    var start = new Date(2016, 1, 1);
    var end = new Date(2025, 12, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  public randomNumber(): number {
    return Math.floor(Math.random() * 101);
  }
  public randonBigNumber(): number {
    return Math.floor(Math.random() * 1000);
  }
  public randomString(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  public buildFooterDef() {
    this.footerColDef = [];
    this.footerColDef = [
      {
        headerName: "Item",
        children: [
          {
            headerName: "Seq",
            field: "seq",
            checkboxSelection: false,
            headerCheckboxSelection: false,
            headerCheckboxSelectionFilteredOnly: false,
            pinned: "left",
            lockPinned: true,
            tooltipField: 'seq'
          },
          {
            headerName: "Warning",
            field: "warning",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'warning'
          }
        ]
      },
      {
        headerName: "Unit",
        children: [
          {
            headerName: "Unit",
            field: "unit",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'unit',
          },
          {
            headerName: "Floor",
            field: "floor",
            pinned: "left",
            lockPinned: true,
            columnGroupShow: "open",
            tooltipField: 'floor'
          },
          {
            headerName: "Zone",
            field: "zone",
            pinned: "left",
            lockPinned: true,
            columnGroupShow: "open",
            tooltipField: 'zone'
          }
        ]
      },
      {
        headerName: "Tenant",
        children: [
          {
            headerName: "Tenant",
            field: "tenant",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'tenant'
          },
          {
            headerName: "Shop",
            field: "shop",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'shop'
          },
          {
            headerName: "Trade",
            field: "trade",
            pinned: "left",
            lockPinned: true,
            columnGroupShow: "open",
            tooltipField: 'trade'
          },
          {
            headerName: "Expiry",
            field: "expiryDate",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'expiryDate',
            cellRenderer: (data) => {
              if (data.value) {
                return formatDate(data.value, 'dd-MM-yyyy', this.locale);
              } else {
                return ''
              }
            }
          }
        ]
      },
      {
        headerName: "Term Assumption",
        children: [
          {
            headerName: "Level",
            field: "termLevel",
            pinned: null,
            lockPinned: true,
            width: 80,
            tooltipField: 'termLevel'
          },
          {
            headerName: "Group",
            field: "termGroup",
            pinned: null,
            lockPinned: true,
            width: 80,
            tooltipField: 'termGroup'
          }
        ]
      },
      {
        headerName: "Renewal",
        children: [
          {
            headerName: "EVP M/D",
            field: "evpMD",
            pinned: null,
            lockPinned: true,
          },
          {
            headerName: "Lease M/D",
            field: "leaseMD",
            pinned: null,
            lockPinned: true,
          },
          {
            headerName: "RFP M/D",
            field: "rfpMD",
            pinned: null,
            lockPinned: true,
          },
          {
            headerName: "1st Renew",
            field: "firstRenew",
            pinned: null,
            lockPinned: true,
            tooltipField: 'firstRenew'
          },
          {
            headerName: "2nd Renew",
            field: "secondRenew",
            pinned: null,
            lockPinned: true,
            tooltipField: 'secondRenew'
          },
          {
            headerName: "3rd Renew",
            field: "thirdRenew",
            pinned: null,
            lockPinned: true,
            tooltipField: 'thirdRenew'
          }
        ]
      },
      {
        headerName: "Charge Assumption",
        children: [
          {
            headerName: "Level",
            field: "chargeLevel",
            pinned: null,
            lockPinned: true,
            tooltipField: 'chargeLevel'
          },
          {
            headerName: "Group",
            field: "chargeGroup",
            pinned: null,
            lockPinned: true,
            tooltipField: 'chargeGroup'
          }
        ]
      },
    ];
    this.footerColDef = [...this.footerColDef, ...this.buildYearMonthCols()]
  }
  public buildColDef() {
    this.colDef = [];
    this.colDef = [
      {
        headerName: "Item",
        children: [
          {
            headerName: "Seq",
            field: "seq",
            checkboxSelection: true,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            pinned: "left",
            lockPinned: true,
            tooltipField: 'seq'
          },
          {
            headerName: "Warning",
            field: "warning",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'warning'
          }
        ]
      },
      {
        headerName: "Unit",
        children: [
          {
            headerName: "Unit",
            field: "unit",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'unit',
          },
          {
            headerName: "Floor",
            field: "floor",
            pinned: "left",
            lockPinned: true,
            columnGroupShow: "open",
            tooltipField: 'floor'
          },
          {
            headerName: "Zone",
            field: "zone",
            pinned: "left",
            lockPinned: true,
            columnGroupShow: "open",
            tooltipField: 'zone'
          }
        ]
      },
      {
        headerName: "Tenant",
        children: [
          {
            headerName: "Tenant",
            field: "tenant",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'tenant',
            editable: true
          },
          {
            headerName: "Shop",
            field: "shop",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'shop'
          },
          {
            headerName: "Trade",
            field: "trade",
            pinned: "left",
            lockPinned: true,
            columnGroupShow: "open",
            tooltipField: 'trade'
          },
          {
            headerName: "Expiry",
            field: "expiryDate",
            pinned: "left",
            lockPinned: true,
            tooltipField: 'expiryDate',
            cellRenderer: (data) => {
              if (data.value) {
                return formatDate(data.value, 'dd-MM-yyyy', this.locale);
              } else {
                return ''
              }
            }
          }
        ]
      },
      {
        headerName: "Term Assumption",
        children: [
          {
            headerName: "Level",
            field: "termLevel",
            pinned: null,
            lockPinned: true,
            width: 80,
            tooltipField: 'termLevel'
          },
          {
            headerName: "Group",
            field: "termGroup",
            pinned: null,
            lockPinned: true,
            width: 80,
            tooltipField: 'termGroup'
          }
        ]
      },
      {
        headerName: "Renewal",
        children: [
          {
            headerName: "EVP M/D",
            field: "evpMD",
            pinned: null,
            lockPinned: true,
            editable: true,
            cellEditor: "mdTextbox"
          },
          {
            headerName: "Lease M/D",
            field: "leaseMD",
            pinned: null,
            lockPinned: true,
            editable: true,
            cellEditor: "mdTextbox"
          },
          {
            headerName: "RFP M/D",
            field: "rfpMD",
            pinned: null,
            lockPinned: true,
            editable: true,
            cellEditor: "mdTextbox"
          },
          {
            headerName: "1st Renew",
            field: "firstRenew",
            pinned: null,
            lockPinned: true,
            tooltipField: 'firstRenew',
            editable: true,
            cellEditor: "checkbox",
            cellRenderer: (params)=>{
              return `<input type='checkbox' ${params.value ? 'checked' : ''} /> `;
            }
          },
          {
            headerName: "2nd Renew",
            field: "secondRenew",
            pinned: null,
            lockPinned: true,
            tooltipField: 'secondRenew',
            editable: true,
            cellEditor: "checkbox",
            cellRenderer: (params)=>{
              return `<input type='checkbox' ${params.value ? 'checked' : ''} /> `;
            }
          },
          {
            headerName: "3rd Renew",
            field: "thirdRenew",
            pinned: null,
            lockPinned: true,
            tooltipField: 'thirdRenew',
            editable: true,
            cellEditor: "checkbox",
            cellRenderer: (params)=>{
              return `<input type='checkbox' ${params.value ? 'checked' : ''} /> `;
            }
          }
        ]
      },
      {
        headerName: "Charge Assumption",
        children: [
          {
            headerName: "Level",
            field: "chargeLevel",
            pinned: null,
            lockPinned: true,
            tooltipField: 'chargeLevel'
          },
          {
            headerName: "Group",
            field: "chargeGroup",
            pinned: null,
            lockPinned: true,
            tooltipField: 'chargeGroup'
          }
        ]
      },
    ];
    this.colDef = [...this.colDef, ...this.buildYearMonthCols()]
  }

  public buildYearMonthCols() {
    var yearMonthCols = [];
    var d = new Date(this.startDate.getTime());
    var numOfYear = this.numerOfMonth / 12;

    for (var k = 0; k < numOfYear; k++) {
      var year = this.startDate.getFullYear() + k;
      var colDef = {
        headerName: year.toString(),
        children: []
      }

      for (var i = 0; i < 12; i++) {
        var month = d.getMonth() + 1;
        var monthStr = month <= 9 ? ("0" + month) : month;
        var yearStr = d.getFullYear().toString();
        var headerName = monthStr + "/" + yearStr;
        var valueGetter = "data._" + yearStr + "Figures._" + monthStr;
        var childColDef = {
          headerName: headerName,
          columnGroupShow: "open",
          pinned: null,
          lockPinned: true,
          width: 100,
          cellClass: 'cell-number',
          valueGetter: valueGetter,
          cellStyle: (params) => {
            var style = {
              'background-color': params.value.color
            }

            return style
          },
          cellRenderer: (params) => {
            return params.value.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
          }
        };

        d.setMonth(d.getMonth() + 1);
        colDef.children.push(childColDef);

      }

      var totalValueGetter = "data._" + yearStr + "Figures.total";
      var toalColDef = {
        headerName: "Total",
        columnGroupShow: "closed",
        pinned: null,
        lockPinned: true,
        width: 90,
        valueGetter: totalValueGetter,
        cellClass: 'cell-number',
        cellRenderer: (params) => {
          return params.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
      }
      colDef.children.push(toalColDef);
      yearMonthCols.push(colDef);
    }


    return yearMonthCols;
  }
}
