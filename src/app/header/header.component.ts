import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {CartContentDTO} from '../model/cartcontent/cart-contentDTO';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {StaticVars} from '../config/static-vars';
import {FirebaseAuthService} from "../service/firebase/firebase.service";
import {CartCount} from '../sidecart/cart-count';


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
  countService: CartCount;
  cartCount: number;
  firebaseAuthService: FirebaseAuthService
  showCart: boolean = false;
  enteredSearchValue: string = '';
  showDiv: boolean = false;

  constructor(cartContentService: CartContentService, firebaseAuthService: FirebaseAuthService, countService: CartCount) {
    this.firebaseAuthService = firebaseAuthService;
    this.countService = countService
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    this.cartCount = 0
    this.cartContents.forEach((cartContent) => {
      cartContent.forEach((content) => {
        this.cartCount += content.anzahl;
      });
      countService.setCount(this.cartCount)
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

  ngOnInit(): void {}
}
