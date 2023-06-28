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
    console.log("execute an get all");
    return this.httpClient.get<CartContentDTO[]>(this.url);
  }

  public listCartContentByCartId(id: number): Observable<CartContentDTO[]> {
    console.log("execute an get by ID");
    return this.httpClient.get<CartContentDTO[]>(
      `/warenkorbinhalt/warenkorb/${id}`
    );
  }

  public updateCartContent(cartContent: CartContentDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute an update");
    return this.httpClient.put(
      this.url,
      cartContent.getWithId(),
      {headers}
    ).subscribe()
  }
  public addCartContent(cartContent:CartContentDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute an addCart");
    console.log(cartContent)
    return this.httpClient.post(this.url,cartContent.get()).subscribe()
  }
  public deleteCartContent(id:number){
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute an deleteCart")
    return this.httpClient.delete(this.url+`/${id}`).subscribe()
  }
}
