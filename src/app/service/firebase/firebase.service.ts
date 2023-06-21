import {Auth, sendPasswordResetEmail, signOut,signInWithEmailAndPassword} from '@angular/fire/auth';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class FirebaseAuthService {

  constructor(private auth: Auth,) {
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
    signInWithEmailAndPassword(this.auth,email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      }
    )
  }
}
