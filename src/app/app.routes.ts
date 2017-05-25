import {	Routes	} from '@angular/router';
import {	HomePageComponent	} from './home-page/home-page.component';
import {	WatchComponent	} from './watch/watch.component';
import {	TeachersPageComponent	} from './teachers-page/teachers-page.component';
import {	UserDashboardComponent	} from './user-dashboard/user-dashboard.component';
import {	FormOneComponent	} from './form-one/form-one.component';
import {	FormTwoComponent	} from './form-two/form-two.component';
import {	AuthGuard	} from './authguard';
import {	LoginDetailsComponent } from './login-details/login-details.component';
import { 	TransactionResolver } from './trans.resolver'

export const routes:Routes	=	[
		{ path:'',				component:HomePageComponent 											},
		{ path:'watch',			component:WatchComponent 												}, 
		{ path:'teachers',		component:TeachersPageComponent											},
		{ path:'dashboard',		component:UserDashboardComponent, 		canActivate: [AuthGuard],	resolve: { dashboardData:TransactionResolver }	},  
		{ path:'formone',		component:FormOneComponent, 				canActivate: [AuthGuard],	resolve: { dashboardData:TransactionResolver } 	},
		{ path:'formtwo',		component:FormTwoComponent, 				canActivate: [AuthGuard],	resolve: { dashboardData:TransactionResolver } 	},
		{ path:'login-details',	component:LoginDetailsComponent, 			canActivate: [AuthGuard] 	},

]; 
