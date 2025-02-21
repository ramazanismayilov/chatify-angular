import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(public spinnerService: SpinnerService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.showSpinner()

    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.hideSpinner();
      })
    );
  }
};
