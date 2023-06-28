import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fullstackprojekt-frontend';

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  cart: boolean = false;
  log: boolean = false;

  cartToggle(value: boolean) {
    this.cart = value;
  }
}
