import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { AppService } from './../app.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.css']
})
export class PrivateHeaderComponent implements OnInit {

  constructor(private appService: AppService, private localStorageService: LocalStorageService, private router: Router,public _auth: AuthService,) { }

  ngOnInit() {
  }
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
		this.router.navigate(['/']);
		
		// console.log(this.localStorageService.get('userStatus'))
		/* this._auth.logout().subscribe(
      (data)=>{
				console.log(data);
			},
		(err) =>{ console.log(err)}
    ) */
	}
	
}
