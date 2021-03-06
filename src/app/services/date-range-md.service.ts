import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateRangeMDService {

  constructor() { }

  public calcMDwithNegetiveResult(startDate: Date, endDate: Date):string{
    var monthDiff: number = this.monthDiff(startDate, endDate);
    var adjustToSameMonth = new Date(startDate.getTime())

    if(endDate.getDate() >= startDate.getDate() - 1 ){
      monthDiff += 1
    }

    adjustToSameMonth.setMonth(startDate.getMonth() +  monthDiff);
    var dayDiff = this.dayDiff(adjustToSameMonth, endDate) + 1;
    var monthDiffStr = monthDiff <= 9  && monthDiff >= 0? "0" + monthDiff: monthDiff.toString();
    var dayDiffStr = dayDiff <= 9 && dayDiff >= 0 ? "0" + dayDiff: dayDiff.toString();

    return monthDiffStr + "/" + dayDiffStr;
  }

  public calcMD(startDate: Date, endDate: Date):string{
    var monthDiff: number = this.monthDiff(startDate, endDate);
    var adjustToSameMonth = new Date(startDate.getTime())

    if(startDate.getTime() > endDate.getTime())
      return "";

    if(endDate.getDate() >= startDate.getDate() - 1 ){
      monthDiff += 1
    }

    adjustToSameMonth.setMonth(startDate.getMonth() +  monthDiff);
    var dayDiff = this.dayDiff(adjustToSameMonth, endDate) + 1;
    var monthDiffStr = monthDiff <= 9  && monthDiff >= 0? "0" + monthDiff: monthDiff.toString();
    var dayDiffStr = dayDiff <= 9 && dayDiff >= 0 ? "0" + dayDiff: dayDiff.toString();

    return monthDiffStr + "/" + dayDiffStr;
  }

  public calcStartDate(endDate: Date, md: string):Date{
    var mdArr = md.split("/");
    var months = parseInt(mdArr[0])
    var days = parseInt(mdArr[1]);
    var startDate = new Date(endDate.getTime());

    if(months > 0){
      startDate.setMonth(startDate.getMonth() - months);
    }

    if(days > 0){
      startDate.setDate(startDate.getDate() - days);
    }

    return startDate;
  }
  public calcEndDate(startDate: Date, md: string):Date{
    var mdArr = md.split("/");
    var months = parseInt(mdArr[0])
    var days = parseInt(mdArr[1]);
    var endDate = new Date(startDate.getTime());

    endDate.setMonth(endDate.getMonth() + months);
    endDate.setDate(endDate.getDate() + days);
    endDate.setDate(endDate.getDate() - 1);

    return endDate; 
  }

  dayDiff(d1: Date, d2: Date):number{
    var diff = d2.getTime() - d1.getTime();
    var days = diff / (1000 * 60 * 60 * 24);
    return days;
  }
  monthDiff(d1: Date, d2: Date):number {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months;
}
}
