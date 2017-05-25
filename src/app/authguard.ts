import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(public localStorageService:LocalStorageService, private router: Router){}
  canActivate() {
    // Imaginary method that is supposed to validate an auth token
    // and return a boolean
    var logInStatus			=	this.localStorageService.get('logInStatus');
    if(logInStatus == 1){
		console.log('****** log in status 1*****')
		return true;
	}else{
		console.log('****** log in status not 1 *****')
		this.router.navigate(['/']);
		return false;
	}

    // return tokenExistsAndNotExpired();
  }

}
