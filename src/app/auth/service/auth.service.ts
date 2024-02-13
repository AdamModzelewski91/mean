import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AuthData } from '../auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = signal<string>('');

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token();
  }

  createUser(credentials: AuthData) {
    this.http.post("http://localhost:3000/user/signup", credentials)
      .subscribe(response => {
        console.log(response)
      })
  }

  login(credentials: AuthData) {
    this.http.post<{token: string}>("http://localhost:3000/user/login", credentials)
      .subscribe(response => {
        this.token.set(response.token)
      })
  }
}
