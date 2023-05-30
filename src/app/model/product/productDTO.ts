import { Product } from './product';

export class ProductDTO implements Product {
  public produktID: number;
  public produktname: string;
  public produktbeschreibung: string;
  public preis: number;

  constructor(
    produktID: number,
    produktname: string,
    produktbeschreibung: string,
    preis: number
  ) {
    this.produktID = produktID;
    this.produktname = produktname;
    this.produktbeschreibung = produktbeschreibung;
    this.preis = preis;
  }
}
