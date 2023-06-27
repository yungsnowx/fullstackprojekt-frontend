import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, catchError, tap} from "rxjs";
import {UserDTO} from "../../model/user/userDTO";



@Injectable({
  providedIn:'root'
})
export class UserService{
  url = "/users";
  constructor(private  httpClient:HttpClient) {
  }
  public listUsers():Observable<UserDTO[]>{
    console.log("execute listUser");
    return this.httpClient.get<UserDTO[]>(this.url);
  }
  public logIn(user:UserDTO):Observable<UserDTO>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute Log in");
    return this.httpClient.post<UserDTO>(this.url+"/log_in",user.get_user(),{headers})
  }
  public sign(user:UserDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute sign in");
    return this.httpClient.post(this.url+"/sign_in",user.get_user(),{headers});
  }
  public saveUser(user:UserDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute a save");
    return this.httpClient.post(this.url,user.get_user(),{headers});
  }
  public updateUser(user:UserDTO){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute an update");
    return this.httpClient.put(this.url,user.get_user(),{headers});
  }
  public deleteUser(id:number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute a delete");
    return this.httpClient.delete(this.url+`/:${id}`,{headers});
  }
}
