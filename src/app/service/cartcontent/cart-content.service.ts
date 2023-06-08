import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartContentDTO } from 'src/app/model/cartcontent/cart-contentDTO';

@Injectable({
  providedIn: 'root',
})
export class CartContentService {
  constructor(private httpClient: HttpClient) {}

  public listCarts(): Observable<CartContentDTO[]> {
    return this.httpClient.get<CartContentDTO[]>('/warenkorbinhalt');
  }

  public listCartContentByCartId(id: number): Observable<CartContentDTO[]> {
    return this.httpClient.get<CartContentDTO[]>(
      `/warenkorbinhalt/warenkorb/${id}`
    );
  }
}
