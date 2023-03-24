import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public ngZone: NgZone,
    private _snackBar: MatSnackBar
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
            this.router.navigate(['/my-account']);
          }
        });
      })
      .catch((error) => {
        this._snackBar.open(error.message, '', {
          duration: environment.snackBardDuration,
        });
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        this._snackBar.open(
          'To access your account you need to first activate your email',
          '',
          { duration: environment.snackBardDuration }
        );
        this.SendVerificationMail();
      })
      .catch((error) => {
        this._snackBar.open(error.message, '', {
          duration: environment.snackBardDuration,
        });
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
        this._snackBar.open(
          'Password reset email sent, check your inbox.',
          '',
          { duration: environment.snackBardDuration }
        );
      })
      .catch((error) => {
        this._snackBar.open(error.message, '', {
          duration: environment.snackBardDuration,
        });
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.emailVerified == false) {
      this._snackBar.open(
        'To access your account you need to first activate your email',
        '',
        { duration: environment.snackBardDuration }
      );
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
          this._snackBar.open('Your account was deleted', '', {
            duration: environment.snackBardDuration,
          });
          this.router.navigate(['/auth/login']);
        })
        .catch((error: any) => {
          this._snackBar.open(error.message, '', {
            duration: environment.snackBardDuration,
          });
        });
    });
  }
}
