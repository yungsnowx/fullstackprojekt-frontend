import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDTO } from 'src/app/model/order/orderDTO';


@Injectable({
  providedIn: 'root',
})

export class  OrderService{
    url = "/bestellung"
    constructor(private httpClient:HttpClient){}

    getAllOrder():Observable<OrderDTO[]>{
        console.log("execute  getAllOrder")
        return this.httpClient.get<OrderDTO[]>(this.url)
    }
    getOrderById(id:number):Observable<OrderDTO>{
        console.log("execute getOrderById")
        return this.httpClient.get<OrderDTO>(this.url + `/:${id}`)
    }
    addOrder(orderDTO:OrderDTO){
        console.log("execute addOrder")
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post(this.url,orderDTO.getWithoutId(),{headers}).subscribe()
    }
    updateOrder(orderDTO:OrderDTO){
        console.log("execute updateOrder")
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.put(this.url,orderDTO.getOrderDTO(),{headers}).subscribe()
    }
    deleteOrder(id:number){
        console.log("execute deleteOrder")
        return this.httpClient.delete(this.url + `/:${id}`).subscribe()
    }


}
