import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import 'inputmask/dist/inputmask/jquery.inputmask';
import 'inputmask/dist/inputmask/inputmask';
import Inputmask from "inputmask/dist/inputmask/inputmask.extensions"
import { formatDate } from '@angular/common';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class GridComponentsService {

  public components;
  constructor() { 
    this.components = { datePicker: getDatePicker(), checkbox: getCheckBox(), numeric: getNumeric(), escalationSelect: getEscalationSelect(), mdTextbox: getMDTextbox() };

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
    window.setTimeout(()=>{
      $('#ui-datepicker-div').css('z-index', 999999);

    }, 100)
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