import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, isEmpty} from 'rxjs';
import {CartContentDTO} from '../model/cartcontent/cart-contentDTO';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {StaticVars} from '../config/static-vars';
import {ProductDTO} from '../model/product/productDTO';
import {NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import { CountService } from '../service/service.Count';


@Component({
  selector: 'app-sidecart',
  templateUrl: './sidecart.component.html',
  styleUrls: ['./sidecart.component.scss'],
})
export class SidecartComponent implements OnInit {
  private cartContentService: CartContentService;
  public cartContents: Observable<CartContentDTO[]>;
  cart:any;
  @Input() searchValue: string = '';

  @Input() getCartValue: boolean = false;
  added:boolean;
  productsList:any;
  warenkorbID:any;
  warenkorbinhaltID:any;
  currentPath: string = '';
  countService:CountService;
  constructor(cartContentService: CartContentService, private router: Router, private snackBar: MatSnackBar, countService:CountService) {
    this.productsList = []
    this.countService = countService
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    this.cartContents.subscribe(products => {
      this.warenkorbID = StaticVars.cartIdInUse
      this.warenkorbinhaltID = products[0].warenkorbinhaltID
      for(let product of products ){
        this.productsList.push({
          product:new ProductDTO(product.produktID.produktID,
            product.produktID.produktname,
            product.produktID.produktbeschreibung,
            product.produktID.preis,
            product.produktID.bild),
          anzahl: product.anzahl,
          warenkorbinhaltID: product.warenkorbinhaltID,
          warenkorbID: product.warenkorbID
        })
      }
    })
    this.searchValue = '';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });
  }
  receivedItems($event){
    this.added = true
    let cartContentElement = this.cartContentService.listCartContentByCartId(StaticVars.cartIdInUse)
    cartContentElement.subscribe( datas =>{
      for(let product of this.productsList){
        if(product.product.produktname == $event.produktname){
          for(let data of datas){
            if(data.produktID.produktID == product.product.produktID ){
              product.anzahl++;
              this.cartContentService.updateCartContent(new CartContentDTO(
                data.warenkorbinhaltID,
                product.warenkorbID,
                product.product.produktID,
                product.anzahl
              ))
              this.added = false
              break
            }
          }
        }
      }
      if(this.added){
        this.productsList.push({
          product: $event,
          anzahl: 1,
          warenkorbinhaltID: this.warenkorbinhaltID,
          warenkorbID: this.warenkorbID
        })
        this.cartContentService.addCartContent(new CartContentDTO(
          this.productsList.slice(-1)[0].warenkorbinhaltID,
          this.productsList.slice(-1)[0].warenkorbID,
          this.productsList.slice(-1)[0].product.produktID,
          this.productsList.slice(-1)[0].anzahl))
      }
      let count = 0
      for (let product of this.productsList){
        count += product.anzahl
      }
      this.countService.setCount(count)
    })
  }
  addProduct(product){
    product.anzahl++
    this.cartContentService.updateCartContent(
      new CartContentDTO(
        product.warenkorbinhaltID,
        product.warenkorbID,
        product.product.produktID,
        product.anzahl
      ))
    let count = this.countService.getCount()+1
    this.countService.setCount(count)
  }
  reduceProduct(product){
    product.anzahl--
    if(product.anzahl == 0){
      this.cartContentService.deleteCartContent(product.warenkorbinhaltID)
    }
    else{
      this.cartContentService.updateCartContent(
        new CartContentDTO(
          product.warenkorbinhaltID,
          product.warenkorbID,
          product.product.produktID,
          product.anzahl
      )
    )}
    let count = this.countService.getCount() - 1
    this.countService.setCount(count)
  }
  ngOnInit() {}

  orderCart() {
    this.snackBar.open("Bestellung wurde aufgegeben", "OK",);
  }
}

