import {ProductDTO} from "./productDTO";
import { ProductComponent } from 'src/app/product/product.component';
import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new ProductDTO(0,"","",0)).toBeTruthy();
  });
});
