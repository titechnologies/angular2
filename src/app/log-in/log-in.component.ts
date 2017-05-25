import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { FacebookService, FacebookLoginResponse,FacebookInitParams, FacebookLoginOptions, FacebookUiResponse, FacebookUiParams } from 'ng2-facebook-sdk';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { AuthService } from "angular2-social-login";

declare var $: any;

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
	@ViewChild(SignUpComponent)	
	public readonly signupModal: SignUpComponent;
	
	public socialSignUp:boolean=false;
	public socialSignUpEmail:boolean=true;
	public socialSignUpGender:boolean=false;
	public invalidEmailAddress:boolean=false;
	public invalidPassword:boolean=false;
	public emailErrorMessage:string;
	public logInErrorMessage: string;
	public passwrdNullMessage:boolean=false;
	public sub:any;
	public fullName;
	public firstName;
	public lastName;
	

	constructor(private localStorageService: LocalStorageService,  public fb: FacebookService, private appService:AppService, private router: Router,private signUpComponent: SignUpComponent, private _auth: AuthService) {
		let fbParams: FacebookInitParams = {
												// local appId: '1572339906128139',
												appId: '497396103983389',
												xfbml: true,
												version: 'v2.8'
						};
		this.fb.init(fbParams);	

	}

  ngOnInit() {
  }
	public visible = false;
	

	public show(): void {
		this.visible = true;
		
		console.log('777777777777777777777777777777777777777777777777777777777')		
	}

	public hide(): void {
		
	}	
	
	cancellogin() {
		this.visible = false;
			// remove values from local storage
		this.localStorageService.set('profilePic', '');
		this.localStorageService.set('firstName', '');
		this.localStorageService.set('lastName', '');
		this.localStorageService.set('userId', '');
		this.localStorageService.set('userEmail', '');
	}
	
	public onFacebookLoginClick() {
		this.fb.login().then(
			(response: FacebookLoginResponse) =>	{
																										
													this.fb.api('/me','get', { access_token:response.authResponse.accessToken, fields: 'id,first_name,last_name,name,gender,email,picture.type(large)'})
														.then((res: any) => {
															console.log(res);
															this.visible = false;
															this.localStorageService.set('firstName',res.first_name);
															this.localStorageService.set('lastName',res.last_name);
															if(!res.email){
																this.socialSignUpEmail	= true;
																//store signup datas for sign up with fb.
																//this.localStorageService.set('email',res.email);																
															}else{
																this.socialSignUpEmail	= false;
															}
															this.localStorageService.set('social_id',res.id);
															var formdata		=	new FormData();
															formdata.append('id',res.id);
															formdata.append('name',res.name);
															if(!res.email){
																formdata.append('email','');
															}else{
																formdata.append('email',res.email);
															}															
															formdata.append('gender',res.gender);
															formdata.append('img_path',res.picture.data.url);
															formdata.append('api',true);
															this.localStorageService.set('gender',res.gender);
															 this.appService.logInWithFb(formdata)
																			.subscribe(	(data) => {		console.log(data)
																										this.localStorageService.set('profilePic',data.filename);
																										if((data.status 	== 	1) && (data.redirect_url == 'dashboard')){
																											this.localStorageService.set('logInStatus', 1);
																											this.localStorageService.set('userId',data.id);
																											this.localStorageService.set('profileCompletionStatus',1);
																											// 2$("#myModal").modal('hide');
																											// 3$("#registerModal").modal('hide');
																											this.router.navigate(	['/dashboard']	);
																										}if((data.status 	== 	1) && (data.redirect_url == 'step2')){
																											this.localStorageService.set('logInStatus', 1);
																											this.localStorageService.set('userId',data.id);
																											// 4$("#myModal").modal('hide');
																											this.localStorageService.set('userEmail',data.email);
																											this.router.navigate(	['/formone']	);
																										}else if((data.status == 1) && (data.redirect_url) == 'register'){
																											// 5$("#myModal").modal('hide');
																											// 6$("#registerModal").modal('show');
																											
																											this.socialSignUp		=	true;
																											if(data.gender == ''){
																												this.socialSignUpGender	=	false;
																											}else{
																												this.socialSignUpGender	=	true;
																											}
																											if(data.email == ''){
																												this.socialSignUpEmail		=	true;
																											}else{
																												this.socialSignUpEmail		=	false;
																											}
																											this.cancellogin() // hide modal
																											console.log('=====before=======')
																											console.log(this.socialSignUpEmail)
																											console.log('=====before=======')
																											this.signupModal.showSignUpModalFbLogIn(this.socialSignUp, this.socialSignUpGender, this.socialSignUpEmail);// call signUp modal																											
																										}
																			},
																			(error: any)						=>	{ console.log(error) })
														 })
													 //.catch(this.handleError);
													},
		  (error: any)						=>	{ console.log(error)  }
		); 
	}
    public emailValidator(value){
		console.log('inside email valdator')
		// this.invalidEmailAddress		=	false;
		console.log(value);
		this.emailErrorMessage	='';
		this.logInErrorMessage	=	'';
		  if (value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
			this.invalidEmailAddress		=	false;
            return null;
            }
			 else {
			this.invalidEmailAddress		=	true;
			setTimeout(function() {
				   this.invalidEmailAddress = false;
				   console.log('this.invalidEmailAddress set time out');
				   console.log(this.invalidEmailAddress);
			}.bind(this), 3000);
            return { 'invalidEmailAddress': true };
        } 

	}
	public onchangeEmail(value){
			this.invalidEmailAddress	=	false;
			this.logInErrorMessage		=	'';
	}
	public validatePassword(value){
		// this.passwordError	=	false
		console.log(value);
		if(value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)){
			this.invalidPassword		=		false;
			return null;
		}else{
			this.invalidPassword		=		true;
			return null;
		}
	}
	public onchangePassword(value){
		this.logInErrorMessage		=	'';
	}
	public onSubmit(s){
		console.log(s);
		//console.log(b);
		if((s.email == null) || (s.email == '')){
			this.invalidEmailAddress		=	true;
			setTimeout(function() {
				   this.invalidEmailAddress = false;
				   console.log('this.invalidEmailAddress set time out');
				   console.log(this.invalidEmailAddress);
			}.bind(this), 1000);
		}else{
			if((s.password == null) || (s.password == '')){
				this.passwrdNullMessage		=	true;
				setTimeout(function() {
				   this.passwrdNullMessage = false;
				   console.log('this.passwrdNullMessage set time out');
				   console.log(this.passwrdNullMessage);
				}.bind(this), 1000);

			}else{
							this.passwrdNullMessage		=	false;
							console.log("%%%%%%%%%%%%%%%%%")
							var formdata		=	new FormData();
							formdata.append('email', 		s.email);
							formdata.append('password', 	s.password);
							formdata.append('api', 	true);
							  
							
								this.appService.logIn(formdata)
								 .subscribe((data) => 	{
															if(data.status == 1){
																 if(data.redirect_url == 'step2'){
																	 this.router.navigate(	['/formone']	);
																	 this.localStorageService.set('userEmail',s.email);
																	 this.localStorageService.set('logInStatus', 1); 
																	 this.localStorageService.set('userId', data.id); // set userId
																	// 1$("#myModal").modal('hide');
																}else{
																	this.localStorageService.set('logInStatus', 1); 
																	this.localStorageService.set('userId', data.id); // set userId
																	this.localStorageService.set('profileCompletionStatus',1);
																	console.log(this.localStorageService.get('logInStatus'));
																	this.router.navigate(	['/dashboard']	);
																	// 2$("#myModal").modal('hide');
																}
															}else if(data.status == 2){
																if(data.message){
																	this.logInErrorMessage		=	data.message;
																}else if(data.validator.email[0]){
																	this.logInErrorMessage		=	data.validator.email[0];
																}
																setTimeout(function() {
																   this.logInErrorMessage = '';
																   console.log('this.logInErrorMessage set time out');
																   console.log(this.logInErrorMessage);
																}.bind(this), 3000);
															}
														},
											(err) => 	{
															console.log(err);
														});
								var formdata		=	new FormData();


			}

		}

		
	}
	signIn(provider){
		if(provider=='linkedin'){
		  var formdata		=	new FormData();
	  console.log(provider);
	  console.log('provider');
      this.sub = this._auth.login(provider).subscribe(
      (data:any) => {
                    console.log("data fro linkedin server");
					console.log(data);
					this.fullName=data.name;
					 this.firstName = this.fullName.split(' ').slice(0, -1).join(' ');
                    this.lastName = this.fullName.split(' ').slice(-1).join(' ');
					this.localStorageService.set('firstName',this.firstName);
					this.localStorageService.set('lastName',this.lastName);
					console.log(this.firstName);
					console.log(this.lastName);
					this.socialSignUp=true;
					if(!data.email){
								this.socialSignUpEmail	= true;
								}else{
								this.localStorageService.set('email',data.email);
								this.socialSignUpEmail	= false;
					}
					
					console.log('&&&&&&&data');
					console.log(data);
					console.log(data.email);
					formdata.append('id',data.uid);
					formdata.append('name',data.name);
					formdata.append('emailAddress',data.email);
					formdata.append('img_path',data.image);
					formdata.append('gender','');
					formdata.append('api',true);
					
                    this.appService.logInWithLinkedIn(formdata)
					.subscribe(	(data) => {
						console.log("linked in data");
						console.log(data);
						this.localStorageService.set('profilePic',data.filename);
						console.log(this.localStorageService.get('profilePic'))
						if((data.status 	== 	1) && (data.redirect_url == 'dashboard')){
							this.localStorageService.set('logInStatus', 1);
							this.localStorageService.set('userId',data.id);
							// 1$("#myModal").modal('hide');
							// 2$("#registerModal").modal('hide');
							this.localStorageService.set('profileCompletionStatus',1)
							this.router.navigate(	['/dashboard']	);															
						}if((data.status 	== 	1) && (data.redirect_url == 'step2')){
							this.localStorageService.set('logInStatus', 1);
							this.localStorageService.set('userId',data.id);
						// 3$("#myModal").modal('hide');
							// 4$("#registerModal").modal('hide');
							this.router.navigate(['/formone']);	
																											
						}else if((data.status == 1) && (data.redirect_url) == 'register'){
							console.log("hhhhhhhhhhhhhhh");
							if(data.email == ''){
									this.socialSignUpEmail		=	true;
							}else{
								this.socialSignUpEmail		=	false;
							}
							if(data.gender == ''){
								this.socialSignUpGender	=	false;
							}else{
								this.socialSignUpGender	=	true;
							}
							this.socialSignUp		=	true;
							this.socialSignUpGender	=	false;
						// 5	$("#myModal").modal('hide');
						// 6	$("#registerModal").modal('show');
							this.cancellogin() // hide moda
							this.signupModal.showSignUpModalFbLogIn(this.socialSignUp, this.socialSignUpGender,this.socialSignUpEmail) // call sign up modal
							
						}																				
					},
				(error: any)						=>	{ console.log(error) })
                }
		)
	}
	else if(provider=='google'){
		 var formdata		=	new FormData();
		console.log("meeeeeeeeeee");
		this.sub = this._auth.login(provider).subscribe(
         (data:any) => {
			 console.log("data from google");
                  console.log(data);
				  	this.fullName=data.name;
					this.firstName = this.fullName.split(' ').slice(0, -1).join(' ');
                    this.lastName = this.fullName.split(' ').slice(-1).join(' ');
					this.localStorageService.set('firstName',this.firstName);
					this.localStorageService.set('lastName',this.lastName);
				
					console.log(this.firstName);
					console.log(this.lastName);
					this.socialSignUp=true;
					if(!data.email){
								this.socialSignUpEmail	= true;
					}
					else{
								this.localStorageService.set('email',data.email);
								this.socialSignUpEmail	= false;
					}
					formdata.append('id',data.uid);
					formdata.append('name',data.name);
					formdata.append('email',data.email);
					formdata.append('img_path',data.image);
					formdata.append('gender','');
					formdata.append('api',true);
					 this.appService.logInWithGoogle(formdata)
					.subscribe(	(data) => {
							console.log("********************");
							console.log(data);	
						this.localStorageService.set('profilePic',data.filename);
						console.log(this.localStorageService.get('profilePic'))
						if((data.status 	== 	1) && (data.redirect_url == 'dashboard')){
							this.localStorageService.set('logInStatus', 1);
							this.localStorageService.set('userId',data.id);
							this.localStorageService.set('profileCompletionStatus',1)
							// 1$("#myModal").modal('hide');
							// 2$("#registerModal").modal('hide');
							this.router.navigate(['/dashboard']);															
						}
						else if((data.status 	== 	1) && (data.redirect_url == 'step2')){
							this.localStorageService.set('logInStatus', 1);
							this.localStorageService.set('userId',data.id);
							// 3$("#myModal").modal('hide');
							// 4$("#registerModal").modal('hide');
							this.router.navigate(['/formone']);	
																											
						}else if((data.status == 1) && (data.redirect_url) == 'register'){
							console.log("hhhhhhhhhhhhhhh");
							// 5$("#myModal").modal('hide');
							// 6$("#registerModal").modal('show');
							if(data.email == ''){
									this.socialSignUpEmail		=	true;
							}else{
								this.socialSignUpEmail		=	false;
							}
							if(data.gender == ''){
								this.socialSignUpGender	=	false;
							}else{
								this.socialSignUpGender	=	true;
							}
							this.socialSignUp		=	true;
							this.socialSignUpGender	=	false;
							this.cancellogin() // hide moda
							this.signupModal.showSignUpModalFbLogIn(this.socialSignUp, this.socialSignUpGender,this.socialSignUpEmail) // call sign up modal					
						}
						else{
							console.log("Error..");
						}																				
					},
				(error: any)						=>	{ console.log(error) })

                }
                )
	}
}

}
