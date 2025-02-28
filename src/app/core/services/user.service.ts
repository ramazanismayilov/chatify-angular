import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../models/user/user.dto';
import { ProfileUpdateDto } from '../models/user/profile.dto';
import { FollowerDto, FollowingDto } from '../models/user/follow.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getProfile(): Observable<UserDto> {
    return this.http.get<UserDto>(`${environment.baseUrl}/users/profile`)
  }

  profileUpdate(params: ProfileUpdateDto): Observable<ProfileUpdateDto> {
    return this.http.post<ProfileUpdateDto>(`${environment.baseUrl}/users/profile`, params)
  }

  getUserProfile(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${environment.baseUrl}/users/profile/${userId}`)
  }

  getUserFollowers(userId: number): Observable<FollowerDto> {
    return this.http.get<FollowerDto>(`${environment.baseUrl}/users/${userId}/followers`)
  }

  getUserFollowings(userId: number): Observable<FollowingDto> {
    return this.http.get<FollowingDto>(`${environment.baseUrl}/users/${userId}/followings`)
  }
}
