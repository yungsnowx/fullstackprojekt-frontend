import {User} from "./user";

export class UserDTO implements  User{
  public userIDFireAuth?:number
  public vorname?:string;
  public nachname?:string;
  public isAdmin?:boolean;
  constructor(userIDFireAuth?:number,vorname?:string,nachname?:string,isAdmin?:boolean) {
    this.userIDFireAuth = userIDFireAuth;
    this.vorname = vorname;
    this.nachname = nachname;
    this.isAdmin = isAdmin;
   
  }
  get_user(){
    return{
      userIDFireAuth: this.userIDFireAuth, 
      vorname: this.vorname,
      nachname: this.nachname,
      isAdmin:this.isAdmin
    }
  }
}
