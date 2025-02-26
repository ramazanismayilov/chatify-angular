import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(params: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/register`, params).pipe(
      tap((response: any) => {
        if (response.token) localStorage.setItem("token", response.token);
      })
    )
  }

  loginWithGoogle(token: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/firebase`, { token })
  }
}
