// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FirebaseAuthService } from '.././firebase/firebase-auth.service';
import { FirebaseDBService } from '.././firebase/firebase-db.service';
import { StorageService } from '.././storage/storage.service';
import 'rxjs/add/operator/switchMap';

import { User } from '.././user/user';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})

export class LoginComponent implements OnInit {
  	user: User;

  	constructor(
      public firebaseAuthService: FirebaseAuthService,
      private firebaseDBService: FirebaseDBService,
      private router: Router,
      private storageService: StorageService
    ) {}

  	ngOnInit(): void {
      var storageService = this.storageService;
      var email = storageService.findInLocalStorage('email');
      var password = storageService.findInLocalStorage('password');
      var loginComponent = this;
      // if username or password is null, first time user is logging in
    	this.user = new User();
      if (email != null && password != null) {
        this.user.email = email;
        this.user.password = password;

        this.firebaseDBService.getAdminUser(true, email).then(function(data) {
          if (!data) {
            alert("Invalid user...");
          } else {
            loginComponent.loginUser();
          }
        });
      }
  	};

  	loginUser(): void {
      var router = this.router;
      var storageService = this.storageService;
      var user = this.user;
      this.firebaseAuthService.login(this.user.email, this.user.password)
      .then(function(data) {
        storageService.saveInLocalStorage('email', user.email);
        storageService.saveInLocalStorage('password', user.password);
        router.navigate(['/home']);
      }, function(error) {
        //debugger;
      })
      .catch(function(error) { 
          //debugger;
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  	}
}