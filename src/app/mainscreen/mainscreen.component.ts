import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from '../model/product/productDTO';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss'],
})
export class MainscreenComponent implements OnInit {
  @Input() searchValue: string;
  @Output() itemsProductEvent = new EventEmitter<ProductDTO[]>()

  public products: Observable<ProductDTO[]>;
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
    this.products = productService.listProducts();
    this.searchValue = '';
  }

  sendProducts(productElement){
    this.itemsProductEvent.emit(productElement)
  }

  receivedProduct($event){
    this.sendProducts($event)
  }

  ngOnInit() {}
}
