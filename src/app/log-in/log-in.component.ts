import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private userService: UserService,
    private firebaseAuthService: FirebaseAuthService,
    private router: Router
  ) {}

  getErrorMessage(text: string, object: FormControl) {
    if (object.hasError('required')) {
      return `${text} ist leer`;
    }
    return object.hasError('email') ? 'Keine korrekte E-Mail' : '';
  }

  ngOnInit() {
    this.hide = true;
    this.password = new FormControl();
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.firebaseAuthService.waitForAuth().then(() => {
      if (this.firebaseAuthService.getFirebaseUser() != null) {
        this.router.navigate(['/']);
      }
    });
  }

  logIn() {
    this.firebaseAuthService.logIn(this.email.value, this.password.value);
  }
  logInWithGoogle() {
    this.firebaseAuthService.signInWithGoogle();
  }
}
