import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-create-user-card',
  templateUrl: './create-user-card.component.html',
  styleUrls: ['./create-user-card.component.css']
})
export class CreateUserCardComponent implements OnInit {
  // private email = new Subject<string>();
  // private password = new BehaviorSubject<string>("");
  // private confirmPassword = new Subject<string>();

  // emailMessage$: Observable<string>;
  //passwordMessage$: Observable<string>;
  //confirmPasswordMessage$: Observable<string>;

  emailMessage: string;
  passwordMessage: string;
  confirmPasswordMessage: string;
  newMessage: string;

  @Output() hideCard = new EventEmitter();


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.emailMessage$ = this.email.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((email: string) => this.userService.validateEmail(email))
    // );
    // this.passwordMessage$ = this.password.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((password: string) => this.userService.validatePassword(password)),
    // );
    // this.confirmPasswordMessage$ = this.confirmPassword.pipe(
    //   debounceTime(300),
    //   switchMap((confirmPassword) => 
    //   this.userService.validateMatchingPassword(confirmPassword, this.password.getValue())),
    // );

  }

  create(em: string, pw: string, co: string): void {
    if (pw == co){
      this.userService.new(em, pw).pipe(first()).subscribe(
        data => {
          this.authService.login({email: em, password: pw}).pipe(first()).subscribe(
            data => {
              this.router.navigate(['/']);
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          if (error.status == 400){
            this.newMessage = error.error.message;
          }
          console.log(error);
        }
      );
    }
    else {
      
    }
  }

  logInCard(): void {
    this.hideCard.emit();
  }

  checkEmail(email: string): void {
    this.emailMessage = this.userService.validateEmail(email);
  }

  checkPassword(password: string, confirmPassword: string): void {
    this.passwordMessage = this.userService.validatePassword(password);
    if (confirmPassword){
      this.confirmPasswordMessage = this.userService.validateMatchingPassword(confirmPassword, password);
    }
  }

  checkConfirmPassword(confirmPassword: string, password: string): void {
    this.confirmPasswordMessage = this.userService.validateMatchingPassword(confirmPassword, password);
}

}
