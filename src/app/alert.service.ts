import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  showSuccess(message: string): void {
    alert(`Success: ${message}`);
  }
  showWarning(message: string): void {
    alert(`Warning: ${message}`);
  }
}
