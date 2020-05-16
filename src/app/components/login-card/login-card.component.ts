import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {
  private email = new Subject<string>();
  private password = new Subject<string>();

  emailMessage$: Observable<string>;
  passwordMessage$: Observable<string>;

  loginMessage: string;
  @Output() hideCard = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.emailMessage$ = this.email.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((email: string) => this.authService.validateEmail(email))
    );
    this.passwordMessage$ = this.password.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((password: string) => this.authService.validatePassword(password))
    );
  }

  logIn(em: string, pw: string): void {
    this.authService.login({email: em, password: pw}).pipe(first()).subscribe(
      data => {
        
      },
      error => {
        if (error.status == 400){
          this.loginMessage = error.error.message;
        }
        else {
          this.loginMessage = "A problem occoured"
          console.log(error)
        }
      }
    );
  }

  checkEmail(email: string): void {
    this.email.next(email)
  }

  checkPassword(password: string): void {
      this.password.next(password)
  }

  createCard(): void {
    this.hideCard.emit()
  }

}
