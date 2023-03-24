import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './authComponents/components/forgot-password/forgot-password.component';
import { SignInComponent } from './authComponents/components/sign-in/sign-in.component';
import { SignUpComponent } from './authComponents/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './authComponents/components/verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'my-account',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authComponents/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
