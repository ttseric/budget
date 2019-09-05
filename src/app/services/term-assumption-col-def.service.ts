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
        editable: false,
        cellEditor: "datePicker",
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MM-yyyy', this.locale);
          } else {
            return ''
          }
        },
      },
      {
        headerName: "EVP To",
        field: "evpTo",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "evpToDatePicker",
        cellRenderer: (params) => {
          if(params.data.evpTo){
            var dateString = formatDate(params.data.evpTo, 'dd-MM-yyyy', this.locale);
            var span = document.createElement("span");
            span.innerText = dateString;

            if(params.data.evpFrom && params.data.evpTo.getTime() < params.data.evpFrom.getTime()){
              span.setAttribute("style","color: red");
            }
            return span;
          }
          else{
            ''
          }

        },
        onCellValueChanged(params) {
        }
      },
      {
        headerName: "EVP M/D",
        field: "evpMD",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "evpMDTextbox",
        onCellValueChanged(params){
        },
        cellRenderer: (params)=>{
          if(params.data.evpMD && params.data.evpMD.length > 0){
            var mdArr = params.data.evpMD.split("/");
            if(parseInt(mdArr[0]) < 0 || parseInt(mdArr[1]) < 0){
              var span = document.createElement("span");

              span.setAttribute("style", "color:red");
              span.innerText = params.data.evpMD;
              return span;
            }
            return params.data.evpMD;
          }
        }
      },
      {
        headerName: "Term From",
        field: "termFrom",
        editable: false,
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
        cellEditor: "termDatePicker",
        cellRenderer: (params) => {
          if(params.value){
            var dateString = formatDate(params.value, 'dd-MM-yyyy', this.locale);
            var span = document.createElement("span");
            span.innerText = dateString;
            if(params.data.termTo.getTime() < params.data.termFrom.getTime()){
              span.setAttribute("style","color: red");
            }
            return span;
          }
          else{
            ''
          }

        },
        onCellValueChanged(params) {
        }
      },
      {
        headerName: "Term M/D",
        field: "termMD",
        editable: (params)=>{
          return !params.data.isLocked;
        },
        cellEditor: "termMDTextbox",
        onCellValueChanged(params){
          console.log('md textbox value changed', params)
        },
        cellRenderer: (params)=>{
          if(params.data.termMD && params.data.termMD.length > 0){
            var mdArr = params.data.termMD.split("/");
            if(parseInt(mdArr[0]) < 0 || parseInt(mdArr[1]) < 0){
              var span = document.createElement("span");

              span.setAttribute("style", "color:red");
              span.innerText = params.data.termMD;
              return span;
            }
            return params.data.termMD;
          }
        }
      },
      {
        headerName: "Remarks",
        field: "remarks",
        editable: (params)=>{
          return !params.data.isLocked;
        }
      },
      {
        headerName:"command",
        cellRenderer: (params)=>{
          var editButton = document.createElement("button");
          var saveButton = document.createElement("button");
          var cancelButton = document.createElement("button");
          
          var div = document.createElement("div");

          
          if(params.data.isEditing){
            div.appendChild(saveButton);
            div.appendChild(cancelButton);
          }else{
            div.appendChild(editButton);
          }
          editButton.innerText = "Edit";
          saveButton.innerText = "Save";
          cancelButton.innerHTML = "Cancel";
  
          cancelButton.onclick = () =>{
            params.context.componentParent.cancelEdit()
          }
          editButton.onclick = ()=>{
            params.context.componentParent.startEdit(params.rowIndex)
          };
          saveButton.onclick = ()=>{
            console.log('save');
            params.context.componentParent.save();
           // params.api.stopEditing();
          }

          return div;
        }
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
          },

        ],
        components: this.gridComponentService.components,
        singleClickEdit: true
      },
      getDetailRowData: function (params) {
        params.successCallback([...params.data.rfpAssumptions]);
      }
    }
  }
}
