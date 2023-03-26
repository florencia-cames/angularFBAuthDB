import { NumberArray } from './../../dashboard/dashboard.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {}

  getMyArray(uid: string): Observable<NumberArray | undefined> {
    return this.afs.collection<NumberArray>(`myArray`).doc(uid).valueChanges();
  }

  async addNumberToMyArray(uid: string, number: number, userId: string) {
    const collectionRef = this.afs.collection('myArray').doc(userId);
    try {
      const doc = await firstValueFrom(collectionRef.get());
      if (doc.exists) {
        await collectionRef.update({
          numbers: firebase.firestore.FieldValue.arrayUnion(number),
        });
      } else {
        await collectionRef.set({
          numbers: [number],
        });
      }
      this.snackBar.open('Item added', 'Close', {
        duration: 3000,
      });
    } catch (error: any) {
      this.snackBar.open(error.message, 'Close', {
        duration: 3000,
      });
    }
  }

  removeNumberFromMyArray(uid: string, number: number) {
    this.afs
      .collection<any>(`myArray`)
      .doc(uid)
      .update({
        numbers: firebase.firestore.FieldValue.arrayRemove(number),
      })
      .then(() => {
        this.snackBar.open('Item deleted', 'Close', {
          duration: 3000,
        });
      })
      .catch((error) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      });
  }

  incrementValues(userId: string, number: number) {
    // increment values on using firebase Increment
    const documentRef = this.afs.collection('myArray').doc(userId);
    if (documentRef) {
      const increment = firebase.firestore.FieldValue.increment(number);
      documentRef
        .update({ count: increment })
        .then(() =>
          this.snackBar.open('Item deleted', 'Close', {
            duration: 3000,
          })
        )
        .catch((error) =>
          this.snackBar.open(error.message, 'Close', {
            duration: 3000,
          })
        );
    }
  }
}
