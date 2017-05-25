import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { AppService } from './../app.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Appsettings } from './../app.settings';
@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.css']
})
export class FormOneComponent implements OnInit {
	public itemPhoto:any;
	public fileAppendFlag:boolean = false;
	public file:any;
	public firstName:any;
	public lastName:any;
	public bio:string;
	public email:any;
	public emailSecond:string;
	public profileImageflag:boolean=false;
	public dobFlag:boolean=false;
	public dateOfBirth:any;
	public showProfileImage:number;
	public showDob:number;
	public showPrimaryEmail:number;
	public showSecondaryEmail:number;
	public id:any;
	public dashboardData:any;
	public profileImageCheckbx:boolean=false;;
	public dobCheckbx:boolean=false;;
	public primaryEmailCheckbx:boolean=false;;
	public secondEmailCheckbx:boolean=false;;
	public formOneData:any;
	public profileImageUrl:string;
	public profilePic:any;
	public firstNameError:string;
	public lastNameError:string;
	public dobError:string;
	public secondaryEmailError:string;
	public today:any = new Date();
	public currentYear:any= this.today.getFullYear();
	public currentMonth:any= this.today.getMonth();
	public currentDay:any= this.today.getDate();
	private myDatePickerOptions: IMyOptions = {
 
        dateFormat: 'dd/mm/yyyy',
        disableSince: {year: this.currentYear, month: this.currentMonth + 1, day: this.currentDay + 1},
        selectionTxtFontSize : '14px',
        inline: false,     
        
    };
    private mydate:Object;
    private mydateNew:Object;
    private profileBio:any;
	public yearErrMessage:boolean=false;
   // private mydate:any = {date: {year: 2018, month: 10, day: 9}};
   
	constructor(private router:Router, private sanitizer: DomSanitizer, private appService: AppService, private localStorageService: LocalStorageService,  private route: ActivatedRoute) { }

