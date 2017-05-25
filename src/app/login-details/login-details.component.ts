import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppService } from './../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.css']
})
export class LoginDetailsComponent implements OnInit {
  public userId:any;
  public user_email:any;
  public new_password:string;
  public confirm_password:string;
  public errLoginMsg:string;
  public errLoginMsgMatch:string;
  constructor(private localStorageService: LocalStorageService, private router: Router,private appService: AppService) { }

  ngOnInit() {
   this.userId=this.localStorageService.get('userId');
   console.log(this.userId);
   this.getUserEmail();

  }


	public editLoginDetails(s){
	  console.log("hw r u?");
	  console.log(s);
	  this.errLoginMsg			=	'';
	  this.errLoginMsgMatch		=	'';
		if(!s.password){
			this.errLoginMsg	=	'Please enter current password';
			setTimeout(function() {
									this.errLoginMsg = '';
									console.log('this.errLoginMsg set time out');
									console.log(this.errLoginMsg);
			}.bind(this), 3000);
		}else{
				if(!s.new_password){
					this.errLoginMsg	=	'Please enter new password';
					setTimeout(function() {
											this.errLoginMsg = '';
											console.log('this.errLoginMsg set time out');
											console.log(this.errLoginMsg);
					}.bind(this), 3000);

				}else{
						  var formdata = new FormData();
						  formdata.append('id', this.userId);
						  formdata.append('email', s.email);
						  formdata.append('password', s.password);
						  formdata.append('new_password', s.new_password);
						  formdata.append('confirm_password', s.confirm_password);
						  formdata.append('api', true);
						  this.appService.editLoginDetails(formdata)
									.subscribe((data) => {
										console.log("****login data*****");
										console.log(data);
										if(data.status==1){
										  this.router.navigate(['/dashboard']);
										  console.log("****status 1*****");
										}else if(data.status==2){
											 if(data.message){              
											  this.errLoginMsg		=	data.message;
												setTimeout(function() {
																	this.errLoginMsg = '';
																	console.log('this.errLoginMsg set time out');
																	console.log(this.errLoginMsg);
												}.bind(this), 3000);
											}
											else if(data.validator.confirm_password[0]){
											  this.errLoginMsgMatch		=	data.validator.confirm_password[0];
											  setTimeout(function() {
																	this.errLoginMsgMatch = '';
																	console.log('this.errLoginMsgMatch set time out');
																	console.log(this.errLoginMsgMatch);
												}.bind(this), 3000);
											  this.new_password		=	'';
											  this.confirm_password		=	'';
											}
										}
									});
				}
		}
	}
  public getUserEmail(){
		
		 var formdata	=	new FormData();
		formdata.append('id',this.userId);
		formdata.append('api',true);
	
    	this.appService.getDashboardDatas(formdata)
						.subscribe( (data) => 	{
												  console.log(data.email);
												  this.user_email=data.email;
												},
									(err) => 	{
													console.log(err);
												}); 
		 //this.user_email = this.localStorageService.get('userEmail');
		 console.log('user_email................')
		 console.log(this.user_email)
	}
}

