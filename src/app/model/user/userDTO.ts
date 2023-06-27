import {User} from "./user";

export class UserDTO implements User {
  public userID?: string;
  public vorname?: string;
  public nachname?: string;
  public isAdmin?: boolean;

  constructor(userID?: string, vorname?: string, nachname?: string, isAdmin?: boolean) {
    this.userID = userID;
    this.vorname = vorname;
    this.nachname = nachname;
    this.isAdmin = isAdmin;
  }

  getUser() {
    return {
      userID: this.userID,
      vorname: this.vorname,
      nachname: this.nachname,
      isAdmin: this.isAdmin
    }
  }
}
