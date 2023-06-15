import { Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
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

  @Input() getlogValue:boolean = false;
  items_:any;
  warenkorbID:any;
  warenkorbinhaltID:any;
  constructor(cartContentService: CartContentService) {
    this.items_ = []
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    //this.cartContents = cartContentService.listCarts()
    this.cartContents.subscribe(produkten => {
      console.log(produkten)
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
    })
    this.searchValue = '';
    
  }
  receiditems($event){
    let input = true
    for (let elt  of this.items_){
      if(elt.product.produktname == $event.produktname){
        elt.anzahl ++;
        this.cartContentService.updateCartContent(new CartContentDTO(
          elt.warenkorbinhaltID,
          elt.warenkorbID,
          elt.product.produktID,
          elt.anzahl))
        input = false
      }
    }
    if(input){
      this.items_.push({
        product: $event,
        anzahl: 1,
        warenkorbinhaltID: this.warenkorbinhaltID,
        warenkorbID: this.warenkorbID
      })
      console.log("asd",this.items_.slice(-1))
        this.cartContentService.addCartContent(new CartContentDTO(
        this.items_.slice(-1)[0].warenkorbinhaltID,
        this.items_.slice(-1)[0].warenkorbID,
        this.items_.slice(-1)[0].product.produktID,
        this.items_.slice(-1)[0].anzahl))
        
    }
  }
  ngOnInit() {
      
  }
}
