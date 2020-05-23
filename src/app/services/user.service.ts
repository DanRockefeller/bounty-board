import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUrl: string = 'https://localhost:8000/users/'
  private listUrl: string = 'https://localhost:8000/users/'
  private postUrl: string = 'https://localhost:8000/users/new' //TODO: Change server to make this url better
  private updateUrl: string = 'https://localhost:8000/users/update'

  private searchUrl: string = 'https://localhost:8000/users/search'
  private meUrl: string = 'https://localhost:8000/users/me'

  private httpOptions ={
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  new(email: string, password: string): Observable<User> {
    return this.http
    .post<User>(this.postUrl, {email: email, password: password}, this.httpOptions)
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
