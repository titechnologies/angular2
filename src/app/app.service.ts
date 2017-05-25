import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/Rx';
import { Appsettings } from './app.settings';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

	constructor(private http: Http) { }
	
    // Function for login
	public logIn(param){
		return this.http.post(Appsettings.API_URL+'login',param,{headers:this.getHeaders()})
						.map(	(response) => {
												var string			=	response.text();
												var parseString		=	JSON.parse(string);
												return parseString
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	
	private getHeaders(){
		let headers = new Headers();
		headers.append("Access-Control-Allow-Origin", "*");
		headers.append("Access-Control-Allow-Credentials", "true");
		headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		// headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
		headers.append("Access-Control-Allow-Headers", "*");
		return headers;
	}

	// Function for signup step two
	public saveSignUpFormOneDatas(param){
		return this.http.post(Appsettings.API_URL+'registration/step2',param,{headers:this.getHeaders()})
						.map(	(response) => {
												var string			=	response.text();
												var parseString		=	JSON.parse(string);
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	// Function for get address
	public getAddress(postCode){
		//var key		=	'95rpeuNDGU67eSKANUiLmw7981';
		// var key		=	'PuNRZenLNkuTBtTn5xCzYQ8070';
		var key		=	'jLbqWvgFPEagwmUO3Q2COw8200';
		return this.http.get("https://api.getaddress.io/v2/uk/"+postCode+"?api-key="+key+"&format=true",{headers:this.getHeaders()})
						.map((response) => {
												var string			=	response.text();
												var parseString		=	JSON.parse(string);
												return parseString;
												
											}
							)
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	// Function for signup step three
	public saveSignUpFormTwoDatas(param){		
		return this.http.post(Appsettings.API_URL+'registration/step3',param,{headers:this.getHeaders()})
						.map((response) => {
												console.log(response)
												
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	// Function for get schools
	public getSchools(param) {
		var searchText = param.searchtext;
		return this.http.get(Appsettings.API_URL+'schoolssearch?search_data='+searchText,{headers:this.getHeaders()})
						.map(	(res) =>	{
												var string	=	res.text();
												var parseString		=	JSON.parse(string);
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	// Function for get colleges
	public getColleges(param) {
		var searchText = param.searchtext;
		return this.http.get(Appsettings.API_URL+'collegessearch?search_data='+searchText,{headers:this.getHeaders()})
						.map(	(res) =>	{										
												var string	=	res.text();
												var parseString		=	JSON.parse(string);										
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
		
	}
	// Function for get universities
	public getUniverity(param) {
		var searchText=param.searchtext;
		return this.http.get(Appsettings.API_URL+'universitysearch?search_data='+searchText,{headers:this.getHeaders()})
						.map(	(res) =>	{
												var string	=	res.text();
												var parseString		=	JSON.parse(string);										
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	
	// Function for signup step one
	public signupStepOne(param){
		return this.http.post(Appsettings.API_URL+'registration',param,{headers:this.getHeaders()})
						.map(	(res) =>	{
												console.log(res);
												var string	=	res.text();
												var parseString		=	JSON.parse(string);
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR...sss...') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	// Function for get dashboard datas
	public getDashboardDatas(param){		
		return this.http.post(Appsettings.API_URL+'user/dashboard',param,{headers:this.getHeaders()})
						.map(	(res) =>{
											var string	=	res.text();
											var parseString		=	JSON.parse(string);
											return parseString.profile_details;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	// Function for edit login credential
	public editLoginDetails(param){
		return this.http.post(Appsettings.API_URL+'user/logindetails',param,{headers:this.getHeaders()})
						.map(	(res) =>	{										
												var string	=	res.text();
												var parseString		=	JSON.parse(string);
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}


	// Function for login with facebook
	public logInWithFb(param){
		return this.http.post(Appsettings.API_URL+'facebook_callback', param,{headers:this.getHeaders()})
						.map(	(res) =>	{
												var string			=	res.text();
												var parseString		=	JSON.parse(string);
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	public logInWithLinkedIn(param){
		return this.http.post(Appsettings.API_URL+'linkedin_callback', param,{headers:this.getHeaders()})
						.map(	(res) =>	{
												var string			=	res.text();
												var parseString		=	JSON.parse(string);
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}
	
		public logInWithGoogle(param){
		
			return this.http.post(Appsettings.API_URL+'google_callback', param,{headers:this.getHeaders()})
						.map(	(res) =>	{
												var string			=	res.text();
												var parseString		=	JSON.parse(string);
												
												console.log(parseString);
												return parseString;
						})
						.catch((error: any) => { console.log('inside ERRRRR......') ; console.log(error) ;return Observable.throw(error.statusText);});
	}

	
}
