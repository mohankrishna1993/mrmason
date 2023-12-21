import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {

  private timeout: number = 5 * 30 * 1000;
  private lastActivity: number = Date.now();

  private timeoutSubject: Subject<void> = new Subject<void>();

  constructor() {
    // this.initSessionTimeout();
  }

  public initSessionTimeout(): void {
    setTimeout(() => {
      if (Date.now() - this.lastActivity > this.timeout) {
        this.timeoutSubject.next();
      }
    }, 50000);
  }

  public onTimeout(): Observable<void> {
    return this.timeoutSubject.asObservable();
  }

  public onUserActivity(): void {
    this.lastActivity = Date.now();
  }
}
