import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppService } from './app.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class TransactionResolver implements Resolve<any> {
	public dashboardData:any[] = [];
	public profilePic:any;
	
  constructor(
    private appService: AppService,
    private localStorageService: LocalStorageService
  ) {}

	resolve(route: ActivatedRouteSnapshot) {
			console.log('profileCompletionStatus outside resolver')
		if(this.localStorageService.get('profileCompletionStatus')){
			console.log('profileCompletionStatus inside resolver')
			console.log(this.localStorageService.get('profileCompletionStatus'))
			let userId		=	this.localStorageService.get('userId');
			var formdata	=	new FormData();
			formdata.append('id',userId);
			formdata.append('api',true);
			return this.appService.getDashboardDatas(formdata); 
		}
	}
	
}
