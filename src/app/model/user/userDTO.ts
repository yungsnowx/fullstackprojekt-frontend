import {User} from "./user";

export class UserDTO implements  User{
  public vorname?:string;
  public nachname?:string;
  public email?:string;
  public passwort?: string;
  public isAdmin?:boolean;
  public userID?:string;
  constructor(email?:string, passwort?:string,vorname?:string,nachname?:string,isAdmin?:boolean,userID?:string) {
    this.email = email;
    this.passwort = passwort;
    this.vorname = vorname;
    this.nachname = nachname;
    this.isAdmin = isAdmin;
    this.userID = userID;
  }
  get_user(){
    return{
      email:this.email,
      passwort:this.passwort,
      vorname: this.vorname,
      nachname: this.nachname,
      isAdmin:this.isAdmin
    }
  }
}
