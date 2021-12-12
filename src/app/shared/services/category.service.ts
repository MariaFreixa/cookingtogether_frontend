import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private urlHeroku: string = "https://cookingtogether01.herokuapp.com/api/auth/";
  private urllocalhost: string = "http://127.0.0.1:8000/api/auth/";

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(this.urllocalhost + 'categories');
  }
}

