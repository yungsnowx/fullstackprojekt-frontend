import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {FirebaseAuthService} from "../service/firebase/firebase.service";
import {CartContent} from "../model/cartcontent/cart-content";
import {CartService} from "../service/cart/cart.service";
import {CartDTO} from "../model/cart/cartDTO";


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
  productCount: number = 0

  constructor(
    private cartContentService: CartContentService,
    public firebaseAuthService: FirebaseAuthService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    let cartId;
    this.firebaseAuthService.waitForAuth().then(() => {
      this.cartService.getActiveCartByUserId(this.firebaseAuthService.getUserID()).subscribe((cart: CartDTO) => {
        cartId = cart.warenkorbID;

        this.cartContentService.fetchCartContentByCartId(cartId);
        this.cartContentService.getCartContent().subscribe((content: CartContent[]) => {
          this.cartContent = content;
          console.log(this.cartContent);
          content.forEach((cartContent: CartContent) => {
            this.productCount += cartContent.anzahl;
          })
        });
      });


    })
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


}
