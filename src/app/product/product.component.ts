import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ProductDTO } from '../model/product/productDTO';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit{
  @Input() title: string = 'Default title';
  @Input() description: string = 'Default description';
  @Input() price: string = '0.00';
  @Input() image: string = '';

  @Output() messageEvent = new EventEmitter<ProductDTO>() 
  constructor(){}
   
  sendMessage(){
    console.log("as")
    this.messageEvent.emit(new ProductDTO(0, this.title,this.description,~~this.price,this.image));
  }
  ngOnInit(): void {
    
  }
}
