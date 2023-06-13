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
  public product: ProductDTO;
  private productService: ProductService;
  public products: Observable<ProductDTO[]>;

  @Input() searchValue: string;

  @Output() itemsProductEvent = new EventEmitter<ProductDTO[]>()

  constructor(productService: ProductService) {
    this.product = new ProductDTO(0, 'Test', '123', 13.99, '');
    this.productService = productService;
    this.products = productService.listProducts();
    this.searchValue = '';
  }

  ngOnInit() {}
  sendItems(product_element){
    this.itemsProductEvent.emit(product_element)
  }
  receiveMessage($event){
    this.sendItems($event)
  }
}
