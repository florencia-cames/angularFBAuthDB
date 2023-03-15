import {
  AngularFireAuthMock,
  mockUser,
} from '../../../mocks/angularFirebase.mock.spec';
import { environment } from './../../../environments/environment';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';

describe('AuthService', () => {
  let authService: AuthService;
  let afAuth: AngularFireAuthMock;
  let mockAlert = jasmine.createSpy('window.alert');
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [
        AuthService,
        AngularFirestore,
        Router,
        { provide: AngularFireAuth, useClass: AngularFireAuthMock }, // Utilizamos el mock de AngularFireAuth
      ],
    });
    authService = TestBed.inject(AuthService);
    afAuth = TestBed.inject(AngularFireAuth) as unknown as AngularFireAuthMock; // Convertimos AngularFireAuth a su mock correspondiente
    mockAlert = spyOn(window, 'alert');
    Object.defineProperty(authService.afAuth, 'currentUser', {
      get: () => Promise.resolve(mockUser as firebase.User),
    });
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should sign in the user', fakeAsync(() => {
    spyOn(authService.afAuth, 'signInWithEmailAndPassword').and.returnValue(
      Promise.resolve({} as firebase.auth.UserCredential)
    );
    spyOn(authService.router, 'navigate');
    authService.SignIn('test-email@example.com', 'test-password');
    tick(); // Avanzamos el tiempo simulado para que se resuelvan las promesas
    expect(authService.afAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      'test-email@example.com',
      'test-password'
    );
    expect(authService.router.navigate).toHaveBeenCalledWith(['/my-account']);
  }));

  it('should sign up the user', fakeAsync(() => {
    spyOn(authService.afAuth, 'createUserWithEmailAndPassword').and.returnValue(
      Promise.resolve({} as firebase.auth.UserCredential)
    );
    spyOn(authService, 'SendVerificationMail');

    authService.SignUp('test-email@example.com', 'test-password');
    tick(); // Avanzamos el tiempo simulado para que se resuelvan las promesas
    expect(
      authService.afAuth.createUserWithEmailAndPassword
    ).toHaveBeenCalledWith('test-email@example.com', 'test-password');
    expect(window.alert).toHaveBeenCalledWith(
      'Para acceder a su cuenta debe primero activar su email.'
    );
    expect(authService.SendVerificationMail).toHaveBeenCalled();
  }));

  it('should send a verification email', fakeAsync(() => {
    spyOn(authService, 'SignOut');
    spyOn(authService.router, 'navigate');
    authService.SendVerificationMail();
    tick(); // Avanzamos el tiempo simulado para que se resuelvan las promesas

    expect(authService.SignOut).toHaveBeenCalled();
    expect(authService.router.navigate).toHaveBeenCalledWith([
      'verify-email-address',
    ]);
  }));

  it('should send a password reset email', fakeAsync(() => {
    spyOn(authService.afAuth, 'sendPasswordResetEmail').and.returnValue(
      Promise.resolve()
    );

    authService.ForgotPassword('test-email@example.com');
    tick(); // Avanzamos el tiempo simulado para que se resuelvan las promesas
    expect(authService.afAuth.sendPasswordResetEmail).toHaveBeenCalledWith(
      'test-email@example.com'
    );
    expect(window.alert).toHaveBeenCalledWith(
      'Password reset email sent, check your inbox.'
    );
  }));

  it('should return true if user is logged in and email is verified', () => {
    localStorage.setItem('user', JSON.stringify({ emailVerified: true }));
    expect(authService.isLoggedIn).toBe(true);
  });

  it('should return false if user is logged in but email is not verified', () => {
    localStorage.setItem('user', JSON.stringify({ emailVerified: false }));
    expect(authService.isLoggedIn).toBe(false);
  });

  it('should return false if user is not logged in', () => {
    localStorage.removeItem('user');
    expect(authService.isLoggedIn).toBe(false);
  });

  it('should sign out the user', fakeAsync(() => {
    const signOutSpy = spyOn(authService.afAuth, 'signOut').and.returnValue(
      Promise.resolve()
    );
    const removeItemSpy = spyOn(localStorage, 'removeItem');
    const navigateSpy = spyOn(authService.router, 'navigate');

    authService.SignOut();
    tick();

    expect(signOutSpy).toHaveBeenCalled();
    expect(removeItemSpy).toHaveBeenCalledWith('user');
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  }));

  it('should delete user account', fakeAsync(() => {
    mockUser.delete = jasmine
      .createSpy('delete')
      .and.returnValue(Promise.resolve());
    spyOnProperty(authService.afAuth, 'currentUser', 'get').and.returnValue(
      Promise.resolve(mockUser)
    );

    spyOn(authService.router, 'navigate');

    authService.deleteUser();
    tick();

    expect(mockUser.delete).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Cuenta borrada exitosamente');
    expect(authService.router.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('should show error message when user account cannot be deleted', fakeAsync(() => {
    mockUser.delete = jasmine
      .createSpy('delete')
      .and.returnValue(Promise.reject(new Error('Error deleting account')));
    spyOnProperty(authService.afAuth, 'currentUser', 'get').and.returnValue(
      Promise.resolve(mockUser)
    );

    spyOn(authService.router, 'navigate');

    authService.deleteUser();
    tick();

    expect(mockUser.delete).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Para poder borrar tu cuenta necesitamos que vuelvas a iniciar sesión y hagas click aquí nuevamente, asi nos aseguramos de que seas el dueño de la misma.'
    );
    expect(authService.router.navigate).not.toHaveBeenCalled();
  }));
});
