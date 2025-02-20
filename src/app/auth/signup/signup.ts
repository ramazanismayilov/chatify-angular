import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../core/services/app.service';
import { toggleAnimation } from 'src/app/shared/animations/toggle.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { phoneOrEmailValidator } from 'src/app/shared/validators/phoneOrEmail.validator';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    templateUrl: './signup.html',
    animations: [toggleAnimation],
})
export class SignupComponent implements OnInit {
    store: any;
    signUpForm!: FormGroup

    constructor(
        public router: Router,
        private fb: FormBuilder,
        public storeData: Store<any>,
        private appSetting: AppService,
        private authService: AuthService,
        public translate: TranslateService,
        private notificationService: NotificationService
    ) {
        this.initStore();
    }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            phoneOrEmail: ["", [phoneOrEmailValidator]],
            password: ["", [Validators.required, Validators.minLength(6)]],
            username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
            fullName: ["", [Validators.minLength(4), Validators.maxLength(20)]]
        })
    }

    signUp() {
        let hasEmail = this.signUpForm.get("phoneOrEmail")?.value.includes("@")
        let params = {
            email: hasEmail ? this.signUpForm.get("phoneOrEmail")?.value : undefined,
            phone: !hasEmail ? this.signUpForm.get("phoneOrEmail")?.value : undefined,
            password: this.signUpForm.get("password")?.value,
            username: this.signUpForm.get("username")?.value,
            fullName: this.signUpForm.get("fullName")?.value,
        }

        this.authService.signUp(params).subscribe({
            next: (response) => {
                this.notificationService.showMessage(response.message, 'success', 'top')
                this.router.navigate(['/'])
            },
            error: (error) => {
                console.log("Error", error);
            }
        })
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }
}
