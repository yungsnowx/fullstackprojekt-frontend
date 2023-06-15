import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartContentDTO } from 'src/app/model/cartcontent/cart-contentDTO';

@Injectable({
  providedIn: 'root',
})
export class CartContentService {
  url = '/warenkorbinhalt'
  constructor(private httpClient: HttpClient) {}

  public listCarts(): Observable<CartContentDTO[]> {
    console.log("execte an get all");
    return this.httpClient.get<CartContentDTO[]>(this.url);
  }

  public listCartContentByCartId(id: number): Observable<CartContentDTO[]> {
    console.log("execte an get by ID");
    return this.httpClient.get<CartContentDTO[]>(
      `/warenkorbinhalt/warenkorb/${id}`
    );
  }

  public updateCartContent(cartContent: CartContentDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execte an update");
    return this.httpClient.put(
      this.url,
      cartContent.getWithId(),
      {headers}
    ).subscribe()
  }
  public addCartContent(cartContent:CartContentDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execte an addCart");
    console.log(cartContent.get())
    return this.httpClient.post(this.url,cartContent.get()).subscribe()
  }
}
