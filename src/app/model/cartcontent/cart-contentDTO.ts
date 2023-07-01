import { CartContent } from './cart-content';

export class CartContentDTO implements CartContent {
  public warenkorbinhaltID: number;
  public warenkorbID: number;
  public produktID: number;
  public anzahl: number;

  constructor(
    warenkorbinhaltID: number,
    warenkorbID: number,
    produktID: number,
    anzahl: number
  ) {
    this.warenkorbinhaltID = warenkorbinhaltID;
    this.warenkorbID = warenkorbID;
    this.produktID = produktID;
    this.anzahl = anzahl;
  }
  get(){
    return  {
      warenkorbID: this.warenkorbID,
      produktID: this.produktID,
      anzahl:this.anzahl
    }
  }
  public getWithId(){
    return{
      warenkorbinhaltID : this.warenkorbinhaltID,
      warenkorbID: this.warenkorbID,
      produktID: this.produktID,
      anzahl:this.anzahl
    }
  }
}
