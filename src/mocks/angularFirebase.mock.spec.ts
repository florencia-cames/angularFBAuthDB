import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
export const mockUser = {
  uid: 'test-uid',
  email: 'test@test.com',
  emailVerified: true,
  displayName: 'Test User',
  photoURL: 'https://test.com/photo.jpg',
  phoneNumber: '+1234567890',
  providerData: [],
  getIdToken: () => Promise.resolve('test-id-token'),
  getIdTokenResult: () =>
    Promise.resolve({
      token: 'test-id-token',
      claims: {},
    } as firebase.auth.IdTokenResult),
  toJSON: () => {
    return {
      uid: 'test-uid',
      email: 'test@test.com',
      emailVerified: true,
      displayName: 'Test User',
      photoURL: 'https://test.com/photo.jpg',
      phoneNumber: '+1234567890',
      providerData: [],
    };
  },
  delete: function (): Promise<void> {
    return Promise.resolve();
  },
  isAnonymous: false,
  linkAndRetrieveDataWithCredential: function (
    credential: firebase.auth.AuthCredential
  ): Promise<firebase.auth.UserCredential> {
    throw new Error('Function not implemented.');
  },
  linkWithCredential: function (
    credential: firebase.auth.AuthCredential
  ): Promise<firebase.auth.UserCredential> {
    throw new Error('Function not implemented.');
  },
  linkWithPhoneNumber: function (
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier
  ): Promise<firebase.auth.ConfirmationResult> {
    throw new Error('Function not implemented.');
  },
  linkWithPopup: function (
    provider: firebase.auth.AuthProvider
  ): Promise<firebase.auth.UserCredential> {
    throw new Error('Function not implemented.');
  },
  linkWithRedirect: function (
    provider: firebase.auth.AuthProvider
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
  metadata: {} as firebase.auth.UserMetadata,
  multiFactor: {} as firebase.User.MultiFactorUser,
  reauthenticateAndRetrieveDataWithCredential: function (
    credential: firebase.auth.AuthCredential
  ): Promise<firebase.auth.UserCredential> {
    throw new Error('Function not implemented.');
  },
  reauthenticateWithCredential: function (
    credential: firebase.auth.AuthCredential
  ): Promise<firebase.auth.UserCredential> {
    throw new Error('Function not implemented.');
  },
  reauthenticateWithPhoneNumber: function (
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier
  ): Promise<firebase.auth.ConfirmationResult> {
    throw new Error('Function not implemented.');
  },
  reauthenticateWithPopup: function (
    provider: firebase.auth.AuthProvider
  ): Promise<firebase.auth.UserCredential> {
    throw new Error('Function not implemented.');
  },
  reauthenticateWithRedirect: function (
    provider: firebase.auth.AuthProvider
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
  refreshToken: '',
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  sendEmailVerification: function (
    actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined
  ): Promise<void> {
    return Promise.resolve();
  },
  tenantId: null,
  unlink: function (providerId: string): Promise<firebase.User> {
    throw new Error('Function not implemented.');
  },
  updateEmail: function (newEmail: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updatePassword: function (newPassword: string): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updatePhoneNumber: function (
    phoneCredential: firebase.auth.AuthCredential
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
  updateProfile: function (profile: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }): Promise<void> {
    throw new Error('Function not implemented.');
  },
  verifyBeforeUpdateEmail: function (
    newEmail: string,
    actionCodeSettings?: firebase.auth.ActionCodeSettings | null | undefined
  ): Promise<void> {
    throw new Error('Function not implemented.');
  },
  providerId: '',
};

export class AngularFireAuthMock {
  signInWithEmailAndPassword: () => {} = () => () => {
    return Promise.resolve({} as firebase.auth.UserCredential);
  };
  createUserWithEmailAndPassword: () => {} = () => {
    return Promise.resolve({} as firebase.auth.UserCredential);
  };
  sendPasswordResetEmail: () => {} = () => {
    return Promise.resolve();
  };
  signOut: () => {} = () => {
    return Promise.resolve();
  };
  currentUser: () => {} = () => {
    return Promise.resolve(mockUser as firebase.User);
  };
  authState: Observable<firebase.User | null> = of(mockUser);
}
