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

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class FirebaseAuthService {

  constructor(private auth: Auth, private userService: UserService) {
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
          const user = userCredential.user;
          console.log(user);
        }
      )
  }

  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        }
      );
  }

  signUpAndSendBackend(email: string, password: string, vorname: string, nachname: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          this.userService.saveUser(new UserDTO(user.uid, vorname, nachname, false));
        }
      );
  }
}
