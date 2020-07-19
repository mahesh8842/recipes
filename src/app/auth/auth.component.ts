import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error :string= null;

  constructor(private authservice: AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }
  onswitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onsubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs=this.authservice.login(email, password);
    }
    else {
      authObs=this.authservice.signup(email, password); 
    }
    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
        this.isLoading = false;
      })
    form.reset();
  }
  onHandleError() {
    this.error = null;
  }
}
