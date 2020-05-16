import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newMessage: string;
  createAccount = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.logInIfToken()
  }

  createCard(): void {
    this.createAccount = true;
  }

  logInCard(): void {
    this.createAccount = false;
  }

}
