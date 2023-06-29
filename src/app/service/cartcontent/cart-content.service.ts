import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CartContentDTO} from 'src/app/model/cartcontent/cart-contentDTO';

@Injectable({
  providedIn: 'root',
})
export class CartContentService {
  url = '/warenkorbinhalt'

  constructor(private httpClient: HttpClient) {
  }

  public listCarts(): Observable<CartContentDTO[]> {
    console.log("execute listCarts");
    return this.httpClient.get<CartContentDTO[]>(this.url);
  }

  public listCartContentByCartId(id: number): Observable<CartContentDTO[]> {
    console.log(`execute listCartContentByCartId with id ${id}`);
    return this.httpClient.get<CartContentDTO[]>(
      `/warenkorbinhalt/warenkorb/${id}`
    );
  }

  public updateCartContent(cartContent: CartContentDTO): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute updateCartContent");
    return this.httpClient.put(
      this.url,
      cartContent,
      {headers}
    )
  }

  public addCartContent(cartContent: CartContentDTO) {
    console.log("execute addCartContent");
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.url, cartContent.get(), {headers}).subscribe()
  }

  public deleteCartContent(id: number) {
    console.log("execute deleteCartContent")
    return this.httpClient.delete(this.url + `/${id}`).subscribe()
  }
}
