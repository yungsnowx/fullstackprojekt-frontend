import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ProductDTO} from '../model/product/productDTO';
import {FirebaseAuthService} from "../service/firebase/firebase.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() title: string = 'Default title';
  @Input() description: string = 'Default description';
  @Input() price: string = '0.00';
  @Input() image: string = '';
  @Input() id: string = "";
  @Output() productEvent = new EventEmitter<ProductDTO>()
  firebaseAuthService: FirebaseAuthService;
  constructor(firebaseAuthService: FirebaseAuthService) {
    this.firebaseAuthService = firebaseAuthService;
  }

  sendProductInfo() {
    this.productEvent.emit(new ProductDTO(parseInt(this.id), this.title, this.description, parseFloat(this.price), this.image));
  }

  ngOnInit(): void {}
}
