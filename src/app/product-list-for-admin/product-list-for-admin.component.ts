import { Component } from '@angular/core';
import { ProductDTO } from '../model/product/productDTO';
import { ProductService } from '../service/product/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list-for-admin',
  templateUrl: './product-list-for-admin.component.html',
  styleUrls: ['./product-list-for-admin.component.scss']
})
export class ProductListForAdminComponent {
  public product: ProductDTO;
  private productService: ProductService;
  public products: Observable<ProductDTO[]>;
    
  constructor(productService: ProductService) {
    this.product = new ProductDTO(0, 'Test', '123', 13.99, '');
    this.productService = productService;
    this.products = productService.listProducts();
  }

  ngOnInit() {}
}
