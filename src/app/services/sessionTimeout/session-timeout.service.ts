import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {

  private timeout: number = 5 * 60 * 1000; // Set the timeout duration ( 300 sec)
  private lastActivity: number = Date.now();

  private timeoutSubject: Subject<void> = new Subject<void>();

  constructor() {
    this.initSessionTimeout();
  }

  private initSessionTimeout(): void {
    setInterval(() => {
      if (Date.now() - this.lastActivity > this.timeout) {
        this.timeoutSubject.next();
      }
    }, 1000); // Check every second
  }

  public onTimeout(): Observable<void> {
    return this.timeoutSubject.asObservable();
  }

  public onUserActivity(): void {
    this.lastActivity = Date.now();
  }
}
