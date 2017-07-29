// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, 
		FormGroup, Validators }     from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Observable }        		from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { firebase, FirebaseAuthService } from '.././firebase/firebase-auth.service';
import { FirebaseDBService } from '.././firebase/firebase-db.service';
import { Material } from '.././material/material';

@Component({
  selector: 'material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
	materials: Material[];
	materialForm: FormGroup;
  	searchText = "";
	showAddForm = false;
  	materialImages = "";
  	materialImageFiles = "";
  	constructor(
  		private formBuilder: FormBuilder,
  		private firebaseAuthService: FirebaseAuthService,
  		private firebaseDBService: FirebaseDBService
  	) {
  		this.createForm();
      	this.getMaterials();
  	};

  	createForm() {
        this.materialForm = this.formBuilder.group({
          materialId: [''],
          materialName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
          materialDesc: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(1000)]],
          materialLongDesc: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(4000)]],
          materialPrice: ['', Validators.required],
          materialStatus: ['Available', Validators.required],
          materialImages: ['']
        });
    };

    getMaterials(): void {
      	var me = this;
      	me.materials = [];
      	firebase.database().ref('materials').once('value').then(function(snapshot) {
	        snapshot.forEach(function(material) {
	          var material = material.val();
	              me.materials.push({
	                  materialId: material.materialId,
	                  materialName: material.materialName,
	                  materialDesc: material.materialDesc,
	                  materialLongDesc: material.materialLongDesc,
	                  materialPrice: material.materialPrice,
	                  materialStatus: material.materialStatus,
	                  materialImages: material.materialImages,
	                  isActive: material.isActive
	            });
	        });
    	});
    };

  	ngOnInit(): void {
  	};

    onFilesChange(event): void {
      this.materialImageFiles = event.srcElement.files;
    };

    editMaterial(materialId): void {
    	var me = this;
	    var material = me.materials.filter(x => x.materialId == materialId)[0];
	    material.materialImages = "";
	    me.materialForm.reset(material);
	    me.showAddForm = true;
    };

    deleteMaterial(materialId): void {
      var me = this;
      var material = me.materials.filter(x => x.materialId == materialId)[0];
      material.materialImages = "";
      material.isActive = 0; 
      me.firebaseDBService.writeMaterialData(material)
      .then(data => me.onSubmitSuccess())
        .catch(function(error) { 
            // error
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    };

    searchMaterial() : void {
      var me = this;
      me.materials = [];
      var materialsRef = firebase.database().ref('materials');
      materialsRef.orderByChild("materialName").equalTo(me.searchText).on("child_added", function(snapshot) {
          var material = snapshot.val();
          me.materials.push(material);
      });
    };

  	onSubmit() : void {
      var materialFormValue = this.materialForm.value;
      var material = new Material();
      material.materialId = materialFormValue.materialId;
      material.materialName = materialFormValue.materialName;
      material.materialDesc = materialFormValue.materialDesc;
      material.materialLongDesc = materialFormValue.materialLongDesc;
      material.materialPrice = materialFormValue.materialPrice;
      material.materialStatus = materialFormValue.materialStatus;
      material.materialImages = this.materialImageFiles;
      
      this.firebaseDBService.writeMaterialData(material)
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
      this.materialForm.reset({materialStatus: 'Available'});
      this.showAddForm = false;
      this.getMaterials();
    };
}
