import { Component, ViewContainerRef, OnInit, ViewChild } from '@angular/core';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
		@ViewChild(SignUpComponent)
		
		public readonly signupModal: SignUpComponent;
		public loggedIn:boolean=false;
  constructor( private localStorageService: LocalStorageService) { }
		
  ngOnInit() {
		// get user loggedIn status
		console.log('#### log in status in home page ########')
		console.log(this.localStorageService.get('logInStatus'))
		console.log('#### log in status  in home page ########')
		if(this.localStorageService.get('logInStatus')){
			this.loggedIn	= 	true;
		}else{
			this.loggedIn	=	false;
		}
  }

  


}
