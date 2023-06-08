import { Product } from '../product/product';

export interface CartContent {
  warenkorbinhaltID: number;
  warenkorbID: number;
  produktID: Product;
  anzahl: number;
}
