import {Component, Input, OnInit} from '@angular/core';
import {FirebaseAuthService} from "../service/firebase/firebase.service";
import {CartContentService} from "../service/cartcontent/cart-content.service";
import {CartContentDTO} from "../model/cartcontent/cart-contentDTO";
import {CartStateService} from "../sidecart/cart-state.service";
import {CartService} from "../service/cart/cart.service";
import {CartDTO} from "../model/cart/cartDTO";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() title: string = 'Default title';
  @Input() description: string = 'Default description';
  @Input() price: string = '0.00';
  @Input() image: string = '';
  @Input() id: string = "";
  firebaseAuthService: FirebaseAuthService;
  cartContentService: CartContentService;
  cartCount: CartStateService
  cartService: CartService;

  constructor(firebaseAuthService: FirebaseAuthService, cartContentService: CartContentService, cartStateService: CartStateService, cartService: CartService) {
    this.firebaseAuthService = firebaseAuthService;
    this.cartContentService = cartContentService;
    this.cartCount = cartStateService;
    this.cartService = cartService;
  }

  addProductToCart() {
    let cartId: number;
    this.cartService.getActiveCartByUserId(this.firebaseAuthService.getFirebaseUser().uid).subscribe(cart => {
      if (cart == null) {
        this.cartService.addCart(new CartDTO(0, this.firebaseAuthService.getFirebaseUser().uid, true)).subscribe(newCart => {
          cartId = newCart.warenkorbID;
        })
      }else{
        cartId = cart.warenkorbID;
      }
    })
    let productAlreadyInCart: boolean = false;
    this.cartContentService.listCartContentByCartId(cartId).subscribe(cartContents => {
      cartContents.forEach((cartContent, index) => {
        if (cartContent.produktID == parseInt(this.id)) {
          productAlreadyInCart = true
          cartContent.anzahl += 1
          this.cartContentService.updateCartContent(cartContent)
          this.cartCount.getCartContents().at(index).anzahl += 1
        }
      })
      if (!productAlreadyInCart) {
        this.cartContentService.addCartContent(new CartContentDTO(0, cartId, parseInt(this.id), 1))
        this.cartContentService.listCartContentByCartId(cartId).subscribe(newCartContents => {
          this.cartCount.setCartContents(newCartContents)
        })
      }
    });
  }

  ngOnInit(): void {
  }
}
