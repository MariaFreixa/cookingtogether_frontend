import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComplexityService {

  constructor(private http: HttpClient) {}

  getAllComplexity():Observable<any> {
    return this.http.get(`https://cookingtogether01.herokuapp.com/api/auth/complexity`);
  }
}
