import {Component, Input, OnInit} from '@angular/core';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {StaticVars} from '../config/static-vars';
import {ProductDTO} from '../model/product/productDTO';
import {NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartStateService} from './cart-state.service';
import {FirebaseAuthService} from "../service/firebase/firebase.service";
import {Product} from "../model/product/product";
import {ProductService} from "../service/product/product.service";

@Component({
  selector: 'app-sidecart',
  templateUrl: './sidecart.component.html',
  styleUrls: ['./sidecart.component.scss'],
})
export class SidecartComponent implements OnInit {
  @Input() getCartValue: boolean = false;
  @Input() searchValue: string = '';

  public cartContentService: CartContentService;
  public productService: ProductService;

  products: ProductDTO[];
  currentPath: string = '';
  cartStateService: CartStateService;
  firebaseAuthService: FirebaseAuthService;

  constructor(cartContentService: CartContentService, firebaseAuthService: FirebaseAuthService, productService: ProductService, private router: Router, private snackBar: MatSnackBar, cartStateService: CartStateService) {
    this.firebaseAuthService = firebaseAuthService;
    this.cartContentService = cartContentService;
    this.productService = productService;
    this.cartStateService = cartStateService
    this.cartContentService.listCartContentByCartId(StaticVars.cartIdInUse).subscribe(value => {
      this.cartStateService.setCartContents(value)
    })
    this.productService.listProducts().subscribe(value => {
      this.products = value;
    });
    this.searchValue = '';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });
  }

  increaseProductCount(cartContent) {
    cartContent.anzahl++
    this.cartContentService.updateCartContent(cartContent)
  }

  reduceProductCount(cartContent) {
    cartContent.anzahl--
    if (cartContent.anzahl == 0) {
      this.cartContentService.deleteCartContent(cartContent.warenkorbinhaltID)
    } else {
      this.cartContentService.updateCartContent(cartContent)
    }
  }

  getSum() {
    let sum = 0
    for (let cartContent of this.getCartContent()) {
      let product = this.getProductById(cartContent.produktID)
      sum += product.preis * cartContent.anzahl
    }
    return sum
  }

  ngOnInit() {
  }

  orderCart() {
    this.snackBar.open("Bestellung wurde aufgegeben", "OK",);
  }

  getProductById(id: number): Product {
    return this.products.find(product => product.produktID == id);
  }

  getCartContent() {
    return this.cartStateService.getCartContents()
  }
}

