import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fullstackprojekt-frontend';

  seachText: string = '';

  onSearchTextEntered(searchValue: string){
    this.seachText = searchValue;
  }

  cart: boolean = false;

  cartToggle(value: boolean){
    this.cart = value;
  }
}
