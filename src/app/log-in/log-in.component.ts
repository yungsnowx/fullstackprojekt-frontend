import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../service/firebase/firebase.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  email: FormControl;
  hide: boolean;
  password: FormControl;
  userService: UserService;
  firebaseAuthService: FirebaseAuthService;

  constructor(
    userService: UserService,
    firebaseAuthService: FirebaseAuthService
  ) {
    this.hide = true;
    this.password = new FormControl();
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.userService = userService;
    this.firebaseAuthService = firebaseAuthService;
  }

  getErrorMessage(text: string, object: FormControl) {
    if (object.hasError('required')) {
      return `${text} ist leer`;
    }
    return object.hasError('email') ? 'Keine korrekte E-Mail' : '';
  }

  ngOnInit() {}

  logIn() {
    this.firebaseAuthService.logIn(this.email.value, this.password.value);
  }

  logInWithGoogle() {
    this.firebaseAuthService.signInWithGoogle();
  }
}
