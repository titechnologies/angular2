import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { FacebookService, FacebookLoginResponse,FacebookInitParams, FacebookLoginOptions, FacebookUiResponse, FacebookUiParams } from 'ng2-facebook-sdk';
import { AuthService } from "angular2-social-login";

declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	public email: string; 
	public socialSignUp:boolean=false;
	public invalidEmailAddress:boolean=false;
	public levelError:boolean=false;
	public institutionName:string;
	public institutionError:boolean=false;	
	public genderType: string;
	public genderError:boolean=false;
	public passwordError:boolean=false;
	public confirmPasswordError:boolean=false;
	public acceptTermsValue: string;
	public termsConditionError:boolean=false;
	public levelvalue: number;
	public socialSignUpEmail:boolean=true;
	public institutionId: number;
	public emailErrorMessage:string;
	public confirmPwdErrorMessage:string;
	public logInErrorMessage: string;
	selectedValue: number;
	public levelId: number;
	public schoolArray = [];
	public items: any;
	public genderTypeVal: number;
	public invalidPassword:boolean=false;
	public socialSignUpGender:boolean=false;
	public sub:any;
	public fullName;
	public firstName;
	public lastName;
	
  constructor(private localStorageService: LocalStorageService, private appService:AppService,  private router: Router,public fb: FacebookService, private _auth: AuthService) {
		let fbParams: FacebookInitParams = {
												//local appId: '1572339906128139',
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
		this.invalidEmailAddress	=	false;
		this.levelError				=	false;
		this.institutionError		=	false;
		this.genderError			=	false;
		this.passwordError			=	false;
		this.confirmPasswordError	=	false;
		this.termsConditionError	=	false;
		this.socialSignUp			=	false;
		this.socialSignUpGender		=	false;
		this.socialSignUpEmail		=	true;
		console.log('8888888888888888888888888888888888888888888')
	}

	public hide(): void {
	
	}

	
	cancelSignUp() {
		this.visible = false;
			// remove values from local storage
		this.localStorageService.set('profilePic', '');
		this.localStorageService.set('firstName', '');
		this.localStorageService.set('lastName', '');
		this.localStorageService.set('userId', '');
		this.localStorageService.set('userEmail', '');
	}
	public onSubmitSignUp(s) {
		console.log(s)
		if((s.email == null) && (!this.socialSignUp)  ){
			this.invalidEmailAddress	=	true;
			setTimeout(function() {
				   this.invalidEmailAddress = false;
				   console.log('this.invalidEmailAddress set time out');
				   console.log(this.invalidEmailAddress);
			}.bind(this), 3000);

		}else{
			console.log(s.email)
				if((!s.level_id) || (s.level_id == 0) ){
					this.levelError		=	true;
					setTimeout(function() {
						this.levelError = false;
						console.log('this.levelError set time out');
						console.log(this.levelError);
					}.bind(this), 3000);


				}else{
							console.log(s.level_id)
							console.log(this.institutionName)
							console.log(this.levelvalue)
						if((!this.institutionName) && ( this.levelvalue < 11 )){
							console.log('>>><<< inside institution errr <<>>>')
							this.institutionError	=	true;
							setTimeout(function() {
								this.institutionError = false;
								console.log('this.institutionError set time out');
								console.log(this.institutionError);
							}.bind(this), 3000);
							
						}else{
							console.log(this.institutionName)
							console.log(this.genderType)
								if((!this.genderType) && (!this.socialSignUp)){
									console.log('........genger type is undefined......')
									this.genderError	=	true;
									setTimeout(function() {
										this.genderError = false;
										console.log('this.genderError set time out');
										console.log(this.genderError);
									}.bind(this), 3000);

								}else{
											if((!s.password) && (!this.socialSignUp)){
												this.passwordError	=	true;
												setTimeout(function() {
													this.passwordError = false;
													console.log('this.passwordError set time out');
													console.log(this.passwordError);
												}.bind(this), 3000);
											}else{
												if((!s.confirm_password) && (!this.socialSignUp)){
													this.confirmPasswordError	=	true;
												}else{
														if(!this.acceptTermsValue){
															this.termsConditionError	=	true;
															setTimeout(function() {
																this.termsConditionError = false;
																console.log('this.termsConditionError set time out');
																console.log(this.termsConditionError);
															}.bind(this), 3000);
														}else{
																console.log('###########')
																var status = 1;
																var formdata = new FormData();
																console.log("***_data for sign up_***");
																console.log(s);
																if(this.socialSignUp){
																	formdata.append('level_id', this.levelvalue);			
																	formdata.append('refer_type', 'Social');
																	if(this.socialSignUpEmail){
																		formdata.append('email', s.email);
																	}else{
																		formdata.append('email', this.localStorageService.get('email'));
																	}

																	formdata.append('gender', this.genderType);
																	formdata.append('institution', this.institutionName);
																	formdata.append('social_id', this.localStorageService.get('social_id'));
																}else{
																	formdata.append('email', s.email);
																	formdata.append('level_id', this.levelvalue);
																	formdata.append('gender', this.genderType);
																	formdata.append('password', s.password);
																	formdata.append('confirm_password', s.confirm_password);
																	formdata.append('institution', this.institutionName);
																}
																formdata.append('terms_conditions', s.acceptTermsValue);

																if (this.levelvalue == 1 || this.levelvalue == 2 || this.levelvalue == 3 ||this.levelvalue == 4 || this.levelvalue == 5) {
																	formdata.append('school_id', this.institutionId);
																	formdata.append('institution', this.institutionName);
																}
																if (this.levelvalue == 6 || this.levelvalue == 7) {
																		formdata.append('college_id', this.institutionId);
																		formdata.append('institution', this.institutionName);				
																}
																if (this.levelvalue == 8) {
																	formdata.append('university_id', this.institutionId);
																}
																if (this.levelvalue == 11) {
																	formdata.append('group_name', s.group_name);
																}
																if (this.levelvalue == 12) {
																	formdata.append('organisation', s.organisation);
																}

																formdata.append('api', true);
																this.appService.signupStepOne(formdata)
																.subscribe((data) => 	{
																							console.log('signup step one >>>>>>>>>>>>>>data');
																							console.log(data)
																							if (data.status == '1') {
																								this.localStorageService.set('userEmail',data.email);
																								this.localStorageService.set('userId',data.id);
																								this.localStorageService.set('logInStatus', 1);
																								console.log("signup successfull");	
																								// 1$("#registerModal").modal('hide');
																								this.router.navigate(['/formone']);
																							}else if(data.status == 2){
																								if(data.validator.email){
																									this.emailErrorMessage	=	data.validator.email[0];
																									console.log('>>>>>>>Email validation')
																									console.log(this.emailErrorMessage);
																									setTimeout(function() {
																									   this.emailErrorMessage = '';
																									   console.log('this.emailErrorMessage set time out');
																									   console.log(this.emailErrorMessage);
																									}.bind(this), 3000);
																								}
																								if(data.validator.confirm_password){
																									this.confirmPwdErrorMessage	=	data.validator.confirm_password[0];
																										console.log('>>>>>>>password validation')
																										console.log(this.confirmPwdErrorMessage)
																										setTimeout(function() {
																											this.confirmPwdErrorMessage = '';
																											console.log('this.confirmPwdErrorMessage set time out');
																											console.log(this.confirmPwdErrorMessage);
																										}.bind(this), 3000);										
																								}
																							}
																						},
																			(error: any)						=>	{ console.error(error)  }
																);



														}

												}

											}							
									
									

								}
							
						}

				}

		} 

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
            return { 'invalidEmailAddress': true };
        } 

	}

	public getlevelId(){
		this.selectedValue = +this.selectedValue;
		console.log(this.selectedValue)
		this.levelError		=	false
        if(this.selectedValue==1){
            this.levelvalue=1;
        }
       else if(this.selectedValue==2){
			this.levelvalue=2;
		}
		else if(this.selectedValue==3){
			this.levelvalue=3;
		}
		else if(this.selectedValue==4){
			this.levelvalue=4;
		}
		else if(this.selectedValue==5){
			this.levelvalue=5;
		}
		
		else if(this.selectedValue==6){
			this.levelvalue=6;
		}
		else if(this.selectedValue==7){
			this.levelvalue=7;
		}
		else if(this.selectedValue==8){
			this.levelvalue=8;
		}
		else if(this.selectedValue==9){
			this.levelvalue=9;
		}
		else if(this.selectedValue==11){
			this.levelvalue=11;
		}
		else if(this.selectedValue==12){
			this.levelvalue=12;
		}
		else if(this.selectedValue==13){
			this.levelvalue=13;
		}
		else if(this.selectedValue==14){
			this.levelvalue=14;
		}

        
    }
    public getSchools(event) {
		let searchCount = event.target.value.length;
		var schoolData = [];
		var levelType;
		levelType = this.levelId;
		var param = { searchtext: event.target.value, levelType: levelType };
		this.schoolArray = [];
		if (searchCount >= 3) {
			console.log('searchCount.....in loop');
			console.log(searchCount);
			this.appService.getSchools(param).subscribe((data) => {
				this.items = data;
				for (var i = 0; i < this.items.length; i++) {
					schoolData.push({ id: this.items[i].id, text: this.items[i].school_name });
				}
				this.schoolArray = schoolData;				
			})
		}

	}
	public getColleges(event) {
		let searchCount = event.target.value.length;
		var schoolData = [];
		var levelType;
		levelType = this.levelId;
		var param = { searchtext: event.target.value, levelType: levelType };
		this.schoolArray = [];
		if (searchCount >= 3) {
			this.appService.getColleges(param).subscribe((data) => {
				this.items = data;
				for (var i = 0; i < this.items.length; i++) {
					schoolData.push({ id: this.items[i].id, text: this.items[i].college_name });
				}
				this.schoolArray = schoolData;				
			})
		}

	}
	public getUniverity(event) {
		let searchCount = event.target.value.length;
		var schoolData = [];
		var levelType;
		levelType = this.levelId;
		var param = { searchtext: event.target.value, levelType: levelType };
		this.schoolArray = [];
		if (searchCount >= 3) {
			this.appService.getUniverity(param).subscribe((data) => {
				this.items = data;
				for (var i = 0; i < this.items.length; i++) {
					schoolData.push({ id: this.items[i].id, text: this.items[i].university_name });
				}
				this.schoolArray = schoolData;
			})
		}

	}
	public selected_institution(value: any): void {
		console.log(value)
		this.institutionError	=	false
		this.institutionId = value.id;
		this.institutionName	= value.text;

	}
	public removed(event){
		console.log('event')
		console.log(event)
		this.institutionName	=	'';
	}
	public getGender(gender) {
		this.genderTypeVal = gender.srcElement.ngValue;
			this.genderError	=	false;
		if (this.genderTypeVal == 1) {
			this.genderType = 'Male';
			console.log(this.genderType)
		}
		if (this.genderTypeVal == 2) {
			this.genderType = 'Female';
			console.log(this.genderType)
		}
	}
	public acceptTerms(w, terms) {
		console.log(w)
		this.termsConditionError	=	false;
		this.acceptTermsValue = w;
		if (w == true) {
			this.acceptTermsValue = 'on';
		}
		else {
			this.acceptTermsValue = '';
		}
	}
	public onchangePassword(value){
		//console.log(value)
			this.passwordError	=	false
			this.confirmPasswordError	=	false
			this.invalidPassword		=		false;
			this.confirmPwdErrorMessage		=		'';
	}
	public onchangeEmail(value){
			this.invalidEmailAddress	=	false;
	}
	public validatePassword(value){
		// this.passwordError	=	false
		console.log(value);
		if(value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)){
			this.invalidPassword		=		false;
			return null;
		}else{
			this.invalidPassword		=		true;
			setTimeout(function() {
					this.invalidPassword = false;
					console.log('this.invalidPassword set time out');
					console.log(this.invalidPassword);
			}.bind(this), 3000);
			return null;
		}
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
																			.subscribe(	(data) => {
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
																											this.visible = true;	 // call signUp modal
																											this.socialSignUp		=	true;
																											if(data.gender == ''){
																												this.socialSignUpGender	=	false;
																											}else{
																												this.socialSignUpGender	=	true;
																											}																											
																										}
																			},
																			(error: any)						=>	{ console.log(error) })
														 })
													 //.catch(this.handleError);
													},
		  (error: any)						=>	{ console.log(error)  }
		); 
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
							//2 $("#registerModal").modal('hide');
							this.localStorageService.set('profileCompletionStatus',1)
							this.router.navigate(	['/dashboard']	);															
						}if((data.status 	== 	1) && (data.redirect_url == 'step2')){
							this.localStorageService.set('logInStatus', 1);
							this.localStorageService.set('userId',data.id);
							// 3$("#myModal").modal('hide');
							//4 $("#registerModal").modal('hide');
							this.router.navigate(['/formone']);	
																											
						}else if((data.status == 1) && (data.redirect_url) == 'register'){
							console.log("hhhhhhhhhhhhhhh");
						//5	$("#myModal").modal('hide');
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
							this.visible = true;	 // call signUp modal
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
							// 1$("#myModal").modal('hide');
							// 2$("#registerModal").modal('hide');
							this.localStorageService.set('profileCompletionStatus',1)
							this.router.navigate(['/dashboard']);															
						}
						else if((data.status 	== 	1) && (data.redirect_url == 'step2')){
							this.localStorageService.set('logInStatus', 1);
							this.localStorageService.set('userId',data.id);
						// 3	$("#myModal").modal('hide');
							// 4 $("#registerModal").modal('hide');
							this.router.navigate(['/formone']);	
																											
						}else if((data.status == 1) && (data.redirect_url) == 'register'){
							console.log("hhhhhhhhhhhhhhh");
							// 5$("#myModal").modal('hide');
						// 6	$("#registerModal").modal('show');
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
							this.visible = true;	// call signUp modal
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

	public showSignUpModalFbLogIn(socialUp, gender, socialSignUpEmaill){

		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<')
		console.log(socialUp)
		console.log(gender)
		console.log(socialSignUpEmaill)
		console.log('=====after=======')
		console.log(socialSignUpEmaill)
		console.log('=====after=======')
		this.visible = true;
		this.socialSignUp	=	socialUp;
		this.socialSignUpGender	=	gender;
		this.socialSignUpEmail	=	socialSignUpEmaill;
	}

}
