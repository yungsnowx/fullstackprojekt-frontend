import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDTO } from '../model/product/productDTO';
import { FirebaseAuthService } from '../service/firebase/firebase.service';
import { ProductService } from '../service/product/product.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-product-list-for-admin',
  templateUrl: './product-list-for-admin.component.html',
  styleUrls: ['./product-list-for-admin.component.scss'],
})
export class ProductListForAdminComponent {
  public products: Observable<ProductDTO[]>;

  constructor(
    private productService: ProductService,
    private firebaseAuthService: FirebaseAuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.firebaseAuthService.getFirebaseUser() == null) {
      this.firebaseAuthService.waitForAuth().then(() => {
        this.userService
          .getUser(this.firebaseAuthService.getUserID())
          .subscribe((user) => {
            console.log(user);
            if (user.isAdmin) {
              this.products = this.productService.listProducts();
            } else {
              window.location.href = '/#/';
            }
          });
      });
    } else {
      this.userService
        .getUser(this.firebaseAuthService.getUserID())
        .subscribe((user) => {
          console.log(user);
          if (user.isAdmin) {
            this.products = this.productService.listProducts();
          } else {
            window.location.href = '/#/';
          }
        });
    }
  }
}
