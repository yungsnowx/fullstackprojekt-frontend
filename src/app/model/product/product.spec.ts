//import { Product } from './product';
import {ProductDTO} from "./productDTO";

describe('Product', () => {
  it('should create an instance', () => {
    expect(new ProductDTO(0,"","",0)).toBeTruthy();
  });
});
