import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantService } from './constant.service';
import { LoginResponse } from '../models/response';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { MsalService } from '@azure/msal-angular';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public idTokenSubject: BehaviorSubject<string>;
  constructor(
    private http: HttpClient,
    private constantService: ConstantService,
    private msalService: MsalService
  ) { 
    var storageIdToken = localStorage.getItem("idToken");
    this.idTokenSubject = new BehaviorSubject<string>(storageIdToken);
  }


  public get authorizedHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + this.currentUserSubject.value.idToken,
      })
    }
    return httpOptions;
  }

  public loginPopup(){
    this.msalService.loginPopup(["user.read"]);
  }
  public get isLoggedIn(): boolean{
    if(this.msalService.getUser()){
      return true;
    }else{
      return false;
    }
  }
  public login(idToken: string) {
    localStorage.setItem('idToken', idToken);
    this.idTokenSubject.next(idToken);
  }
}
