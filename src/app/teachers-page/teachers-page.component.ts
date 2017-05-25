import { Component, OnInit, ViewChild } from '@angular/core';
import { SignUpComponent } from './../sign-up/sign-up.component';
@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.css']
})
export class TeachersPageComponent implements OnInit {
		@ViewChild(SignUpComponent)
		
		public readonly signupModal: SignUpComponent;


  constructor() { }

  ngOnInit() {
  }

}
