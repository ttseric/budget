import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './views/main-layout/main-layout.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LayoutModule } from '@progress/kendo-angular-layout';
import { HomeComponent } from './views/home/home.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import {LogLevel} from "msal";
import { TokenInterceptor } from './services/tokenInterceptor';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { PopupModule } from '@progress/kendo-angular-popup';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { environment } from 'src/environments/environment';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    ToolBarModule,
    DropDownsModule,
    FormsModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    LayoutModule,
    DialogsModule,
    FontAwesomeModule,
    MsalModule.forRoot({
      clientID: environment.clientID,
      authority: environment.authority,
      validateAuthority: true,
      redirectUri: environment.redirectUri,
      cacheLocation : "localStorage",
      postLogoutRedirectUri: environment.postLogoutRedirectUri,
      navigateToLoginRequestUrl: true,
      popUp: false,
      consentScopes: ["user.read"],
      logger: loggerCallback,
      correlationId: '1234',
      level: LogLevel.Info,
      piiLoggingEnabled: true
    }),
    TooltipModule,
    PopupModule,
    NotificationModule,
    DateInputsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
}
