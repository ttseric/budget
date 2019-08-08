import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridDef } from 'src/app/models/gridDef';
import { ConstantService } from './constant.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Response, GetGridResponse } from 'src/app/models/response';
@Injectable({
  providedIn: 'root'
})
export class GridDefService {

  constructor(
    private http:HttpClient,
    private constantService: ConstantService,
    private authService: AuthenticationService
  ) { }

  public save(gridDef: GridDef):Observable<Response>{
    const url = this.constantService.webapiDomain + "/api/UserPerference/SaveGridDef";

    return this.http.post<Response>(url, gridDef, this.authService.authorizedHttpOptions);
  }

  public getGridDef(name:string):Observable<GetGridResponse>{
    var url = this.constantService.webapiDomain + "/api/UserPerference/GetGridDef?gridName=" + name;

    return this.http.get<GetGridResponse>(url, this.authService.authorizedHttpOptions);
  }
}
