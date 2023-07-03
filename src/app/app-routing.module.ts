import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { ProductListForAdminComponent } from './product-list-for-admin/product-list-for-admin.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: MainscreenComponent,
  },
  {
    path: 'log_in',
    component: LogInComponent,
  },
  {
    path: 'sign_up',
    component: SignUpComponent,
  },
  {
    path: 'admin',
    component: ProductListForAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
