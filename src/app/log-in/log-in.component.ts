import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserDTO} from "../model/user/userDTO";
import {UserService} from "../service/user/user.service";
import {Observable} from "rxjs";
import {FirebaseAuthService} from "../service/firebase/firebase.service";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  email: FormControl;
  hide: boolean;
  password: FormControl;
  users: Observable<UserDTO[]>;
  userService: UserService;
  firebaseAuthService: FirebaseAuthService;

  constructor(userService: UserService, firebaseAuthService: FirebaseAuthService) {
    this.hide = true;
    this.password = new FormControl();
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.userService = userService;
    this.users = userService.listUsers();
    this.firebaseAuthService = firebaseAuthService;
  }

  getErrorMessage(text: string, object: FormControl) {
    if (object.hasError('required')) {
      return `${text} ist leer`;
    }
    return object.hasError('email') ? 'Keine korrekte E-Mail' : "";
  }

  ngOnInit() {
  }

  logIn() {
    this.firebaseAuthService.logIn(this.email.value, this.password.value);
  }

}
