import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { UtilsService } from './shared/utils.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn!: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    public utilsService: UtilsService
  ) {
    this.authService.user$.subscribe((user) => {
      this.loggedIn = !!user;
    });
  }
  logout() {
    this.authService.SignOut();
    this.router.navigate(['/auth/login']);
  }
}
