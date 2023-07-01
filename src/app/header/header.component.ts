import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {FirebaseAuthService} from "../service/firebase/firebase.service";
import {CartContent} from "../model/cartcontent/cart-content";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  toggled: EventEmitter<any> = new EventEmitter<any>();

  showCart: boolean = false;
  enteredSearchValue: string = '';
  showDiv: boolean = false;
  cartContent: CartContent[];

  constructor(
    private cartContentService: CartContentService,
    public firebaseAuthService: FirebaseAuthService,) {
  }

  ngOnInit(): void {
    this.cartContentService.fetchCartContentByCartId(2);
    this.cartContentService.getCartContent().subscribe((content: CartContent[]) => {
      this.cartContent = content;
    });
  }

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue.toLowerCase());
  }

  cartClicked() {
    this.showCart = !this.showCart;
    this.toggled.emit(this.showCart);
  }

  logOut() {
    this.firebaseAuthService.logout();
  }

  getCartCount() {
    let sum = 0
    this.cartContent.forEach((cartContent) => {
      sum += cartContent.anzahl;
    })
    return sum
  }
}
