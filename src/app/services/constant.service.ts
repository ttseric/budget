import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

  public get webapiDomain(){
    return "https://ES14157:8081";
  //return "https://localhost:44350";
  }
}
