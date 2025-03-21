import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    standalone: false
})
export class ProfileComponent implements OnInit {
    userProfile!: any
    updateProfileForm!: FormGroup
    isDropdownOpen = false;
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private notificationService: NotificationService,
    ) { }

    ngOnInit() {
        this.updateProfileForm = this.fb.group({
            fullName: [''],
            bio: [''],
            imageId: [''],
            isPrivate: [false],
        })
        this.getProfile()
    }

    getProfile() {
        this.userService.getProfile().subscribe({
            next: (response) => {
                this.userProfile = response
                console.log(response);
            }
        })
    }

    profileUpdate() {
        this.userService.profileUpdate(this.updateProfileForm.value).subscribe({
            next: (response) => {
                this.notificationService.showMessage(response.message, 'success', 'top')
                this.getProfile()
            }
        })
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }
}
