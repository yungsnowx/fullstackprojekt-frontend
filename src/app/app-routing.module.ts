import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from "./log-in/log-in.component";
import {MainscreenComponent} from './mainscreen/mainscreen.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: "log_in", component: LogInComponent
  },
  {
    path: "sign_up", component: SignUpComponent
  },
  // Pfad zum "MainscreenComponnent" hinzugefuegt wird wahrscheinlich benoetigt
  // um von Log_in zum MainScreen zurueckzukehren
  {
    path: "#", component: MainscreenComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
