import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './views/main-layout/main-layout.component';
import { HomeComponent } from './views/home/home.component';
import { MsalGuard } from '@azure/msal-angular';
const routes: Routes = [
   { path: 'main', component: MainLayoutComponent, canActivate: [MsalGuard] },
   { path: '', component: HomeComponent, canActivate: [MsalGuard] },
  // { path: 'main', component: MainLayoutComponent },
  // { path: '', component: HomeComponent },

];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
