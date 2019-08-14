import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridDef } from 'src/app/models/gridDef';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Response, GetGridResponse } from 'src/app/models/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GridDefService {

  constructor(
    private http:HttpClient,
    private authService: AuthenticationService
  ) { }

  public save(gridDef: GridDef):Observable<Response>{
    const url = environment.webapiDomain + "/api/UserPerference/SaveGridDef";

    return this.http.post<Response>(url, gridDef, this.authService.httpOptions);
  }

  public getGridDef(name:string):Observable<GetGridResponse>{
    var url = environment.webapiDomain + "/api/UserPerference/GetGridDef?gridName=" + name;

    return this.http.get<GetGridResponse>(url, this.authService.httpOptions);
  }
}
