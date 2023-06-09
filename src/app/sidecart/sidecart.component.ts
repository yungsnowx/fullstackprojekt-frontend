import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartContentDTO } from '../model/cartcontent/cart-contentDTO';
import { CartContentService } from '../service/cartcontent/cart-content.service';
import { StaticVars } from '../config/static-vars';

@Component({
  selector: 'app-sidecart',
  templateUrl: './sidecart.component.html',
  styleUrls: ['./sidecart.component.scss'],
})
export class SidecartComponent implements OnInit {
  private cartContentService: CartContentService;
  public cartContents: Observable<CartContentDTO[]>;

  @Input() searchValue: string = '';

  @Input() getCartValue: boolean = false;

  constructor(cartContentService: CartContentService) {
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    this.searchValue = '';
  }

  ngOnInit() {}
}
