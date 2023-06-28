import {Injectable} from "@angular/core";
@Injectable({
    providedIn: 'root'
  })


export class CountService{
    public count:number
    
    public getCount(){
        return this.count
    }
    public setCount(count:number){
        this.count = count
    }
}