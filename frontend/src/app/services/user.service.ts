import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL_API = 'http://localhost:4000/api/users';
  user: User[];

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<User[]>(this.URL_API);
  }
}
