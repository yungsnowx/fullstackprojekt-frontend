import {Cart} from './cart';

export class CartDTO implements Cart {
  public warenkorbID: number;
  public userID: string;
  public istAktiv: boolean;

  constructor(
    warenkorbID: number,
    userID: string,
    istAktiv: boolean
  ) {
    this.warenkorbID = warenkorbID;
    this.userID = userID;
    this.istAktiv = istAktiv
  }

  getCart() {
    return {
      warenkorbID: this.warenkorbID,
      userID: this.userID,
      istAktiv: this.istAktiv
    }

  }
}
