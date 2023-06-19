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
  log:boolean = false;
  countCart:number = 0
  cartToggle(value: boolean){
    this.cart = value;
  }
  logToggle(value:boolean){
    this.log = value;
    console.log(this.log)
  }
  receivedCountCart(value:number){
    this.countCart = value;
    console.log(this.countCart)

  }
}
