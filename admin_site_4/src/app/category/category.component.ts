// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, 
		FormGroup, Validators }     from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Observable }        		from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';


import { FirebaseAuthService } from '.././firebase/firebase-auth.service';
import { FirebaseDBService } from '.././firebase/firebase-db.service';
import { Category } from '.././category/category';


@Component({
	moduleId: module.id,
	selector: 'category',
	templateUrl: './category.component.html',
  	styleUrls: [ './category.component.css' ]
})

export class CategoryComponent implements OnInit {
	categories: Category[];
	categoryForm: FormGroup;
	showAddForm = false;
	blockCategoryGrid = false;
  	constructor(
  		private formBuilder: FormBuilder,
  		private firebaseAuthService: FirebaseAuthService,
  		private firebaseDBService: FirebaseDBService
  	) {
  		this.createForm();
  	};

	showAddCategoryDialog() {
		this.showAddForm = true;
	}

  	createForm() {
	    this.categoryForm = this.formBuilder.group({
	      categoryName: ['', Validators.required],
	      categoryDesc: ['', Validators.required]
	    });
	};

  	ngOnInit(): void {
  		this.getCategories();
  	};

	getCategories(): void {
		this.blockCategoryGrid = true;
		this.firebaseDBService.getAllCategories()
			.then(data => {
				this.blockCategoryGrid = false;
				this.categories = data
			}
		);
	};

	

  	onSubmit() : void {
  		var categoryFormValue = this.categoryForm.value;
  		var category = new Category();
  		category.categoryName = categoryFormValue.categoryName;
  		category.categoryDesc = categoryFormValue.categoryDesc;
  		
  		this.firebaseDBService.writeCategoryData(category)
  		.then(data => {
			this.showAddForm = false;
			this.getCategories();
		  })
      	.catch(function(error) { 
          	// error
        	// Handle Errors here.
        	var errorCode = error.code;
        	var errorMessage = error.message;
        	// ...
      	});
  	}
}