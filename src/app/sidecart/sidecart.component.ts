import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable, isEmpty } from 'rxjs';
import { CartContentDTO } from '../model/cartcontent/cart-contentDTO';
import { CartContentService } from '../service/cartcontent/cart-content.service';
import { StaticVars } from '../config/static-vars';
import { ProductDTO } from '../model/product/productDTO';

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
  @Input() getlogValue:boolean = false;
  @Output() carCount = new EventEmitter<number>;
  items_:any;
  warenkorbID:any;
  warenkorbinhaltID:any;
  constructor(cartContentService: CartContentService) {
    this.items_ = []
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    this.cartContents.subscribe(produkten => {
      this.warenkorbID = produkten[0].warenkorbID
      this.warenkorbinhaltID = produkten[0].warenkorbinhaltID
      for(let product of produkten ){
        this.items_.push({
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
      console.log(this.items_)
    })
    this.searchValue = '';

  }
  receiditems($event){
    this.input = true 
    let info = this.cartContentService.listCarts()
      info.subscribe( data =>{
        for(let elt of this.items_){
          if(elt.product.produktname == $event.produktname){
            for(let dt of data){
              if(dt.produktID == elt.product.produktID && dt.warenkorbID == elt.warenkorbID){
                elt.anzahl++;
                this.cartContentService.updateCartContent(new CartContentDTO(
                  dt.warenkorbinhaltID,
                  elt.warenkorbID,
                  elt.product.produktID,
                  elt.anzahl
                ))
                this.input = false
                console.log(1)
                console.log(this.input)
                break 
              }
            }
          }
          
        
      } 
      console.log(this.input)
        if(this.input){
          this.items_.push({
          product: $event,
          anzahl: 1,
          warenkorbinhaltID: this.warenkorbinhaltID,
          warenkorbID: this.warenkorbID
          })
          this.cartContentService.addCartContent(new CartContentDTO(
          this.items_.slice(-1)[0].warenkorbinhaltID,
          this.items_.slice(-1)[0].warenkorbID,
          this.items_.slice(-1)[0].product.produktID,
          this.items_.slice(-1)[0].anzahl))     
        } 
        this.sendCartCount()

    })
  }
  sendCartCount(){
    let count= 0
    for (let elt of this.items_){
      count += elt.anzahl
    }
    this.carCount.emit(count)
  }
  ngOnInit() {

  }
}
