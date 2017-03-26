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
import { Product } from '.././product/product';


@Component({
	moduleId: module.id,
	selector: 'product',
	templateUrl: './product.component.html',
  styleUrls: [ './product.component.css' ]
})

export class ProductComponent implements OnInit {
	categories: Category[];
  products: Product[];
	productForm: FormGroup;
  searchText = "";
	showAddForm = false;
  productImages = "";
  productImageFiles = "";
  	constructor(
  		private formBuilder: FormBuilder,
  		private firebaseAuthService: FirebaseAuthService,
  		private firebaseDBService: FirebaseDBService
  	) {
  		this.createForm();
      this.getCategories();
      this.getProducts();
  	};

  	createForm() {
        this.productForm = this.formBuilder.group({
          productId: [''],
          categoryId: ['', Validators.required],
          productName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
          productDesc: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(1000)]],
          productLongDesc: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(4000)]],
          productPrice: ['', Validators.required],
          productWeight: ['', Validators.required],
          productStatus: ['Completed', Validators.required],
          stock: [1, Validators.required],
          productImages: ['']
        });
    };

    getProducts(): void {
      this.firebaseDBService.getAllProducts().then(data => this.products = data);
    };

    getCategories(): void {
      this.firebaseDBService.getAllCategories().then(data => this.categories = data);
    };

  	ngOnInit(): void {
  	};

    onFilesChange(event): void {
      this.productImageFiles = event.srcElement.files;
    };

    editProduct(productId): void {
      var product = this.products.filter(x => x.productId == productId)[0];
      product.productImages = "";
      this.productForm.reset(product);
      this.showAddForm = true;
    };

    deleteProduct(productId): void {
      var me = this;
      var product = me.products.filter(x => x.productId == productId)[0];
      product.productImages = "";
      product.isActive = 0; 
      me.firebaseDBService.writeProductData(product)
      .then(data => me.onSubmitSuccess())
        .catch(function(error) { 
            // error
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    };

    searchProduct() : void {
      this.products = [];
      this.firebaseDBService.searchProduct(this.searchText)
      .then(data => this.searchProductSuccess(data))
        .catch(function(error) { 
            // error
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    };

    searchProductSuccess(data): void {
        this.products.push(data);
    };

  	onSubmit() : void {
      var productFormValue = this.productForm.value;
      var product = new Product();
      product.productId = productFormValue.productId;
      product.categoryId = productFormValue.categoryId;
      product.productName = productFormValue.productName;
      product.productDesc = productFormValue.productDesc;
      product.productLongDesc = productFormValue.productLongDesc;
      product.productPrice = productFormValue.productPrice;
      product.productWeight = productFormValue.productWeight;
      product.productStatus = productFormValue.productStatus;
      product.stock = productFormValue.stock;
      product.productImages = this.productImageFiles;
      
      this.firebaseDBService.writeProductData(product)
      .then(data => this.onSubmitSuccess())
        .catch(function(error) { 
            // error
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
  	};

    onSubmitSuccess(): void {
      this.productForm.reset({productStatus: 'Completed', stock: 1});
      this.showAddForm = false;
      this.getProducts();
    };
}