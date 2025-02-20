import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared.module';
import { LockscreenComponent } from './lockscreen/lockscreen';
import { SigninComponent } from './signin/signin';
import { SignupComponent } from './signup/signup';
import { ForgotPasswordComponent } from './forgotpassword/forgot-password';

const routes: Routes = [
    { path: 'auth', redirectTo: 'auth/signin', pathMatch: 'full' },
    { path: 'auth/lockscreen', component: LockscreenComponent, data: { title: 'Lockscreen' } },
    { path: 'auth/forgot-password', component: ForgotPasswordComponent, data: { title: 'Forgot Password' } },
    { path: 'auth/signin', component: SigninComponent, data: { title: 'Signin' } },
    { path: 'auth/signup', component: SignupComponent, data: { title: 'Signup' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule.forRoot()],
    declarations: [
        LockscreenComponent,
        ForgotPasswordComponent,
        SigninComponent,
        SignupComponent
    ],
})
export class AuthModule { }
