import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core"
import {Observable} from "rxjs";
import {AddressDTO} from "src/app/model/address/addressDTO";

@Injectable({
  providedIn: 'root'
})

export class AddressService {

  constructor(private httpClient: HttpClient) {
  }

  url = "/adresse"

  public listAddress(): Observable<AddressDTO[]> {
    console.log("execute listAddress");
    return this.httpClient.get<AddressDTO[]>(this.url);
  }

  public getAddress(id: number): Observable<AddressDTO> {
    console.log(`execute getAddress with id ${id}`);
    return this.httpClient.get<AddressDTO>(this.url + `/:${id}`)
  }

  public saveAddress(address: AddressDTO) {
    console.log("execute saveAddress");
    return this.httpClient.post(this.url, address).subscribe();
  }

  public updateAddress(address: AddressDTO) {
    console.log("execute updateAddress");
    return this.httpClient.put(this.url, address);
  }

  public deleteAddress(id: number) {
    console.log("execute deleteAddress");
    return this.httpClient.delete(this.url + `/:${id}`)
  }
}
