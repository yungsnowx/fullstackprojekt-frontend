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

  constructor(cartContentService: CartContentService) {
    this.items_ = []
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    this.cartContents.subscribe(produkten => {
      for(let product of produkten ){
        this.items_.push({product:new ProductDTO(product.produktID.produktID,
          product.produktID.produktname,
          product.produktID.produktbeschreibung,
          product.produktID.preis,
          product.produktID.bild), count: product.anzahl})
      }
    })
    this.searchValue = '';
    
  }
  receiditems($event){
    let input = true
    for (let elt  of this.items_){
      if(elt.product.produktname == $event.produktname){
        elt.count ++;
        input = false
      }
    }
    if(input){
      this.items_.push({
        product: $event,
        count: 1
      })
    }
  }
  ngOnInit() {
      
  }
}
