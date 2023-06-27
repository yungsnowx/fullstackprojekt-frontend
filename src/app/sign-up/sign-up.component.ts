import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AddressService} from '../service/address/address.service';
import {UserService} from '../service/user/user.service';
import {AddressDTO} from '../model/address/addressDTO';
import {FirebaseAuthService} from "../service/firebase/firebase.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  vorname: FormControl;
  nachname: FormControl;
  email: FormControl;
  passwort: FormControl;
  wiederPass: FormControl;
  hide: boolean;
  strasse: FormControl;
  hausnummer: FormControl;
  ort: FormControl;
  plz: FormControl;
  land: FormControl;
  addressService: AddressService;
  userService: UserService;
  firebaseAuthService: FirebaseAuthService;

  constructor(addressService: AddressService, userService: UserService, firebaseAuthService: FirebaseAuthService) {
    this.vorname = new FormControl("", [Validators.required])
    this.nachname = new FormControl("", [Validators.required])
    this.email = new FormControl("", [Validators.required, Validators.email])
    this.passwort = new FormControl("", [Validators.required])
    this.wiederPass = new FormControl("", [Validators.required])
    this.hide = true
    this.strasse = new FormControl("", [Validators.required])
    this.ort = new FormControl("", [Validators.required])
    this.hausnummer = new FormControl("", [Validators.required])
    this.plz = new FormControl("", [Validators.required])
    this.land = new FormControl("", [Validators.required])
    this.userService = userService;
    this.addressService = addressService;
    this.firebaseAuthService = firebaseAuthService;
  }

  getErrorMessage(text: string, object: FormControl) {
    if (object.hasError('required')) {
      return `${text} ist leer`;
    }
    return object.hasError('email') ? 'keine korrekte Email' : "";
  }

  signUp() {
    this.firebaseAuthService.signUpAndSendBackend(this.email.value, this.passwort.value, this.vorname.value,this.nachname.value);
    this.addressService.saveAddress(new AddressDTO(
      Math.floor(Math.random() * 1000000),
      this.strasse.value,
      this.hausnummer.value,
      this.ort.value,
      this.plz.value,
      this.land.value
    ));
  }

  ngOnInit(): void {

  }
}
