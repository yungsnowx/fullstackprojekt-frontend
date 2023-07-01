import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import {Injectable} from "@angular/core";
import {UserService} from "../user/user.service";
import {UserDTO} from "../../model/user/userDTO";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class FirebaseAuthService {

  constructor(private auth: Auth, private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  getFirebaseUser(): any {
    return this.auth.currentUser;
  }

  logout() {
    signOut(this.auth);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }


  logIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {

        // Signed in
        this.router.navigate(['/']);
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        this.snackBar.open("Falsche Anmeldedaten", "OK", {
          duration: 5000,
        });
      })
  }

  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
          // Signed in
          this.router.navigate(['#']);
          const user = userCredential.user;
          console.log(user);
        }
      );
  }

  signUpAndSendBackend(email: string, password: string, vorname: string, nachname: string): UserDTO {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          let userObject: UserDTO = new UserDTO(user.uid, vorname, nachname, false);
          this.userService.saveUser(userObject);
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
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }
}
