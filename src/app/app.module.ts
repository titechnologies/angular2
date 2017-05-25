 import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {SelectModule} from 'ng2-select';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
//import module for route
import { RouterModule,Routes} from '@angular/router';
import { routes } from './app.routes';
import { WatchComponent } from './watch/watch.component';
import { TeachersPageComponent } from './teachers-page/teachers-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PrivateHeaderComponent } from './private-header/private-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormOneComponent } from './form-one/form-one.component';
import { FormTwoComponent } from './form-two/form-two.component';
import { AppService } from './app.service';
// import { DatePickerModule } from 'ng2-datepicker'; // date picker

import { MyDatePickerModule } from 'mydatepicker';
import {	AuthGuard	} from './authguard';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { TransactionResolver } from './trans.resolver';
import { Angular2SocialLoginModule,AuthService } from "angular2-social-login";
import { FacebookService } from 'ng2-facebook-sdk';
import { TruncatePipe } from './truncate.pipe';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';

 let providers = {    
   
    /* "facebook": {
      "clientId": "497396103983389",
      "apiVersion": "v2.8"
    }, */
     "linkedin": {
      "clientId": "81u9o2gxidoe0o"
    }, 
    "google": {
      "clientId": "380364341184-nsrd9645b6jlkb7theb1r47u6emff6k9.apps.googleusercontent.com"
    }
  };

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		WatchComponent,
		TeachersPageComponent,
		HeaderComponent,
		FooterComponent,
		UserDashboardComponent,
		PrivateHeaderComponent,
		FormOneComponent,
		FormTwoComponent,
		LoginDetailsComponent,
		TruncatePipe,
		SignUpComponent,
		LogInComponent
	 ],
	    imports: [
	    
		SelectModule,
		BrowserModule,
		
		FormsModule,
		HttpModule,
		MyDatePickerModule,
		ModalModule.forRoot(),
		BootstrapModalModule,
		RouterModule.forRoot(routes, { 
		 useHash: false
		}),
		LocalStorageModule.withConfig({
				prefix: 'my-app',
				storageType: 'localStorage' 
			}),
	  

 
	],    
	schemas: [ NO_ERRORS_SCHEMA ],
        providers: [AppService,AuthGuard,FacebookService, TransactionResolver,AuthService,SignUpComponent], 
         bootstrap: [AppComponent]               
})
export class AppModule {
    constructor() {
        
    }
}
Angular2SocialLoginModule.initWithProviders(providers);

