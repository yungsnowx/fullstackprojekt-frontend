import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CartContentDTO } from '../model/cartcontent/cart-contentDTO';
import { CartContentService } from '../service/cartcontent/cart-content.service';
import { StaticVars } from '../config/static-vars';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private cartContentService: CartContentService;
  public cartContents: Observable<CartContentDTO[]>;
  public cartSize: number;

  constructor(cartContentService: CartContentService) {
    this.cartContentService = cartContentService;
    this.cartContents = cartContentService.listCartContentByCartId(StaticVars.cartIdInUse);

    this.cartSize = 0;
    this.cartContents.forEach((cartContent) => {
      cartContent.forEach((content) => {
        this.cartSize += content.anzahl;
      });
    });
  }

  showDiv: boolean = false;

  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue.toLowerCase());
  }

  
  showCart: boolean = false;
  showLog:boolean = false;
  @Output()
  toggled: EventEmitter<any> = new EventEmitter<any>();
  cartClicked() {
    if (this.showCart == false) {
      this.showCart = true;
    } else {
      this.showCart = false;
    }
    this.toggled.emit(this.showCart);
  }

  @Output()
  log: EventEmitter<boolean> = new EventEmitter<boolean>();
  logClicked(){
    if(this.showLog == false){
      this.showLog = true;
    }
    else{
      this.showLog = false;
    }
    this.log.emit(this.showLog)
  }
  ngOnInit(): void {}
}
