import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import 'inputmask/dist/inputmask/jquery.inputmask';
import 'inputmask/dist/inputmask/inputmask';
import Inputmask from "inputmask/dist/inputmask/inputmask.extensions"
import { formatDate } from '@angular/common';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ColDefService {
  public defaultColDef = {
    resizable: true,
    sortable: true
  }
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
      width: 80,
      cellRenderer: (data) => {
        if (data.value) {
          return formatDate(data.value, 'dd-MM-yyyy', this.locale);
        } else {
          return ''
        }
      }
    },
    {
      headerName: 'End Date',
      field: "endDate",
      width: 80,
      cellRenderer: (data) => {
        if (data.value) {
          return formatDate(data.value, 'dd-MM-yyyy', this.locale);
        } else {
          return ''
        }
      }
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
      cellStyle: { 'text-align': 'right' },
      cellRenderer: (params) => {
        return params.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      }
    }
  ]
  public rentGridColumnDefs = [
    {
      headerName: 'R.R. Date',
      field: "rrDate",
      width: 80,
      cellRenderer: (data) => {
        if (data.value) {
          return formatDate(data.value, 'dd-MM-yyyy', this.locale);
        } else {
          return ''
        }
      }
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
      headerName: 'Line',
      field: "seq",
      width: 90,
      resizable: false,
      editable: false,
      cellEditor: 'numeric',
      cellRenderer: "agGroupCellRenderer"
    },
    {
      headerName: 'EVP To',
      field: "evpTo",
      width: 80,
      cellRenderer: (data) => {
        if (data.value) {
          return formatDate(data.value, 'dd-MM-yyyy', this.locale);
        } else {
          return ''
        }
      }
    },
    {
      headerName: 'M/D',
      field: "evpMD",
      width: 80
    },
    {
      headerName: 'Term From',
      field: "termForm",
      width: 80,
      cellRenderer: (data) => {
        if (data.value) {
          return formatDate(data.value, 'dd-MM-yyyy', this.locale);
        } else {
          return ''
        }
      }
    },
    {
      headerName: 'Term To',
      field: "termTo",
      width: 80,
      cellRenderer: (data) => {
        if (data.value) {
          return formatDate(data.value, 'dd-MM-yyyy', this.locale);
        } else {
          return ''
        }
      }
    },
    {
      headerName: 'M/D',
      field: "termMD",
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
      defaultColDef: this.defaultColDef,
      enableRangeSelection: true,
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      }
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.versions);
    },
  };
  public byTermCellrendererParams;
  public components;
  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.components = { datePicker: getDatePicker(), checkbox: getCheckBox(), numeric: getNumeric(), escalationSelect: getEscalationSelect(), mdTextbox: getMDTextbox() };
    this.buildTermDefs();
    this.buildTermDetailDefs();
  }
  buildTermDetailDefs() {
    this.byTermCellrendererParams = {
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'Term No.',
            field: "budgetTermName",
            editable: (params) => {
              if (params.data.isLocked) {
                return false;
              }
              return true;
            },
            filter: "agTextColumnFilter",
            onCellValueChanged: (params) => {
              if (params.newValue != params.oldValue) {
                params.context.componentParent.detailValueChanged(params.data);
              }
            }
          },
          {
            headerName: 'Type',
            field: "termType",
            editable: (params) => {
              if (params.data.isLocked) {
                return false;
              }
              return true;
            },
            cellEditor: 'select',
            cellEditorParams: {
              values: ['Lease', 'EVP', 'RFP']
            },
            onCellValueChanged: (params) => {
              if (params.newValue != params.oldValue) {
                params.context.componentParent.detailValueChanged(params.data);
              }
            }
          },
          {
            headerName: "from",
            field: "from",
            editable: (params) => {
              if (params.data.isLocked) {
                return false;
              }
              return true;
            },
            cellEditor: "datePicker",
            cellRenderer: (data) => {
              if (data.value) {
                return formatDate(data.value, 'dd-MMM-yyyy', this.locale);
              } else {
                return ''
              }
            },
            onCellValueChanged: (params) => {
              if (params.newValue != params.oldValue) {
                params.context.componentParent.detailValueChanged(params.data);
              }
            }
          },
          {
            headerName: "to",
            field: "to",
            editable: (params) => {
              if (params.data.isLocked) {
                return false;
              }
              return true;
            },
            cellEditor: "datePicker",
            cellRenderer: (data) => {
              if (data.value) {
                return formatDate(data.value, 'dd-MMM-yyyy', this.locale);
              } else {
                return ''
              }
            },
            onCellValueChanged:(params)=>{
              if(params.newValue != params.oldValue){
                params.context.componentParent.detailValueChanged(params.data);
              }
            }
          },
          {
            headerName: "M/D",
            field: "termLength",
            editable: (params) => {
              if (params.data.isLocked) {
                return false;
              }
              return true;
            },
            cellEditor: "mdTextbox",
            onCellValueChanged:(params)=>{
              if(params.newValue != params.oldValue){
                params.context.componentParent.detailValueChanged(params.data);
              }
            }
          },
          {
            headerName: "Remarks",
            field: "remark",
            editable: (params) => {
              if (params.data.isLocked) {
                return false;
              }
              return true;
            },
            onCellValueChanged:(params)=>{
              if(params.newValue != params.oldValue){
                params.context.componentParent.detailValueChanged(params.data);
              }
            }
          }
        ],
        defaultColDef: this.defaultColDef,
        components: { datePicker: getDatePicker(), checkbox: getCheckBox(), numeric: getNumeric(), mdTextbox: getMDTextbox() },
        singleClickEdit: true,
        rowSelection: 'multiple'
      },
      getDetailRowData: function (params) {
        params.successCallback([...params.data.contractualTerms,...params.data.budgetDetailTerms]);
      }
    }
  }
  buildTermDefs() {
    this.termGridColumnDefs = [
      {
        headerName: 'Seq',
        field: "seq",
        width: 80,
        resizable: true,
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: 'numeric',
        cellRenderer: "agGroupCellRenderer"
      },
      {
        headerName: '',
        width: 40,
        editable: false,
        field: "isDirty",
        cellRenderer: (params) => {
          if (params.data.isDirty) {
            return "<span><i class='far fa-save'></i></span>";
          }
        }
      },
      {
        headerName: 'Locked',
        field: "isLocked",
        width: 80,
        editable: true,
        cellEditor: "checkbox",
        cellRenderer: (params) => {
          var html;
          if (params.value) {
            html = `<input type='checkbox' ${params.value ? 'checked' : ''} /> <span><i style="margin-bottom:2px" class="fas fa-lock"></i></span> `;
          }
          else {
            html = `<input type='checkbox' ${params.value ? 'checked' : ''} /> <i class="fas fa-lock-open"></i> `;
          }

          return html;
        },
        onCellValueChanged(params) {
          params.data.budgetDetailTerms.forEach(element => {
            element.isLocked = params.newValue;
          });
        }

      },
      {
        headerName: "warning",
        field: "warning",
        width: 100,
      },
      {
        headerName: "Tenant",
        field: "tenant",
      },
      {
        headerName: "Escalation",
        field: "escalation",
        width: 100,
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "escalationSelect",
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "Lease M/D",
        field: "leaseTermLength",
        width: 100,
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "mdTextbox",
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "EVP M/D",
        field: "evpTermLength",
        width: 100,
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "mdTextbox",
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "RFP M/D",
        field: "rfpTermLength",
        width: 100,
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "mdTextbox",
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "1st Renew",
        field: "firstRenew",
        width: 80,
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "checkbox",
        cellRenderer: (params) => {
          return `<input type='checkbox' ${params.value ? 'checked' : ''} onclick="return false" />`;
        },
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "2nd Renew",
        field: "secondRenew",
        width: 80,
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "checkbox",
        cellRenderer: (params) => {
          return `<input type='checkbox' ${params.value ? 'checked' : ''} onclick="return false" />`;
        },
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "3rd Renew",
        field: "thirdRenew",
        width: 80,
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "checkbox",
        cellRenderer: (params) => {
          return `<input type='checkbox' ${params.value ? 'checked' : ''} onclick="return false" />`;
        },
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "Lease Exp. Date",
        field: "leaseExpireDate",
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "datePicker",
        width: 120,
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MMM-yyyy', this.locale);
          } else {
            return ''
          }
        },
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "Item End Date",
        field: "itemEndDate",
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        cellEditor: "datePicker",
        width: 100,
        cellRenderer: (data) => {
          if (data.value) {
            return formatDate(data.value, 'dd-MMM-yyyy', this.locale);
          } else {
            return ''
          }
        },
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
        }
      },
      {
        headerName: "Ass. Level",
        field: "assumptionLevel",
        editable: (params) => {
          if (params.data.isLocked) {
            return false;
          }
          return true;
        },
        width: 150,
        cellEditor: "select",
        cellEditorParams: {
          values: ["GL", "Manual", "Assumption 1", "Assumption 2"]
        },
        onCellValueChanged(params) {
          if (params.newValue != params.oldValue) {
            params.node.setDataValue("isDirty", true);
          }
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
function getCheckBox() {
  function Checkbox() { }
  Checkbox.prototype.init = function (params) {
    console.log('checkbox set value', params);
    this.eInput = document.createElement("input");
    this.eInput.type = "checkbox";
    this.eInput.checked = params.value;
    this.eInput.setAttribute("style", "margin-left:10px");
  };
  Checkbox.prototype.getGui = function () {
    return this.eInput;
  };
  Checkbox.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
    this.eInput.checked = !this.eInput.checked;
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
    this.eInput.type = "number";
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
    this.eInput.setAttribute("style", "width:100%")
    this.eInput.value = params.value;
    Inputmask({ "regex": "^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\[0-9]{4}$" }).mask(this.eInput);
    $(this.eInput).datepicker({ dateFormat: "dd-mm-yy" });


    if (params.value != null) {
      var d = new Date(params.value);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var dayStr = day < 10 ? "0" + day : day;
      var monthStr = month < 10 ? "0" + month : month;
      var dStr = dayStr + "-" + monthStr + "-" + year;
      console.log('date string', dStr);
      $(this.eInput).datepicker("setDate", dStr);
    }


  };
  Datepicker.prototype.getGui = function () {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function () {
    var dateString = this.eInput.value;
    var dateStrArr = dateString.split("-");
    var date = new Date(dateStrArr[2], dateStrArr[1] - 1, dateStrArr[0]);

    return date;
  };
  Datepicker.prototype.destroy = function () { };
  Datepicker.prototype.isPopup = function () {
    return false;
  };
  return Datepicker;
}
function getEscalationSelect() {
  function EscalationSelect() { }
  EscalationSelect.prototype.init = function (params) {
    console.log('params', params);
    this.select = document.createElement("select");
    this.opt1 = document.createElement("option");
    this.opt1.text = "By Term";
    this.opt2 = document.createElement("option");
    this.opt2.text = "By Year";
    this.select.add(this.opt1);
    this.select.add(this.opt2);
    this.select.value = params.value;
    this.select.setAttribute("style", "width: 99%;height:100%;");
  };
  EscalationSelect.prototype.getGui = function () {
    return this.select
  };
  EscalationSelect.prototype.afterGuiAttached = function () {
    this.select.focus();
    console.log('select', this.select);
    //this.select.select();
  };
  EscalationSelect.prototype.getValue = function () {
    return this.select.value;
  };
  EscalationSelect.prototype.destroy = function () { };
  EscalationSelect.prototype.isPopup = function () {
    return false;
  };
  return EscalationSelect;
}
function getMDTextbox() {
  function MDTextbox() { }
  MDTextbox.prototype.init = function (params) {
    console.log('params', params);
    this.eInput = document.createElement("input");
    this.eInput.setAttribute("style", "width:100%")
    Inputmask({ "regex": "([0-9]{2})(\/)([0-9]{2})" }).mask(this.eInput);
    this.eInput.value = params.value;
  };
  MDTextbox.prototype.getGui = function () {
    return this.eInput;
  };
  MDTextbox.prototype.afterGuiAttached = function () {
    window.setTimeout(()=>{
      this.eInput.focus();
    }, 50);
    window.setTimeout(()=>{
      this.eInput.select();
    }, 100);

  };
  MDTextbox.prototype.getValue = function () {
    return this.eInput.value;
  };
  MDTextbox.prototype.destroy = function () { };
  MDTextbox.prototype.isPopup = function () {
    return false;
  };
  return MDTextbox;
}