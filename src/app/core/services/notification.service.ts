import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private async showAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    time: number
  ): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: false,
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
    });
    return result.isConfirmed;
  }

  success(title: string, text: string, time = 2500): Promise<boolean> {
    return this.showAlert(title, text, "success", time);
  }

  error(title: string, text: string, time = 2500): Promise<boolean> {
    return this.showAlert(title, text, "error", time);
  }

  warning(title: string, text: string, time = 2500): Promise<boolean> {
    return this.showAlert(title, text, "warning", time);
  }

  info(title: string, text: string, time = 2500): Promise<boolean> {
    return this.showAlert(title, text, "info", time);
  }

  question(title: string, text: string, time = 2500): Promise<boolean> {
    return this.showAlert(title, text, "question", time);
  }

  showMessage(message: string, status: string, position: SweetAlertPosition, duration: number = 2500) {
    const toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: duration,
      width: 'auto',
      customClass: {
        popup: `color-${status}`
      },
    });

    toast.fire({
      title: message,
    });
  }
}
