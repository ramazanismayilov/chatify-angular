import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/core/models/user/user.dto';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    standalone: false
})
export class ProfileComponent implements OnInit {
    userProfile!: UserDto
    isDropdownOpen = false;
    constructor(private userService: UserService) { }

    ngOnInit() {
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

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      }
}
