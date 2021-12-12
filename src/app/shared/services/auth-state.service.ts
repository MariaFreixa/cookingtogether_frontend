import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthStateService {

  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn());
  userAuthState = this.userState.asObservable();

  constructor(public token: TokenService, public auth: AuthService) {}

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}