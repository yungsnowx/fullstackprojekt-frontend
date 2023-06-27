import {User} from "./user";

export class UserDTO implements  User{
  public userID?:number
  public vorname?:string;
  public nachname?:string;
  public isAdmin?:boolean;

  constructor(userID?:number,vorname?:string,nachname?:string,isAdmin?:boolean) {
    this.userID = userID;
    this.vorname = vorname;
    this.nachname = nachname;
    this.isAdmin = isAdmin;
    this.userID = userID;
  }
  get_user(){
    return{
      userID: this.userID, 
      vorname: this.vorname,
      nachname: this.nachname,
      isAdmin:this.isAdmin
    }
  }
}
