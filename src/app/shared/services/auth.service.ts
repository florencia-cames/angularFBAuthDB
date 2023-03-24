import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  user$: Observable<firebase.User | null>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.user$ = this.afAuth.authState;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.afAuth.authState.subscribe((user: any) => {
          if (user) {
            this.router.navigate(['/auth/my-account']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        window.alert('Para acceder a su cuenta debe primero activar su email.');
        this.SendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => {
        u?.sendEmailVerification();
        this.SignOut();
      })
      .catch((err) => {})
      .then(() => {
        this.router.navigate(['/auth/verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.emailVerified == false) {
      window.alert('Para acceder a su cuenta debe primero activar su email.');
      this.SignOut();
    }
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
    });
  }

  deleteUser() {
    this.afAuth.currentUser.then((user: any) => {
      user
        ?.delete()
        .then(() => {
          window.alert('Cuenta borrada exitosamente');
          this.router.navigate(['/auth/login']);
        })
        .catch((error: any) => {
          window.alert(
            'Para poder borrar tu cuenta necesitamos que vuelvas a iniciar sesión y hagas click aquí nuevamente, asi nos aseguramos de que seas el dueño de la misma.'
          );
        });
    });
  }
}
