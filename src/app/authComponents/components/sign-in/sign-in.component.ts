import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  userNameValue!: string;
  userPasswordValue!: string;

  constructor(public authService: AuthService) {}

  onSubmit() {
    this.authService.SignIn(this.userNameValue, this.userPasswordValue);
  }
}
