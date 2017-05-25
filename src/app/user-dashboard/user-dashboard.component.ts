import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';
import { Appsettings } from './../app.settings';
import { FormsModule }   from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx'
import { LocalStorageService } from 'angular-2-local-storage';
declare var $: any;
@Component({
	selector: 'app-user-dashboard',
	templateUrl: './user-dashboard.component.html',
	styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
	public dashboardData:any[] = [];
	public profileImageUrl:string;
	public profilePic:any;
	public bioLength:any;
	public profileBio:any;
	public bioModalVisible:boolean = false;
	
	constructor(private appService: AppService, private localStorageService: LocalStorageService, private route: ActivatedRoute) {

		this.profileImageUrl		=	Appsettings.ProfileImage_URL;
	  if(this.localStorageService.get('profilePic')){
	 				this.profilePic	=	this.localStorageService.get('profilePic');					
	 			}

	}

	ngOnInit() {		
	 

	   if(this.route.data['value'].dashboardData){
			console.log('..........this.route.data.dashboardData............')
			console.log(this.route.data['value'].dashboardData)
			console.log(this.route.data['value'])
			console.log(this.route.data)
			this.localStorageService.set('profileCompletionStatus',this.route.data['value'].dashboardData.completion_status);
			this.dashboardData 		=	this.route.data['value'].dashboardData;													
			this.profilePic			=	this.route.data['value'].dashboardData.profile_pic;
			if(this.profilePic == 'undefined'){
				this.profilePic		=	'';
			}
			this.localStorageService.set('userEmail',this.route.data['value'].dashboardData.email);
			this.bioLength		=	this.route.data['value'].dashboardData.profile_bio.length;
			this.profileBio		=	this.route.data['value'].dashboardData.profile_bio;
			console.log('this.profileBio...........'	)
			console.log(this.profileBio	)
			console.log('.this.profileBio..........'	)
			if(this.profileBio == 'undefined'){
				this.profileBio		=	''; 
			}
		}
	}
	
	

	public showBioModal(){
		this.bioModalVisible	=	true;
	}
	public hideBioModal(){
		this.bioModalVisible	=	false;
	}

}
