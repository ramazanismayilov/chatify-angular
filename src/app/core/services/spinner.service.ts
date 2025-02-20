import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  busyRequestCount = 0;

  constructor(private spinner: NgxSpinnerService) { }

  public showSpinner() {
    this.busyRequestCount++;
    this.spinner.show()
  }

  public hideSpinner() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinner.hide()
    }
  }

}
