import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartContentDTO} from 'src/app/model/cartcontent/cart-contentDTO';
import {CartContent} from "../../model/cartcontent/cart-content";

@Injectable({
  providedIn: 'root',
})
export class CartContentService {
  private cartContentSubject: BehaviorSubject<CartContent[]> = new BehaviorSubject<CartContent[]>([])
  private cartContents: CartContent[] = []
  url = '/warenkorbinhalt'

  constructor(private httpClient: HttpClient) {
  }

  public listCarts(): Observable<CartContentDTO[]> {
    console.log("execute listCarts");
    return this.httpClient.get<CartContentDTO[]>(this.url);
  }

  public fetchCartContentByCartId(cartId: number) {
    this.httpClient.get<CartContent[]>(this.url + `/warenkorb/${cartId}`).subscribe(
      (response: CartContent[]) => {
        this.cartContents = response.map(content => new CartContentDTO(
          content.warenkorbinhaltID,
          content.warenkorbID,
          content.produktID,
          content.anzahl
        ))
        this.cartContentSubject.next(this.cartContents)
      }
    )
  }

  public updateCartContent(cartContent: CartContent) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute updateCartContent");
    return this.httpClient.put(
      this.url,
      cartContent,
      {headers}
    ).subscribe((response: CartContent) => {
      const updatedCartContent = new CartContentDTO(
        response[0].warenkorbinhaltID,
        response[0].warenkorbID,
        response[0].produktID,
        response[0].anzahl
      );
      const updatedIndex = this.cartContents.findIndex(content => content.warenkorbinhaltID === updatedCartContent.warenkorbinhaltID)

      if (updatedIndex !== -1) {
        this.cartContents[updatedIndex] = updatedCartContent;
        this.cartContentSubject.next(this.cartContents)
      }
    })
  }

  public addCartContent(cartContent: CartContentDTO) {
    console.log("execute addCartContent");
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<CartContent>(this.url, cartContent.get(), {headers}).subscribe((response: CartContent) => {
        const createdCartContent = new CartContentDTO(
          response.warenkorbinhaltID,
          response.warenkorbID,
          response.produktID,
          response.anzahl
        );
        this.cartContents.push(createdCartContent);
        this.cartContentSubject.next(this.cartContents)
      }
    )
  }

  public deleteCartContent(id: number) {
    console.log("execute deleteCartContent")
    return this.httpClient.delete(this.url + `/${id}`).subscribe(() => {
      this.cartContents = this.cartContents.filter(content => content.warenkorbinhaltID !== id);
      this.cartContentSubject.next(this.cartContents);
    })
  }

  getCartContent(): Observable<CartContent[]> {
    return this.cartContentSubject.asObservable();
  }
}
