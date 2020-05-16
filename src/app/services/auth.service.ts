import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Auth } from '../models/auth'
import { Token } from '../models/token'
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export const JWT_TOKEN_NAME: string = 'jwt_token';
export const REFRESH_TOKEN_NAME: string = 'refresh_token'
export const TOKEN_EXP: string = 'token_exp'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private authUrl: string = 'https://localhost:8000/auth/authenticate';
  private refreshUrl: string = 'https://localhost:8000/auth/refresh';
  private httpOptions ={
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getToken(): string {
    return localStorage.getItem(JWT_TOKEN_NAME);
  }

  setToken(token: Token): void {
    localStorage.setItem(JWT_TOKEN_NAME, token.accessToken);
    localStorage.setItem(REFRESH_TOKEN_NAME, token.refreshToken);
    localStorage.setItem(TOKEN_EXP, token.accessTokenExpiration);
  }

  logInIfToken(): void {
    if(!this.isTokenExpired()){
      this.loggedIn.next(true);
      this.router.navigate(['/'])
    }
  }

  getTokenExpirationDate(token: string): Date{
    const expString = localStorage.getItem(TOKEN_EXP)
    const expDate = Date.parse(expString)
    if (expDate === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(expDate);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;
    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return true;
    return !(date.valueOf() > new Date().valueOf());
  }

  //      catchError(this.handleError<Token>('login')),
  login(auth: Auth): Observable<Token> {
    return this.http
    .post<Token>(this.authUrl, auth, this.httpOptions)
    .pipe(
      map(token => {
        this.setToken(token)
        this.loggedIn.next(true);
        this.router.navigate(['/']);
        return token;
      }));
  }

  logout() {
    localStorage.removeItem(JWT_TOKEN_NAME)
    localStorage.removeItem(REFRESH_TOKEN_NAME)
    this.loggedIn.next(false);
    this.router.navigate(['/login'])
  }

  //TODO: validate better
  validateEmail(email: string): Observable<string> {
    if (!email){
      return of("Email required");
    }
    else {
      return of("")
    }
  }

  //TODO: validate better
  validatePassword(password: string): Observable<string>{
    if(!password){
      return of("Password required");
    }
    else {
      return of("")
    }
  }

    /** Log a message with the MessageService */
    private log(message: string) {
      //this.messageService.add(`HeroService: ${message}`);
      // TODO: Add log to message service
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
