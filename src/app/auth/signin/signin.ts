import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../core/services/app.service';
import { toggleAnimation } from 'src/app/shared/animations/toggle.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoginResponseDto } from 'src/app/core/models/auth/login.dto';

@Component({
    templateUrl: './signin.html',
    animations: [toggleAnimation],
    standalone: false
})
export class SigninComponent {
    store: any;
    signInForm!: FormGroup

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
        console.log(this.store);
        
    }

    ngOnInit() {
        this.signInForm = this.fb.group({
            password: ["", [Validators.required, Validators.minLength(6)]],
            username: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
        })
    }

    signIn() {
        this.authService.signIn(this.signInForm.value).subscribe({
            next: (response: LoginResponseDto) => {
                this.notificationService.showMessage(response.message, 'success', 'top')
                this.router.navigate(['/'])
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
