import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../core/services/app.service';
import { toggleAnimation } from 'src/app/shared/animations/toggle.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { cleanFormData } from 'src/app/shared/utils/clean-formdata.utils';

@Component({
    templateUrl: './signup.html',
    animations: [toggleAnimation],
    standalone: false
})
export class SignupComponent implements OnInit {
    store: any;
    signUpForm!: FormGroup
    usernameSuggestions: string[] = []

    constructor(
        public router: Router,
        private fb: FormBuilder,
        public storeData: Store<any>,
        private appSetting: AppService,
        private authService: AuthService,
        public translate: TranslateService,
        private notificationService: NotificationService,
    ) {
        this.initStore();
    }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            email: [null, [Validators.email]],
            phone: [null, [Validators.minLength(6), Validators.maxLength(15)]],
            password: ["", [Validators.required, Validators.minLength(6)]],
            username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
            fullName: [null, [Validators.minLength(4), Validators.maxLength(20)]]
        })
    }

    signUp() {
        const cleanedFormValue = cleanFormData(this.signUpForm.value);
        this.authService.signUp(cleanedFormValue).subscribe({
            next: (response) => {
                this.notificationService.showMessage(response.message, 'success', 'top')
                this.router.navigate(['/'])
            },
            error: (error) => {
                if (error.error.suggestions) {
                    this.usernameSuggestions = error.error.suggestions
                }
                this.notificationService.showMessage(error.error.message, 'error', 'top');
            }
        })
    }

    onSuggestionClick(suggestion: string) {
        this.signUpForm.get('username')?.patchValue(suggestion);
        this.usernameSuggestions = [];
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
