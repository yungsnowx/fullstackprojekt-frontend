import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CartDTO } from '../../model/cart/cartDTO';
import { UserDTO } from '../../model/user/userDTO';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class FirebaseAuthService {
  constructor(
    private auth: Auth,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getFirebaseUser(): any {
    return this.auth.currentUser;
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  logIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // Signed in
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        this.snackBar.open('Falsche Anmeldedaten', 'OK', {
          duration: 5000,
        });
      });
  }

  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        // Signed in
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
        const user = userCredential.user;
        console.log(user);
      }
    );
  }

  signUpAndSendBackend(
    email: string,
    password: string,
    vorname: string,
    nachname: string
  ): UserDTO {
    createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        let userObject: UserDTO = new UserDTO(
          user.uid,
          vorname,
          nachname,
          false
        );
        userCredential.user.getIdToken().then((token) => {
          this.userService
            .saveUser(userObject, token)
            .pipe(take(1))
            .subscribe(() => {
              this.cartService
                .addCart(new CartDTO(0, user.uid, true))
                .subscribe(() => {
                  this.router.navigate(['/']).then(() => {
                    window.location.reload();
                  });
                });
            });
        });
        return userObject;
      }
    );
    return null;
  }

  getUserID(): string {
    return this.auth.currentUser.uid;
  }

  waitForAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }

  signInWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      let userObject: UserDTO = new UserDTO(user.uid, 'Google', 'User', false);
      result.user.getIdToken().then((token) => {
        this.userService
          .saveUser(userObject, token)
          .pipe(take(1))
          .subscribe(() => {
            this.cartService
              .addCart(new CartDTO(0, user.uid, true))
              .subscribe(() => {
                this.router.navigate(['/']).then(() => {
                  window.location.reload();
                });
              });
          });
      });
    });
  }
}
