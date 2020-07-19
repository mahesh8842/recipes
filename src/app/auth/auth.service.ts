import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


export interface AuthResponseData{
  Kind: string;
  idToken: string;
  email: string;
  refreshToken: string;	
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn:'root'
})
  
export class AuthService { 
  user = new BehaviorSubject<User>(null);
  tokenexpirationTimer: any;

  constructor(private http: HttpClient,private router:Router) { }
  signup(email:string,password:string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),
        tap(resData => {
        this.handleAuthentication(resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn)
        
        })
      );
  }
  login(email:string,password:string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn)
      })
    );
  }

  autoLogin() {
    const UserData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!UserData) {
      return;
    }

    const loadedUser = new User(
      UserData.email,
      UserData.id,
      UserData._token,
      new Date(UserData._tokenExpirationDate)
    );
    if (loadedUser.token) {

      this.user.next(loadedUser);
      const expirationDuration=new Date(UserData._tokenExpirationDate).getTime()-new Date().getTime()
      this.autoLogout(expirationDuration);
    }
  }

  Logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenexpirationTimer) {
      clearTimeout(this.tokenexpirationTimer);
    }
    this.tokenexpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
   this.tokenexpirationTimer= setTimeout(() => {
      this.Logout();
    }, expirationDuration);
    
  }



  private handleAuthentication(email: string,userId:string, token: string, expiresIn: number) {
    const expirationdate=new Date(new Date().getTime() +expiresIn*1000)
    const user = new User(
          email,
          userId,
          token,
          expirationdate
        );
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse)
  {  
    let errorMessage = 'An Unknown Error!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
    switch (errorRes.error.error.message)
    {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Mail is already registered!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = '*Mail Id or Password is incorrect!!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Mail Id or *Password is incorrect!!';
        break;
    }
        return throwError(errorMessage);
  }
}