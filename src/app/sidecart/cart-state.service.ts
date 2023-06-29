import {Injectable} from "@angular/core";
import {CartContentDTO} from "../model/cartcontent/cart-contentDTO";

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  public cartContents: CartContentDTO[]

  public getCartContents() {
    return this.cartContents
  }

  public setCartContents(cartContents: CartContentDTO[]) {
    this.cartContents = cartContents
  }
}
