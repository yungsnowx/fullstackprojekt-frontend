import { Component, Input } from '@angular/core';
import { take } from 'rxjs';
import { CartDTO } from '../model/cart/cartDTO';
import { CartContentDTO } from '../model/cartcontent/cart-contentDTO';
import { CartService } from '../service/cart/cart.service';
import { CartContentService } from '../service/cartcontent/cart-content.service';
import { FirebaseAuthService } from '../service/firebase/firebase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() title: string = 'Default title';
  @Input() description: string = 'Default description';
  @Input() price: string = '0.00';
  @Input() image: string = '';
  @Input() id: string = '';

  constructor(
    public firebaseAuthService: FirebaseAuthService,
    public cartContentService: CartContentService,
    private cartService: CartService
  ) {}

  /**
   * Diese Methode fügt ein Produkt zum Warenkorb hinzu.
   * Dazu wird zunächst geprüft, ob das Produkt bereits im Warenkorb ist.
   * Falls ja, wird die Anzahl des Produkts im Warenkorb um 1 erhöht.
   * Falls nein, wird das Produkt mit der Anzahl 1 zum Warenkorb hinzugefügt.
   * pipe(take(1)) sorgt dafür, dass die Subscription nach dem ersten Wert beendet wird.
   */
  addProductToCart() {
    let productAlreadyInCart: boolean = false;
    this.cartService
      .getActiveCartByUserId(this.firebaseAuthService.getUserID())
      .subscribe((cart) => {
        if (cart == null) {
          this.firebaseAuthService
            .getFirebaseUser()
            .getIdToken()
            .then((token) => {
              this.cartService
                .addCart(
                  new CartDTO(0, this.firebaseAuthService.getUserID(), true)
                )
                .pipe(take(1))
                .subscribe((createdCart) => {
                  cart = createdCart;
                });
            });
        }
        this.cartContentService
          .getCartContent()
          .pipe(take(1))
          .subscribe((cartContents) => {
            cartContents.forEach((cartContent) => {
              if (cartContent.produktID == parseInt(this.id)) {
                productAlreadyInCart = true;
                cartContent.anzahl++;
                this.cartContentService.updateCartContent(cartContent);
              }
            });

            if (!productAlreadyInCart) {
              this.cartContentService.addCartContent(
                new CartContentDTO(0, cart.warenkorbID, parseInt(this.id), 1)
              );
            }
          });
      });
  }
}
