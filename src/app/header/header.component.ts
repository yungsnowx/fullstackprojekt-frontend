import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartDTO } from '../model/cart/cartDTO';
import { CartContent } from '../model/cartcontent/cart-content';
import { CartService } from '../service/cart/cart.service';
import { CartContentService } from '../service/cartcontent/cart-content.service';
import { FirebaseAuthService } from '../service/firebase/firebase.service';
import { UserService } from '../service/user/user.service';

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
  productCount: number = 0;
  isAdmin: boolean = false;

  constructor(
    private cartContentService: CartContentService,
    public firebaseAuthService: FirebaseAuthService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.firebaseAuthService.getFirebaseUser() == null) {
      this.firebaseAuthService.waitForAuth().then(() => {
        if (this.firebaseAuthService.getFirebaseUser() != null) {
          this.initCart();
          this.setAdmin();
        }
      });
    } else {
      this.initCart();
      this.setAdmin();
    }
  }

  initCart() {
    this.cartService
      .getActiveCartByUserId(this.firebaseAuthService.getFirebaseUser().uid)
      .subscribe((cart: CartDTO) => {
        this.cartContentService.fetchCartContentByCartId(cart.warenkorbID);
        this.cartContentService
          .getCartContent()
          .subscribe((content: CartContent[]) => {
            this.cartContent = content;
            console.log(this.cartContent);
            this.productCount = 0;
            content.forEach((cartContent: CartContent) => {
              this.productCount += cartContent.anzahl;
            });
          });
      });
  }

  setAdmin() {
    this.userService
      .getUser(this.firebaseAuthService.getUserID())
      .subscribe((user) => {
        this.isAdmin = user.isAdmin;
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
    window.location.href = '/#/';
    window.location.reload();
  }

  navToAdminPanel() {
    window.location.href = '/#/admin';
  }
}
