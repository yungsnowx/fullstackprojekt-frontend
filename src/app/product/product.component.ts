import {Component, Input, OnInit} from '@angular/core';
import {FirebaseAuthService} from "../service/firebase/firebase.service";
import {CartContentService} from "../service/cartcontent/cart-content.service";
import {StaticVars} from "../config/static-vars";
import {CartContentDTO} from "../model/cartcontent/cart-contentDTO";
import {CartStateService} from "../sidecart/cart-state.service";

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

  constructor(firebaseAuthService: FirebaseAuthService, cartContentService: CartContentService, cartCount: CartStateService) {
    this.firebaseAuthService = firebaseAuthService;
    this.cartContentService = cartContentService;
    this.cartCount = cartCount
  }

  addProductToCart() {
    let productAlreadyInCart: boolean = false;
    this.cartContentService.listCartContentByCartId(StaticVars.cartIdInUse).subscribe(cartContents => {
      cartContents.forEach((cartContent, index) => {
        if (cartContent.produktID == parseInt(this.id)) {
          productAlreadyInCart = true
          cartContent.anzahl += 1
          this.cartContentService.updateCartContent(cartContent)
          this.cartCount.getCartContents().at(index).anzahl += 1
        }
      })
      if (!productAlreadyInCart) {
        this.cartContentService.addCartContent(new CartContentDTO(0, StaticVars.cartIdInUse, parseInt(this.id), 1))
        this.cartContentService.listCartContentByCartId(StaticVars.cartIdInUse).subscribe(newCartContents => {
          this.cartCount.setCartContents(newCartContents)
        })
      }
    });
  }

  ngOnInit(): void {
  }
}
