import { Cart } from './cart';

export class CartDTO implements Cart {
  public warenkorbID: number;
  public userID: number;

  constructor(
    warenkorbID: number,
    userID: number
  ) {
    this.warenkorbID = warenkorbID;
    this.userID = userID;
  }
}
