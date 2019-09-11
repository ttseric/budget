import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import 'inputmask/dist/inputmask/jquery.inputmask';
import 'inputmask/dist/inputmask/inputmask';
import Inputmask from "inputmask/dist/inputmask/inputmask.extensions"
import { formatDate } from '@angular/common';
import * as $ from 'jquery';
import { TermAssumption } from '../models/BudgetTerm';

@Injectable({
  providedIn: 'root'
})
export class GridComponentsService {

  public components;
  constructor() { 
    this.components = { 
      datePicker: getDatePicker(), 
      checkbox: getCheckBox(), 
      numeric: getNumeric(), 
      mdTextbox: getMDTextbox(),
      evpToDatePicker: getEVPDatePicker(),
      termDatePicker: getTermDatePicker(),
      evpMDTextbox: getEvpMDTextbox(),
      termMDTextbox: getTermMDTextbox()
    };

  }
}

function getCheckBox() {
  function Checkbox() { }
  Checkbox.prototype.init = function (params) {
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
    //this.eInput.checked = !this.eInput.checked;
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

function getTermDatePicker(){
  function TermDatePicker(){ }
  TermDatePicker.prototype.init = function(params){
    this.eInput = document.createElement("input");
    this.eInput.setAttribute("style", "width:100%");
    Inputmask({ "regex": "^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\[0-9]{4}$" }).mask(this.eInput);
    //$(this.eInput).datepicker({ dateFormat: "dd-mm-yy"});
    var d: Date;
    var minDate: Date;


    if(params.data.evpTo){
      minDate = new Date(params.data.evpTo.getTime());
    }else {
       minDate = new Date(params.data.prevEndDate.getTime());
    }
    minDate.setDate(minDate.getDate() + 1);

    $(this.eInput).datepicker({
      dateFormat: "dd-mm-yy", 
      minDate: minDate,
      onSelect: ()=>{
        this.eInput.select();
        params.context.componentParent.termToChanged(this.getValue());
      }
    });

    
    if(params.value){
      var year = params.value.getFullYear();
      var month = params.value.getMonth() + 1;
      var day = params.value.getDate();
      var dayStr = day < 10 ? "0" + day: day;
      var monthStr = month < 10? "0" + month: month;
      var dStr = dayStr + "-" + monthStr + "-" + year;
  
      $(this.eInput).datepicker("setDate", dStr);
    }

    
    $(this.eInput).click(()=>{
      $(this.eInput).select();
      $(this.eInput).datepicker("show");
      window.setTimeout(()=>{
        $('#ui-datepicker-div').css('z-index', 999999);
      }, 100)
    })


    // $(this.eInput).focusout(()=>{
    //   params.context.componentParent.termToChanged(this.getValue());
    // })

    $(this.eInput).change(()=>{
      params.context.componentParent.termToChanged(this.getValue());
    })
    params.context.componentParent.updateTermTo = (assumptionTerm: TermAssumption)=>{
      if(assumptionTerm.termTo ==  null){
        $(this.eInput).datepicker("setDate", '');
        return;
      }
      var d = assumptionTerm.termTo;
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var dayStr = day < 10 ? "0" + day: day;
      var monthStr = month < 10? "0" + month: month;
      var dStr = dayStr + "-" + monthStr + "-" + year;
  
      if(assumptionTerm.evpTo){
       var newMinDate = new Date(assumptionTerm.evpTo.getTime());
      }else {
        newMinDate = new Date(assumptionTerm.prevEndDate.getTime());
      }
      newMinDate.setDate(newMinDate.getDate() + 1);
  
      $(this.eInput).datepicker("option", "minDate", newMinDate);

      $(this.eInput).datepicker("setDate", dStr);
    }
  }
  TermDatePicker.prototype.getGui = function () {
    return this.eInput;
  };

  TermDatePicker.prototype.getValue = function () {
    if(this.eInput.value.length == 0){
      return null;
    }
    var dateString = this.eInput.value;
    var dateStrArr = dateString.split("-");
    var date = new Date(dateStrArr[2], dateStrArr[1] - 1, dateStrArr[0]);

    return date;
  };
  TermDatePicker.prototype.destroy = function () { };
  TermDatePicker.prototype.isPopup = function () {
    return false;
  };
  TermDatePicker.prototype.focusIn = function(params){
    $(this.eInput).datepicker("show");
    window.setTimeout(()=>{
      $('#ui-datepicker-div').css('z-index', 999999);
      $(this.eInput).select();
    }, 100)
  }
  TermDatePicker.prototype.focusOut = function(params){
    console.log('term date picker focus out');
  }
  TermDatePicker.prototype.isCancelBeforeStart = function(params){
  }
  TermDatePicker.prototype.isCancelAfterEnd = function(params){
  }

  return TermDatePicker;
}

function getEVPDatePicker(){
  function EVPDatePicker(){ }
  EVPDatePicker.prototype.init = function(params){
    this.eInput = document.createElement("input");
    this.eInput.setAttribute("style", "width:100%");
    Inputmask({ "regex": "^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\[0-9]{4}$" }).mask(this.eInput);
    var d: Date;

    if(!params.value && params.data.prevEndDate){
       d = new Date(params.data.prevEndDate.getTime());
    }
    else{
      d = params.value;
    }
    var minDate = params.data.prevEndDate;
    $(this.eInput).datepicker({
      dateFormat: "dd-mm-yy", 
      minDate: minDate,
      onSelect: ()=>{
        this.eInput.select();
        params.context.componentParent.evpToChanged(this.getValue());
      }
    });

    if(params.value){
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var dayStr = day < 10 ? "0" + day: day;
      var monthStr = month < 10? "0" + month: month;
      var dStr = dayStr + "-" + monthStr + "-" + year;
  
      $(this.eInput).datepicker("setDate", dStr);
    }

    
    $(this.eInput).click(()=>{
      $(this.eInput).select();
      $(this.eInput).datepicker("show");
      window.setTimeout(()=>{
        $('#ui-datepicker-div').css('z-index', 999999);
      }, 100)
    })

    $(this.eInput).change(()=>{
      params.context.componentParent.evpToChanged(this.getValue());
    })

    params.context.componentParent.updateEVPTo = (assumptionTerm: TermAssumption)=>{
      if(assumptionTerm.evpTo == null){
        $(this.eInput).datepicker("setDate", '');
      }else{
        var d = assumptionTerm.evpTo;
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var dayStr = day < 10 ? "0" + day: day;
        var monthStr = month < 10? "0" + month: month;
        var dStr = dayStr + "-" + monthStr + "-" + year;
    
        $(this.eInput).datepicker("setDate", dStr);
      }

    }
  }
  EVPDatePicker.prototype.getGui = function () {
    return this.eInput;
  };

  EVPDatePicker.prototype.getValue = function () {
    if(this.eInput.value.length == 0){
      return null;
    }
    var dateString = this.eInput.value;
    var dateStrArr = dateString.split("-");
    var date = new Date(dateStrArr[2], dateStrArr[1] - 1, dateStrArr[0]);

    return date;
  };
  EVPDatePicker.prototype.destroy = function () { };
  EVPDatePicker.prototype.isPopup = function () {
    return false;
  };
  EVPDatePicker.prototype.focusIn = function(params){
    $(this.eInput).datepicker("show");
    window.setTimeout(()=>{
      $('#ui-datepicker-div').css('z-index', 999999);
      $(this.eInput).select();
    }, 100)
  }
  
  EVPDatePicker.prototype.focusOut = function(params){
    console.log('evp date picker focus in');
  }
  EVPDatePicker.prototype.isCancelBeforeStart = function(params){
  }
  EVPDatePicker.prototype.isCancelAfterEnd = function(params){
  }

  return EVPDatePicker;
}



function getEvpMDTextbox() {
  function EvpMDTextbox() { }
  EvpMDTextbox.prototype.init = function (params) {
    this.eParams = params;
    this.eInput = document.createElement("input");
    this.eInput.setAttribute("style", "width:100%")
    Inputmask({ "regex": "([0-9]{2})(\/)([0-9]{2})" }).mask(this.eInput);
    this.eInput.value = params.value;
    $(this.eInput).click(()=>{
      $(this.eInput).select();
    });

    $(this.eInput).keyup(()=>{
      var regExp = new RegExp("([0-9]{2})(\/)([0-9]{2})");
      if(regExp.test(this.eInput.value) || this.eInput.value == ''){
        params.context.componentParent.evpMDChanged(this.eInput.value);
        this.eInput.setAttribute("style", "color:black");
      }
      else{
        this.eInput.setAttribute("style", "color:red");
      }

    })
    params.context.componentParent.updateEVPMD = (assumptionTerm: TermAssumption)=>{
      this.eInput.value = assumptionTerm.evpMD;
    }
  };
  EvpMDTextbox.prototype.getGui = function () {
    return this.eInput;
  };
  EvpMDTextbox.prototype.getValue = function () {
    return this.eInput.value;
  };
  EvpMDTextbox.prototype.destroy = function () { };
  EvpMDTextbox.prototype.isPopup = function () {
    return false;
  };
  EvpMDTextbox.prototype.focusIn = function(params){
    window.setTimeout(()=>{
      this.eInput.focus();
    }, 50);
    window.setTimeout(()=>{
      this.eInput.select();
    }, 100);
  }

  EvpMDTextbox.prototype.focusOut = function(params){
  }

  return EvpMDTextbox;
}
function getTermMDTextbox() {
  function TermMDTextbox() { }
  TermMDTextbox.prototype.init = function (params) {
    this.eParams = params;
    this.eInput = document.createElement("input");
    this.eInput.setAttribute("style", "width:100%")
    Inputmask({ "regex": "([0-9]{2})(\/)([0-9]{2})" }).mask(this.eInput);
    this.eInput.value = params.value;
    $(this.eInput).click(()=>{
      $(this.eInput).select();
    });

    
    $(this.eInput).keyup(()=>{
      var regExp = new RegExp("([0-9]{2})(\/)([0-9]{2})");
      if(regExp.test(this.eInput.value) || this.eInput.value == ''){
        params.context.componentParent.termMDChanged(this.eInput.value);
        this.eInput.setAttribute("style", "color:black");
      }
      else{
        this.eInput.setAttribute("style", "color:red");
      }

    })

    params.context.componentParent.updateTermMD = (assumptionTerm: TermAssumption)=>{
      this.eInput.value = assumptionTerm.termMD;
    }
  };
  TermMDTextbox.prototype.getGui = function () {
    return this.eInput;
  };
  TermMDTextbox.prototype.getValue = function () {
    return this.eInput.value;
  };
  TermMDTextbox.prototype.destroy = function () { };
  TermMDTextbox.prototype.isPopup = function () {
    return false;
  };
  TermMDTextbox.prototype.focusIn = function(params){
    window.setTimeout(()=>{
      this.eInput.focus();
    }, 50);
    window.setTimeout(()=>{
      this.eInput.select();
    }, 100);
  }

  TermMDTextbox.prototype.focusOut = function(params){
  }

  return TermMDTextbox;
}
function getDatePicker() {
  function Datepicker() { }
  Datepicker.prototype.init = function (params) {
    this.eInput = document.createElement("input");
    this.eInput.setAttribute("style", "width:100%")
    this.eInput.value = params.value;
    Inputmask({ "regex": "^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\[0-9]{4}$" }).mask(this.eInput);
    $(this.eInput).datepicker({ dateFormat: "dd-mm-yy" });

    var d = new Date();
    if(params.value !=null){
      d = new Date(params.value);
    }

    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var dayStr = day < 10 ? "0" + day : day;
    var monthStr = month < 10 ? "0" + month : month;
    var dStr = dayStr + "-" + monthStr + "-" + year;
    
    $(this.eInput).datepicker("setDate", dStr);
    $(this.eInput).focusin(()=>{
      $(this.eInput).select();
      $(this.eInput).datepicker("show");
      window.setTimeout(()=>{
        $('#ui-datepicker-div').css('z-index', 999999);
      }, 100)
    })

  };
  Datepicker.prototype.getGui = function () {
    return this.eInput;
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
  Datepicker.prototype.isCancelBeforeStart = function(params){
  }
  Datepicker.prototype.isCancelAfterEnd = function(params){
  }

  return Datepicker;
}
function getMDTextbox() {
  function MDTextbox() { }
  MDTextbox.prototype.init = function (params) {
    this.eParams = params;
    this.eInput = document.createElement("input");
    this.eInput.setAttribute("style", "width:100%")
    Inputmask({ "regex": "([0-9]{2})(\/)([0-9]{2})" }).mask(this.eInput);
    this.eInput.value = params.value;
    $(this.eInput).click(()=>{
      $(this.eInput).select();
    });
  };
  MDTextbox.prototype.getGui = function () {
    return this.eInput;
  };

  MDTextbox.prototype.getValue = function () {
    return this.eInput.value;
  };
  MDTextbox.prototype.destroy = function () { };
  MDTextbox.prototype.isPopup = function () {
    return false;
  };
  MDTextbox.prototype.focusIn = function(params){
    window.setTimeout(()=>{
      this.eInput.focus();
    }, 50);
    window.setTimeout(()=>{
      this.eInput.select();
    }, 100);
  }
  
  MDTextbox.prototype.focusOut = function(params){
  }

  return MDTextbox;
}