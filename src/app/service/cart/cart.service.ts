import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CartDTO} from '../../model/cart/cartDTO';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {
  }

  public listCarts(): Observable<CartDTO[]> {
    console.log('execute listCarts');
    return this.httpClient.get<CartDTO[]>('/warenkorb');
  }
}
