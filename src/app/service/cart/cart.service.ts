import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDTO } from '../../model/cart/cartDTO';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  url = '/warenkorb';

  public listCarts(): Observable<CartDTO[]> {
    console.log('execute listProducts');
    return this.httpClient.get<CartDTO[]>(this.url);
  }

  public addCart(cartDTO: CartDTO): Observable<CartDTO> {
    console.log('execute addCart');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<CartDTO>(this.url, cartDTO.getWithoutId(), {
      headers,
    });
  }

  public getActiveCartByUserId(userId: string): Observable<CartDTO> {
    console.log(`execute getActiveCartByUserId with id ${userId}`);
    return this.httpClient.get<CartDTO>(this.url + `/user/${userId}`);
  }

  public getCartbyId(id: number) {
    console.log('execute getCart by id');
    return this.httpClient.get(this.url + `/:${id}`);
  }

  public updateCart(cartDTO: CartDTO) {
    console.log('execute an update of the  Cart');
    return this.httpClient.put(this.url, cartDTO).subscribe();
  }

  public deleteCart(id: number) {
    console.log('execute DeleteCart');
    return this.httpClient.delete(this.url + `/:${id}`).subscribe();
  }
}
