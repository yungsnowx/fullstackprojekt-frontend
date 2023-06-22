import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartContentDTO } from '../model/cartcontent/cart-contentDTO';
import { CartContentService } from '../service/cartcontent/cart-content.service';
import { StaticVars } from '../config/static-vars';
import { NavigationEnd, Router } from '@angular/router';

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

  currentPath: string = '';

  constructor(cartContentService: CartContentService, private router: Router) {
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);
    this.searchValue = '';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });
  }

  ngOnInit() {}
}