	ngOnInit() {
		
				this.firstName=this.localStorageService.get('firstName');
				this.lastName=this.localStorageService.get('lastName');
				
				this.email	 	= 	this.localStorageService.get('userEmail');
				this.id 		= 	this.localStorageService.get('userId');
				
				this.profileImageUrl		=	Appsettings.ProfileImage_URL;
				if(this.localStorageService.get('profilePic')){
					this.profilePic	=	this.localStorageService.get('profilePic');
					this.profileImageflag = true;				
				}
				//if(this.localStorageService.get('profileCompletionStatus')){
				//	this.getSignUpFormOneDatas();
				//}
				if(this.route.data['value'].dashboardData) {
					this.formOneData			=			this.route.data['value'].dashboardData;
					this.profilePic				=			this.route.data['value'].dashboardData.profile_pic;
					if(this.profilePic == 'undefined'){
						this.profilePic		=	'';
					}
					if(this.route.data['value'].dashboardData.first_name){
						this.firstName				=			this.route.data['value'].dashboardData.first_name;
					}
					
					if(this.route.data['value'].dashboardData.first_name){
						this.lastName				=			this.route.data['value'].dashboardData.last_name;
					}
					this.profileBio				=			this.route.data['value'].dashboardData.profile_bio;
					if(this.route.data['value'].dashboardData.dob){
						console.log('data.dob');
						console.log(this.route.data['value'].dashboardData.dob);
						var date: Date 			= 			new Date(this.route.data['value'].dashboardData.dob);
						console.log(date);											
						this.mydate 			= 			{ date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } }
						this.dateOfBirth	=				this.mydate['date']['year']+this.mydate['date']['month']+this.mydate['date']['day'];
					}
					if(this.route.data['value'].dashboardData.birthdate_show_status == 1){
						this.dobCheckbx			=			true;
						this.dobFlag			=			true; // for dob chkbx
					}
					this.bio					=			this.route.data['value'].dashboardData.profile_bio;
					if(this.bio == 'undefined'){
						this.bio		=	''; 
					}
					this.email					=			this.route.data['value'].dashboardData.email;											
					if(this.route.data['value'].dashboardData.primary_email_show_status){
						this.primaryEmailCheckbx			=			true;
					}
					this.emailSecond			=			this.route.data['value'].dashboardData.secondary_email;
					if(this.route.data['value'].dashboardData.secondary_email_show_status){
						this.secondEmailCheckbx				=			true;
					}
					if(this.route.data['value'].dashboardData.profile_pic_show_status == 1){
						this.profileImageCheckbx			=	true;
						this.profileImageflag				=	true; // for profileImg chkbx
					}
					this.file					=			this.route.data['value'].dashboardData.profile_pic;
				}


	}
	public updateProfileImageOptions(value, event){
		this.showProfileImage		=	event.target.value;
	}
	public updateDobOptions(value, event){
		this.showDob				=	event.target.value;
	}
	public updateprimaryEmailOptions(value, event){
		this.showPrimaryEmail		=	event.target.value;
	}
	public updateSecondEmailOptions(value, event){
		this.showSecondaryEmail		=	event.target.value;
	}
	public saveSignUpFormOneDatas(s){
		console.log(s)
		
		//console.log(this.mydate[{date}])
		
		if(!s.first_name){
			this.firstNameError		=	'First name required';
			setTimeout(function() {
				this.firstNameError = '';
				console.log('this.firstNameError set time out');
				console.log(this.firstNameError);
			}.bind(this), 3000);

		}else{
				if(!s.last_name){
					this.lastNameError		=	'Last name required';
					setTimeout(function() {
						this.lastNameError = '';
						console.log('this.lastNameError set time out');
						console.log(this.lastNameError);
					}.bind(this), 3000);
				}else{
						console.log('in third else')
						if(!this.dateOfBirth){
								if(this.yearErrMessage){
								
								}else{
									this.dobError		=	'Date of birth required';
									setTimeout(function() {
										this.dobError = '';
										console.log('this.dobError set time out');
										console.log(this.dobError);
									}.bind(this), 3000); 
								}
						}else{
								console.log('in else')
								console.log(this.dateOfBirth)
								//if(this.)

								//this.dateOfBirth	=	this.mydate['date']['day']+this.mydate['date']['month']+this.mydate['date']['year'];

								let fd	=	new FormData();
								fd.append('first_name', 				this.firstName);
								fd.append('last_name',  				this.lastName);
								fd.append('dob',  						this.dateOfBirth);
								fd.append('birthdate_show_status',  	this.showDob);
								fd.append('profile_bio',				this.bio);
								fd.append('email',						this.email);
								fd.append('primary_email_show_status',	this.showPrimaryEmail);
								if(!this.emailSecond){
									this.emailSecond			=	'';
									console.log('this.emailSecond...')
									console.log(this.emailSecond)
									console.log('this.emailSecond...')
								}
								fd.append('secondary_email',			this.emailSecond);
								fd.append('secondary_email_show_status',this.showSecondaryEmail);
								fd.append('profile_pic_show_status',  	this.showProfileImage);
								fd.append('api',  						true);
								fd.append('id',  						this.id );
								fd.append('profilePic',					this.file);
								fd.append('imageName',					this.profilePic);


								 this.appService.saveSignUpFormOneDatas(fd)
												.subscribe(	(data) => 	{
																			console.log(data)
																			if(data.status == '1'){
																				 this.router.navigate(	['/formtwo']	);
																				this.localStorageService.set('userEmail', '');
																				this.localStorageService.set('profileCompletionStatus',1); // to get data when redirect url
																			}else if(data.status == 2){
																				console.log('status 2');
																				console.log(data.validator.secondary_email[0]);
																				this.secondaryEmailError	=	data.validator.secondary_email[0];
																				setTimeout(function() {
																					this.secondaryEmailError = '';
																					console.log('this.secondaryEmailError set time out');
																					console.log(this.secondaryEmailError);
																				}.bind(this), 3000);
																			}
																		},
															(err) => 	{
																				console.log(err);
																		});

							}

						}

				}

		
	}	

	public fileChange(event) {
		console.log(event.target);
			let fileList: FileList = event.target.files;
				if(fileList.length > 0) {
					let file: File = fileList[0];
					this.file		=	file;
					// this.formData.append('uploadFile', file);
					this.fileAppendFlag = true;
					this.itemPhoto =  this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
					this.profileImageflag	=	true;
				} 
	}
	public onDateChanged(event: IMyDateModel) {
			this.dobError		=	'';
			console.log(event.formatted);
			console.log('//event')
			console.log(event['date']['year']); // selected year
			//get current year
			var today = new Date();
			var currentYear = today.getFullYear();
			if(currentYear < event['date']['year']){
				event.formatted			=	'';
				this.yearErrMessage		=	true;
				 this.dateOfBirth		=	'';
				// this.mydate				=	'';
			}else{
				this.yearErrMessage		=	false;
				this.dateOfBirth	=	event.formatted.split('/').reverse().join('/');
				console.log('this.dob.........')
				console.log(this.dateOfBirth)
				this.dobFlag		=	true;
			}
			

    }


	public onNameChange(value){
		console.log(value);
		this.firstNameError		=	'';
		this.lastNameError		=	'';
	}
	
	public secondaryEmailOnChange(value){
		console.log(value);
		this.secondaryEmailError	=	'';
	}
	   

}
