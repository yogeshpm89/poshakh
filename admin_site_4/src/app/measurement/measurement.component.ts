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
import { Measurement } from '.././measurement/measurement';


@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {
  	measurements: Measurement[];
	measurementForm: FormGroup;
  	searchText = "";
	showAddForm = false;
  	measurementImages = "";
  	measurementImageFiles = "";
  	constructor(
  		private formBuilder: FormBuilder,
  		private firebaseAuthService: FirebaseAuthService,
  		private firebaseDBService: FirebaseDBService
  	) {
  		this.createForm();
      	this.getMeasurements();
  	};

  	createForm() {
        this.measurementForm = this.formBuilder.group({
	        measurementId: [''],
	        measurementName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
	        measurementFor: ['', [Validators.required]],
	        gender: ['', [Validators.required]],
	        measurementDesc: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(1000)]],

          shirtNeck: [null],
    			shirtChest: [''],
    			shirtWaist: [''],
    			shirtHip: [''],
    			shirtSeat: [''],
    			shirtLength: [''],
    			shirtShoulder: [''],
    			shirtArmLength: [''],
    			shirtWrist: [''],

    			pantWaist: [''],
    			pantHip: [''],
    			pantCrotch: [''],
    			pantThigh: [''],
    			pantLength: [''],
    			pantSeat: [''],
    			pantInseam: [''],

          measurementImages: ['']
        });
    };

    getMeasurements(): void {
      var me = this;
      me.measurements = [];
      firebase.database().ref('measurements').once('value').then(function(snapshot) {
        snapshot.forEach(function(measurement) {
          	var measurement = measurement.val();
            me.measurements.push(measurement);
        });
   	 });
    };

  	ngOnInit(): void {
  	};

    onFilesChange(event): void {
      this.measurementImageFiles = event.srcElement.files;
    };

    searchProduct() : void {
      var me = this;
      me.measurements = [];
      var measurementRef = firebase.database().ref('measurements');
      measurementRef.orderByChild("measurementName").equalTo(me.searchText).on("child_added", function(snapshot) {
          var measurement = snapshot.val();
          me.measurements.push(measurement); 
      });
    };

  	onSubmit() : void {
      	var measurementForm = this.measurementForm.value;
     	  var measurement = new Measurement();
      
       	measurement.measurementId = measurementForm.measurementId;
    		measurement.measurementName = measurementForm.measurementName;
    		measurement.measurementDesc = measurementForm.measurementDesc;
    		measurement.measurementFor = measurementForm.measurementFor;
    		measurement.measurementImages = this.measurementImageFiles;
    		measurement.gender = measurementForm.gender;

    		measurement.shirtNeck = measurementForm.shirtNeck;
    		measurement.shirtChest = measurementForm.shirtChest;
    		measurement.shirtWaist = measurementForm.shirtWaist;
    		measurement.shirtHip = measurementForm.shirtHip;
    		measurement.shirtSeat = measurementForm.shirtSeat;
    		measurement.shirtLength = measurementForm.shirtLength;
    		measurement.shirtShoulder = measurementForm.shirtShoulder;
    		measurement.shirtArmLength = measurementForm.shirtArmLength;
    		measurement.shirtWrist = measurementForm.shirtWrist;

    		measurement.pantWaist = measurementForm.pantWaist;
    		measurement.pantHip = measurementForm.pantHip;
    		measurement.pantCrotch = measurementForm.pantCrotch;
    		measurement.pantThigh = measurementForm.pantThigh;
    		measurement.pantLength = measurementForm.pantLength;
    		measurement.pantSeat = measurementForm.pantSeat;
    		measurement.pantInseam = measurementForm.pantInseam;
      
        this.firebaseDBService.writeMeasurementData(measurement)
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
      this.measurementForm.reset({});
      this.showAddForm = false;
      this.getMeasurements();
    };
}
