import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
declare var $: any;
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements AfterViewInit  {
	ngAfterViewInit() {}
  		 @ViewChild('video') video:ElementRef;
		/*ngAfterViewInit() {
			let _video=this.video.nativeElement;
			if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				navigator.mediaDevices.getUserMedia({ video: true })
				.then(stream => {
					_video.src = window.URL.createObjectURL(stream);
					_video.play();
				})
			}
		} */
	
		public watchVideo(){
			console.log('watch vide...')
			
				let _video=this.video.nativeElement;
					/* if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
						navigator.mediaDevices.getUserMedia({ video: true })
						.then(stream => {
							console.log('.......inside stream....') 
							_video.src = window.URL.createObjectURL(stream);
							_video.play();
						})
					} */
					console.log('.......after inside stream....') 
					$('#watchVideoModal').modal('show'); 
		}
		public closeVideo(){
			console.log('inside close video')
			let _video	=	this.video.nativeElement;
			let src	=	_video.src;
			_video.src	=	'';
			_video.src	=	src;
		}
}
