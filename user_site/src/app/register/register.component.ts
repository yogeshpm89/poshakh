// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FirebaseAuthService } from '.././firebase/firebase-auth.service';
import 'rxjs/add/operator/switchMap';

import { User } from '.././user/user';

@Component({
	moduleId: module.id,
	selector: 'register',
	templateUrl: './register.component.html'
})

export class RegisterComponent {
  	user: User;

  	constructor(
        public firebaseAuthService: FirebaseAuthService,
        private router: Router
    ) {}

  	ngOnInit(): void {
    	this.user = new User();
    	this.user.email = "yogeshpm8910@gmail.com";
    	this.user.firstName = "Yogesh";
    	this.user.lastName = "Murdeshwar";
    	this.user.mobile = "8329058082";
    	this.user.birthDate = "12/30/1987";
    	this.user.password = "test12345";
    	this.user.confirmPassword = "test12345";
  	};

  	registerUser(): void {
      var router = this.router;
      this.firebaseAuthService.register(this.user.email, this.user.password)
      .then(function(data) {
        router.navigate(['/login']);
      }, function(error) {
        debugger;
      })
      .catch(function(error) { 
          debugger;
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  	}
}