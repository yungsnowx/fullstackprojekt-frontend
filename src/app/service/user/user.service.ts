import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserDTO} from "../../model/user/userDTO";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "/users";

  constructor(private httpClient: HttpClient) {
  }

  public listUsers(): Observable<UserDTO[]> {
    console.log("execute listUsers");
    return this.httpClient.get<UserDTO[]>(this.url);
  }

  public getUser(id: string): Observable<UserDTO> {
    console.log(`execute getUser with id ${id}`);
    return this.httpClient.get<UserDTO>(this.url + `/:${id}`);
  }

  public saveUser(user: UserDTO) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute saveUser");
    return this.httpClient.post(this.url, user, {headers}).subscribe();
  }

  public updateUser(user: UserDTO) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute updateUser");
    return this.httpClient.put(this.url, user, {headers}).subscribe();
  }

  public deleteUser(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("execute deleteUser");
    return this.httpClient.delete(this.url + `/:${id}`, {headers});
  }
}
