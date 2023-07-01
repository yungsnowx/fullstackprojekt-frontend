import { Component, Input, OnInit } from '@angular/core';
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

  public products: Observable<ProductDTO[]>;
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
    this.products = productService.listProducts();
    this.searchValue = '';
  }

  ngOnInit() {}
}
