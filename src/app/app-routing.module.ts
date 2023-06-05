import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogInComponent} from "./log-in/log-in.component";
import { MainscreenComponent } from './mainscreen/mainscreen.component';
const routes: Routes = [

  {
    path: "log_in", component:  LogInComponent
  },
  {
    path: "", component:  MainscreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
