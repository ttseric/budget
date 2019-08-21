import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import 'inputmask/dist/inputmask/jquery.inputmask';
import 'inputmask/dist/inputmask/inputmask';
import Inputmask from "inputmask/dist/inputmask/inputmask.extensions"
import { formatDate } from '@angular/common';
import * as $ from 'jquery';
import { GridComponentsService } from './grid-components.service';


@Injectable({
  providedIn: 'root'
})
export class TermAssumptionColDefService {
  public termAssumptionColDefs = [];
  public rfpAssumptionColDefs = {};
  public termAssumptionReadOnlyColDefs = [];
  public rfpAssumptionReadOnlyColDefs= {};
  constructor(
    private gridComponentService: GridComponentsService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.buildColDefs();
    this.buildReadOnlyColDefs();
    this.buildRfpColDefs();
    this.buildRfpReadonlyColDefs();
  }

  buildColDefs() {
    this.termAssumptionColDefs = [
      {
        headerName: 'Line',
        field: "seq",
        width: 90,
        resizable: false,
        editable: false,
        cellEditor: 'numeric',
        cellRenderer: "agGroupCellRenderer"
      },
      {
        headerName: "EVP From",
        field: "evpFrom",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "datePicker",
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        },
        onCellValueChanged(params) {
          if(params.data.evpMD != ""){
            var newEndDate = params.context.componentParent.dateRangeMDService.calcEndDate(params.newValue, params.data.evpMD);
            console.log('new enddate', newEndDate);
            params.data.evpTo = newEndDate;
            params.api.refreshCells({force: true});
          }
        }
      },
      {
        headerName: "EVP To",
        field: "evpTo",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "datePicker",
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        },
        onCellValueChanged(params) {
          console.log('changed params', params);
          if(params.data.evpFrom != null){
            var newMD = params.context.componentParent.dateRangeMDService.calcMD(params.data.evpFrom, params.newValue);
            console.log('new MD', newMD);
            params.data.evpMD = newMD;
            params.api.refreshCells({force: true});
          }
        }
      },
      {
        headerName: "EVP M/D",
        field: "evpMD",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "mdTextbox"
      },
      {
        headerName: "Term From",
        field: "termFrom",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "datePicker",
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        }
      },
      {
        headerName: "Term To",
        field: "termTo",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "datePicker",
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        }
      },
      {
        headerName: "Term M/D",
        field: "termMD",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "mdTextbox"
      },
      {
        headerName: "Remarks",
        field: "remark",
        editable: (params)=>{
          return !params.data.isLocked;
        },
      }
    ]
  }

  buildReadOnlyColDefs() {
    this.termAssumptionReadOnlyColDefs = [
      {
        headerName: 'Line',
        field: "seq",
        width: 90,
        resizable: false,
        editable: false,
        cellRenderer: "agGroupCellRenderer"
      },
      {
        headerName: "EVP From",
        field: "evpFrom",
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        }
      },
      {
        headerName: "EVP To",
        field: "evpTo",
        editable: false,
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        }
      },
      {
        headerName: "EVP M/D",
        field: "evpMD",
        editable: false,
        cellEditor: "evpMD"
      },
      {
        headerName: "Term From",
        field: "termFrom",
        editable: false,
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        }
      },
      {
        headerName: "EVP To",
        field: "termTo",
        editable: false,
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        }
      },
      {
        headerName: "Term M/D",
        field: "termMD",
        editable: false,
      },
      {
        headerName: "Remarks",
        field: "remark",
        editable: true,
      }
    ]
  }
  buildRfpReadonlyColDefs(){
    this.rfpAssumptionReadOnlyColDefs = {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'RFP From',
            field: "rfpFrom",
            editable: false,
            cellRenderer: (data) => {
              if (data.value) {
                return formatDate(data.value, 'dd-MM-yyyy', this.locale);
              } else {
                return ''
              }
            }
          },
          {
            headerName: 'RFP To',
            field: "rfpTo",
            editable: false,
            cellRenderer: (data) => {
              if (data.value) {
                return formatDate(data.value, 'dd-MM-yyyy', this.locale);
              } else {
                return ''
              }
            }
          },
          {
            headerName: "M/D",
            field: "rfpMD",
            editable: false,
          },
          {
            headerName: "Remarks",
            field: "remark",
            editable: false
          }
        ],
      },
      getDetailRowData: function (params) {
        params.successCallback([...params.data.rfpAssumptions]);
      }
    }
  }
  buildRfpColDefs() {
    this.rfpAssumptionColDefs = {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'RFP From',
            field: "rfpFrom",
            editable: true,
            cellEditor: "datePicker",
            cellRenderer: (data) => {
              if (data.value) {
                return formatDate(data.value, 'dd-MM-yyyy', this.locale);
              } else {
                return ''
              }
            }
          },
          {
            headerName: 'RFP To',
            field: "rfpTo",
            editable: true,
            cellEditor: "datePicker",
            cellRenderer: (data) => {
              if (data.value) {
                return formatDate(data.value, 'dd-MM-yyyy', this.locale);
              } else {
                return ''
              }
            }
          },
          {
            headerName: "M/D",
            field: "rfpMD",
            editable: true,
          },
          {
            headerName: "Remarks",
            field: "remark",
            editable: true
          }
        ],
        components: this.gridComponentService.components,
        singleClickEdit: true
      },
      getDetailRowData: function (params) {
        console.log('detail params', params);
        params.successCallback([...params.data.rfpAssumptions]);
      }
    }
  }
}
