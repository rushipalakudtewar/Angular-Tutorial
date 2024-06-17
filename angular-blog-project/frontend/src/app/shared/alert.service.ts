import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private Toast = Swal.mixin({
    toast: true,
    position: 'top',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  constructor() { }

  showSuccess(message: string) {
    this.Toast.fire({
      icon: 'success',
      title: message
    });
  }

  showError(message: string) {
    this.Toast.fire({
      icon: 'error',
      title: message
    });
  }

  showWarning(message: string) {
    this.Toast.fire({
      icon: 'warning',
      title: message
    });
  }

  showInfo(message: string) {
    this.Toast.fire({
      icon: 'info',
      title: message
    });
  }

  showQuestion(message: string) {
    this.Toast.fire({
      icon: 'question',
      title: message
    });
  }
}
