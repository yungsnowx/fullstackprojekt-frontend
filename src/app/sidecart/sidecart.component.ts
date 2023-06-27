import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, isEmpty} from 'rxjs';
import {CartContentDTO} from '../model/cartcontent/cart-contentDTO';
import {CartContentService} from '../service/cartcontent/cart-content.service';
import {StaticVars} from '../config/static-vars';
import {ProductDTO} from '../model/product/productDTO';
import {NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";


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

  input:boolean
  @Output() cartCount = new EventEmitter<number>;
  items:any;
  warenkorbID:any;
  warenkorbinhaltID:any;
  currentPath: string = '';
  constructor(cartContentService: CartContentService, private router: Router, private snackBar: MatSnackBar) {
    this.items = []
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    this.cartContents.subscribe(products => {
      this.warenkorbID = products[0].warenkorbID
      this.warenkorbinhaltID = products[0].warenkorbinhaltID
      for(let product of products ){
        this.items.push({
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
      console.log(this.items)
    })
    this.searchValue = '';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });
  }
  receivedItems($event){
    this.input = true
    let info = this.cartContentService.listCarts()
    info.subscribe( datas =>{
      for(let product of this.items){
        if(product.product.produktname == $event.produktname){
          for(let data of datas){
            if(data.produktID == product.product.produktID && data.warenkorbID == product.warenkorbID){
              product.anzahl++;
              this.cartContentService.updateCartContent(new CartContentDTO(
                data.warenkorbinhaltID,
                product.warenkorbID,
                product.product.produktID,
                product.anzahl
              ))
              this.input = false
              break
            }
          }
        }
      }
      if(this.input){
        this.items.push({
          product: $event,
          anzahl: 1,
          warenkorbinhaltID: this.warenkorbinhaltID,
          warenkorbID: this.warenkorbID
        })
        this.cartContentService.addCartContent(new CartContentDTO(
          this.items.slice(-1)[0].warenkorbinhaltID,
          this.items.slice(-1)[0].warenkorbID,
          this.items.slice(-1)[0].product.produktID,
          this.items.slice(-1)[0].anzahl))
      }
      this.sendCartCount()

    })
  }
  sendCartCount(){
    let count= 0
    for (let product of this.items){
      count += product.anzahl
    }
    this.cartCount.emit(count)
  }
  ngOnInit() {}

  orderCart() {
    this.snackBar.open("Bestellung wurde aufgegeben", "OK",);
  }
}

