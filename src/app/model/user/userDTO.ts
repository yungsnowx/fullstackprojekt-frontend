import {User} from "./user";

export class UserDTO implements  User{
  public vorname?:string;
  public nachname?:string;
  public email?:string;
  public passwort?: string;
  public isAdmin?:boolean;
  constructor(email?:string, passwort?:string,vorname?:string,nachname?:string,isAdmin?:boolean) {
    this.email = email;
    this.passwort = passwort;
    this.vorname = vorname;
    this.nachname = nachname;
    this.isAdmin = isAdmin;
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
