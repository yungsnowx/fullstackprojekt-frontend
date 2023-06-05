import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserDTO} from "../model/user/userDTO";
import {UserService} from "../service/user/user.service";
import {Observable, map} from "rxjs";



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements  OnInit{
  email:FormControl;
  hide:boolean;
  password:FormControl;
  users:Observable<UserDTO[]>;
  userService:UserService;
  constructor(userService:UserService) {
    this.hide = true;
    this.password =  new FormControl();
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.userService = userService;
    this.users = userService.listUsers();

  }
  getErrorMessage(text:string, object: FormControl){
      if( object.hasError('required')){
        return `${text} ist leer`;
      }
      return object.hasError('email') ? 'keine korrekte Email' : "";
  }
  check(){
    if(this.email.value && this.password.value) {
      this.userService.logIn(new UserDTO(this.email.value, this.password.value)).subscribe( 
        response =>{
          if(response === Object({message:"succces"})){
            alert("Sie sind verbunden");
          }
          else{
            console.log(response);
            alert("unkorrekte Information");
          }
        }
      )
    }
  }
  ngOnInit() {
  }
}
