// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FirebaseAuthService } from '.././firebase/firebase-auth.service';
import 'rxjs/add/operator/switchMap';

@Component({
	moduleId: module.id,
	selector: 'home',
	templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})

export class HomeComponent implements OnInit {

  	constructor(public firebaseAuthService: FirebaseAuthService) {}

  	ngOnInit(): void {
    	
  	};
}