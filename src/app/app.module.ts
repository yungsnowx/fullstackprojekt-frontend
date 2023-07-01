import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';

import { NgIf, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogInComponent } from './log-in/log-in.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { ProductListForAdminComponent } from './product-list-for-admin/product-list-for-admin.component';
import { ProductComponent } from './product/product.component';
import { SidecartComponent } from './sidecart/sidecart.component';
import { SignUpComponent } from './sign-up/sign-up.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    MainscreenComponent,
    LogInComponent,
    SignUpComponent,
    SidecartComponent,
    ProductListForAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatCardModule,
    HttpClientModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    NgIf,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de-DE',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
