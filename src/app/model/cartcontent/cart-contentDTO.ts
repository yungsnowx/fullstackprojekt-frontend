import { ProductDTO } from '../product/productDTO';
import { CartContent } from './cart-content';

export class CartContentDTO implements CartContent {
  public warenkorbinhaltID: number;
  public warenkorbID: number;
  public produktID: ProductDTO;
  public anzahl: number;

  constructor(
    warenkorbinhaltID: number,
    warenkorbID: number,
    produktID: ProductDTO,
    anzahl: number
  ) {
    this.warenkorbinhaltID = warenkorbinhaltID;
    this.warenkorbID = warenkorbID;
    this.produktID = produktID;
    this.anzahl = anzahl;
  }
}
