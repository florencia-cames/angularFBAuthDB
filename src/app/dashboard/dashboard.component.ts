import { FirebaseService } from './../shared/services/firebase.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
export interface NumberArray {
  numbers: number[];
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  number = new FormControl(0, [Validators.required]);
  myArray$!: NumberArray | undefined;
  userId!: string;
  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.firebaseService.getMyArray(user.uid).subscribe((data) => {
          this.myArray$ = data;
        });
      }
    });
  }

  addNumber() {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.firebaseService.addNumberToMyArray(
          user.uid,
          this.number.value ?? 0,
          this.userId
        );
        this.number.reset();
      }
    });
  }

  borrarNumero(number: number) {
    this.firebaseService.removeNumberFromMyArray(this.userId, number);
  }
}
