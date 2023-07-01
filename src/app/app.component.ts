import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fullstackprojekt-frontend';

  searchText: string = '';
  isAdmin: boolean;

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  cart: boolean = false;
  log: boolean = false;

  cartToggle(value: boolean) {
    this.cart = value;
  }

  protected readonly localStorage = localStorage;
}
