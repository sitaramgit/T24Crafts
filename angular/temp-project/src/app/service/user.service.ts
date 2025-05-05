import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getUserDetails(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateUserDetails(id: number, params: any) {
    return this.http.put(`${this.apiUrl}/${id}`,params);
  }
}
