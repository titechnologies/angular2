import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { AppService } from './../app.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.css']
})
export class FormTwoComponent implements OnInit {
	public phoneNumber:number;
	public postCode:string;
	public address:boolean = false;
	public AddressArray:any[] = [];
	public fullAddress:string;
	public houseName:string;
	public addressLine2:string;
	public city:string;
	public addressDropdownFlag:boolean=false;
	public id:any;
	public country:any;
	public postCodeError:string;
	public loader:boolean=false;
	constructor(private router:Router, private appService:AppService,  private localStorageService: LocalStorageService,  private route: ActivatedRoute) { }

	ngOnInit() {
				// if(this.localStorageService.get('profileCompletionStatus')!=''){
				//	this.getSignUpFormOneDatas();
				// }
				
				if(this.route.data['value'].dashboardData) {
					console.log('trans resoll.  form two ,...................................');
					console.log(this.route.data['value'].dashboardData);
					if(this.route.data['value'].dashboardData.zip_code){
						this.address			=	true;
						this.phoneNumber		=	this.route.data['value'].dashboardData.ph_no;
						this.postCode			=	this.route.data['value'].dashboardData.zip_code;
						this.houseName			=	this.route.data['value'].dashboardData.address_line_1
						this.addressLine2		=	this.route.data['value'].dashboardData.address_line_2;
						this.city				=	this.route.data['value'].dashboardData.city;
						this.country			=	'UK';
					}
				}
						

				
		this.id 		= 	this.localStorageService.get('userId');

	}
	public signupcomplete(s){
		if(!s.zip_code){
			this.postCodeError		=	'Please enter the  valid post code !';
			this.AddressArray	=	null;
			this.fullAddress	=	'';
			this.houseName		=	'';
			this.addressLine2	=	'';
			this.city			=	'';
			this.country		=	'';
			this.postCode		=	'';
			this.addressDropdownFlag = false;

		}else{
			var formdata	=	new FormData();
			formdata.append('fulladdress',			this.fullAddress);
			formdata.append('ph_no',				s.ph_no);
			formdata.append('zip_code',				s.zip_code);
			formdata.append('address_line_1',		s.address_line_1);
			formdata.append('address_line_2',		s.address_line_2);
			formdata.append('city',					s.city);
			formdata.append('country',				s.country);
			formdata.append('api',					true);
			formdata.append('id',					this.id);
			
			 this.appService.saveSignUpFormTwoDatas(formdata)
						.subscribe((data) => 	{
													this.router.navigate(	['/dashboard']	);
												},
									(err) => 	{
													console.log(err);
												}
						);
		}
	}
	public getAddress(){
		this.loader		=	true;
		this.address	=	true;
		this.addressDropdownFlag	=	true;
		this.postCodeError			=	'';
		 this.appService.getAddress(this.postCode)
			 .subscribe((data) =>	{
										this.AddressArray	=	data.Addresses;
										
										// for(var i=0; i< this.AddressArray.length; i++){
												this.AddressArray.filter(function(el) {
															 for(var k=0; k<5; k++){
																if(el[k] == ''){
																	el.splice(k, 1);
																	
																}
															}
														});
										// }
										this.loader		=	false;
									},
						(err) => 	{
										console.log(err);
										this.postCodeError	=	'Please enter the  valid post code !';
										setTimeout(function() {
											this.postCodeError = '';
											console.log('this.postCodeError set time out');
											console.log(this.postCodeError);
										}.bind(this), 3000);
										this.AddressArray	=	null;
										this.fullAddress	=	'';
										this.houseName		=	'';
										this.addressLine2	=	'';
										this.city			=	'';
										this.country		=	'';
										this.postCode		=	'';
										this.addressDropdownFlag 	= 	false;
										this.loader					=	false;
									},	
			) 			
	}
	public selectAddress(event){
		var partsOfStr = event.target.textContent.split(',');
		this.fullAddress	=	event.target.textContent;
		this.houseName		=	partsOfStr[0];
		this.addressLine2	=	partsOfStr[1] +','+ partsOfStr[2];
		this.city			=	partsOfStr[3];
		this.country		=	'UK'		;
		this.postCodeError	=	'';
		this.addressDropdownFlag	=	false;
	}

	
	public clearErrorMessage(event){
		this.postCodeError		=	'';
	}

}
