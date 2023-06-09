import { Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { AddressService } from '../service/address/address.service';
import { UserService } from '../service/user/user.service';
import { AddressDTO } from '../model/address/addressDTO';
import { NONE_TYPE } from '@angular/compiler';
import { UserDTO } from '../model/user/userDTO';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  vorname:FormControl;
  nachname:FormControl;
  email:FormControl;
  passwort:FormControl;
  wiederPass:FormControl;
  hide:boolean;
  strasse:FormControl;
  hausnummer:FormControl;
  ort:FormControl;
  plz:FormControl;
  land:FormControl;
  addressService:AddressService;
  userService:UserService
  constructor(addressService:AddressService, userService:UserService){
    this.vorname = new FormControl("",[Validators.required])
    this.nachname = new FormControl("",[Validators.required])
    this.email = new FormControl("",[Validators.required, Validators.email])
    this.passwort = new  FormControl("",[Validators.required])
    this.wiederPass = new FormControl("",[Validators.required])
    this.hide = true
    this.strasse = new FormControl("",[Validators.required])
    this.ort = new FormControl("",[Validators.required])
    this.hausnummer =new FormControl("",[Validators.required])
    this.plz = new FormControl("",[Validators.required])
    this.land = new FormControl("", [Validators.required])

    this.userService = userService;
    this.addressService = addressService;
  }
  getErrorMessage(text:string, object: FormControl){
    if( object.hasError('required')){
      return `${text} ist leer`;
    }
    return object.hasError('email') ? 'keine korrekte Email' : "";
  }
  save(){
      this.userService.saveUser(new UserDTO(
        this.email.value,this.passwort.value,this.vorname.value,this.nachname.value
      ))
      this.addressService.saveAddress(new AddressDTO(
        this.strasse.value,this.hausnummer.value,this.ort.value, this.plz.value,this.land.value
      ));
  }
ngOnInit(): void {
    
}
}
