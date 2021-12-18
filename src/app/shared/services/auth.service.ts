import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private urlHeroku: string = "https://cookingtogether01.herokuapp.com/api/auth/";
  private urllocalhost: string = "http://127.0.0.1:8000/api/auth/";

  constructor(private http: HttpClient) { }

  // Registro
  register(user: User): Observable<any> {
    return this.http.post(this.urlHeroku + 'register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.urlHeroku + 'login', user);
  }

  // recuperamos la informacion del perfil de usuario
  profileUser(): Observable<any> {

    return this.http.get(this.urlHeroku + 'user-profile');
  }

  // recuperamos la informacion del perfil de usuario
  updateProfileUser(user: any): Observable<any> {
    return this.http.post(this.urlHeroku + 'update-user-profile', user);
  }

  // recuperamos la imagen avatar del usuario
  getAvatar(id: number): Observable<any> {
    return this.http.get(this.urlHeroku + 'getAvatar'+ id);
  }
}

