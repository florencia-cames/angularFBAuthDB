import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}
  /**
   * The canActivate() function returns a boolean observable that uses
   * the Firebase authentication library to check the
   * authentication status and if the user's email has been verified,
   * allowing or denying access accordingly.
   * @returns
   */
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user && user.emailVerified) {
          return true;
        } else {
          if (user && !user.emailVerified) {
            alert('Debes activar el email para utilizar el servicio');
          }

          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
