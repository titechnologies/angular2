import { Component, OnInit, ViewChild } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { FormsModule,FormGroup,FormControl,Validators }   from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { AppService } from './../app.service';
import {SelectModule} from 'ng2-select';
import { SelectComponent } from 'ng2-select/select/select';
import { LocalStorageService } from 'angular-2-local-storage';
import {FacebookService, FacebookLoginResponse,FacebookInitParams, FacebookLoginOptions, FacebookUiResponse, FacebookUiParams } from 'ng2-facebook-sdk';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { LogInComponent } from './../log-in/log-in.component';
declare var $: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [Modal]
})
export class HeaderComponent implements OnInit {
	@ViewChild(SignUpComponent)	
	public readonly signupModal: SignUpComponent;
	
	@ViewChild(LogInComponent)		
	public readonly loginModal: LogInComponent;
	
	public loggedIn:boolean=false;
	constructor(private localStorageService: LocalStorageService, private router: Router) {

					
				}

	ngOnInit() {
		// get user loggedIn status
		console.log('#### log in status  ########')
		console.log(this.localStorageService.get('logInStatus'))
		console.log('#### log in status  ########')
		if(this.localStorageService.get('logInStatus')){
			this.loggedIn	= 	true;
		}else{
			this.loggedIn	=	false;
		}
	}
	 // signout

	public signOut(){
		this.localStorageService.set('logInStatus', '');
		this.localStorageService.set('userEmail', '');
		this.localStorageService.set('userId', '');
		this.localStorageService.set('profileCompletionStatus', '');
		this.localStorageService.set('profilePic', '');
		this.localStorageService.set('gender', '');
		this.localStorageService.set('social_id', '');
		this.localStorageService.set('firstName', '');
		this.localStorageService.set('lastName', '');
		this.localStorageService.set('email', '');
		this.loggedIn		=	false;
		this.router.navigate(['/']);
	}
  	
}
