import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private notificationService: NotificationService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    req = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token ? token : ''}`)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    });

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status == 401 || err.status == 403) {
          this.notificationService.showMessage(err.message, 'error', 'top')
          localStorage.removeItem('token');
          this.router.navigate(['/auth/signin']);
        }
        if (err.error.message) {
          this.notificationService.showMessage(err.error.message, 'error', 'top')
        }
        throw err;
      }),
    );
  }
}
