import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {count, Observable} from 'rxjs';
import {CartContentDTO} from '../model/cartcontent/cart-contentDTO';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {FirebaseAuthService} from "../service/firebase/firebase.service";
import {CartStateService} from '../sidecart/cart-state.service';
import {CartService} from "../service/cart/cart.service";


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

  private cartContentService: CartContentService;
  public cartContents: Observable<CartContentDTO[]>;
  private cartService: CartService;
  countService: CartStateService;
  cartCount: number;
  firebaseAuthService: FirebaseAuthService
  showCart: boolean = false;
  enteredSearchValue: string = '';
  showDiv: boolean = false;

  constructor(cartContentService: CartContentService, firebaseAuthService: FirebaseAuthService, countService: CartStateService, cartService: CartService) {
    this.firebaseAuthService = firebaseAuthService;
    this.countService = countService
    this.cartContentService = cartContentService;
    this.cartService = cartService;

    this.cartCount = 0
    this.cartContents.forEach((cartContent) => {
      cartContent.forEach((content) => {
        this.cartCount += content.anzahl;
      });
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
    this.countService.getCartContents().forEach((cartContent) => {
      sum += cartContent.anzahl;
    })
    return sum
  }

  ngOnInit(): void {
    this.cartService.getActiveCartByUserId(this.firebaseAuthService.getFirebaseUser().uid).subscribe(cart => {
      if (cart != null) {
        this.cartContents = this.cartContentService.listCartContentByCartId(cart.warenkorbID);
      }
    });
  }

  protected readonly count = count;
}
