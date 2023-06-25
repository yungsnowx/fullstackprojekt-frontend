
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {CartContentDTO} from '../model/cartcontent/cart-contentDTO';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {StaticVars} from '../config/static-vars';
import {FirebaseAuthService} from "../service/firebase/firebase.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private cartContentService: CartContentService;
  public cartContents: Observable<CartContentDTO[]>;

  @Input() cartCount:number;
  firebaseAuthService: FirebaseAuthService
  constructor(cartContentService: CartContentService, firebaseAuthService: FirebaseAuthService) {
    this.firebaseAuthService = firebaseAuthService;

    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    this.cartCount = 0
    this.cartContents.forEach((cartContent) => {
      cartContent.forEach((content) => {
        this.cartCount += content.anzahl;
      });
    });
  }

  showDiv: boolean = false;

  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue.toLowerCase());
  }


  showCart: boolean = false;
  showLog:boolean = false;
  @Output()
  toggled: EventEmitter<any> = new EventEmitter<any>();

  cartClicked() {
    if (this.showCart == false) {
      this.showCart = true;
    } else {
      this.showCart = false;
    }
    this.toggled.emit(this.showCart);
  }


  logOut() {
    this.firebaseAuthService.logout();
  }

  ngOnInit(): void {
    console.log(this.firebaseAuthService.getFirebaseUser());
  }
}
