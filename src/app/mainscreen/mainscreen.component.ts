import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductDTO} from '../model/product/productDTO';
import {ProductService} from '../service/product/product.service';
import {UserService} from "../service/user/user.service";
import {FirebaseAuthService} from "../service/firebase/firebase.service";

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss'],
})
export class MainscreenComponent implements OnInit {
  @Input() searchValue: string;

  public products: Observable<ProductDTO[]>;
  private productService: ProductService;
  private isAdmin: boolean;

  constructor(productService: ProductService, private userService: UserService, private firebaseAuthService: FirebaseAuthService) {
    this.productService = productService;
    this.products = productService.listProducts();
    this.searchValue = '';
  }

  ngOnInit() {
    this.firebaseAuthService.waitForAuth().then(() => {
      if(this.firebaseAuthService.getUserID()){
        this.userService.getUser(this.firebaseAuthService.getUserID()).subscribe(value => {
          if (value) {
            console.log(this.firebaseAuthService.getUserID())
            this.isAdmin = value.isAdmin
            console.log(this.isAdmin);
            localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
          } else {
            localStorage.setItem('isAdmin', JSON.stringify(false));
          }
        });
      }


    }).catch(() => {
      localStorage.setItem('isAdmin', JSON.stringify(false));
    });

  }

}
