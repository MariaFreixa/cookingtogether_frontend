import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private urlHeroku: string = "https://cookingtogether01.herokuapp.com/api/auth/";
  private urllocalhost: string = "http://127.0.0.1:8000/api/auth/";

  private issuer = {
    login: this.urlHeroku + 'login',
    register: this.urlHeroku + 'register'
  }

  constructor() { }

  handleData(data){
    console.log("dentro de handleData: ", data);
    localStorage.setItem('auth_token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  getUser(){
    return localStorage.getItem('user');
  }

  // Verify the token
  isValidToken(){
     const token = this.getToken();

     if(token){
       const payload = this.payload(token);
       if(payload){
         return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
       }
     } else {
        return false;
     }
  }

  payload(token) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}
