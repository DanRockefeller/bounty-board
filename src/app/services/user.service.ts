import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, flatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user'
import { Auth } from '../models/auth'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private newUrl: string = 'https://localhost:8000/users/new'
  private updateUrl: string = 'https://localhost:8000/users/update'
  private getUrl: string = 'https://localhost:8000/users/'
  private meUrl: string = 'https://localhost:8000/users/me'
  private searchUrl: string = 'https://localhost:8000/users/search'

  private httpOptions ={
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  new(email: string, password: string): Observable<User> {
    return this.http
    .post<User>(this.newUrl, {email: email, password: password}, this.httpOptions)
    .pipe(
      map(user => {
        return user
      }));
  }

  validateEmail(email: string): string{
    if (!email){
      return "Invalid email";
    }
    else {
      return "";
    }
  }

  validatePassword(password: string): string{
    if (!password){
      return "";
    }
    else {
      return "";
    }
  }

  validateMatchingPassword(password: string, confirmPassword: string): string{
    if (password != confirmPassword){
      return "Passwords do not match";
    }
    else{
      return "";
    }
  }
}
