import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogInComponent} from "./log-in/log-in.component";
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { SignInComponent } from './sign-in/sign-in.component';
const routes: Routes = [

  {
    path: "log_in", component:  LogInComponent
  },
  {
    path: "", component:  MainscreenComponent
  },
  {
    path:"sign_in",component:SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
