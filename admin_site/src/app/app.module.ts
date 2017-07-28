import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';

import { InputTextModule, TabMenuModule, PanelModule } from 'primeng/primeng';
//import { ConfirmationService, Message } from "primeng/components/common/api";
import {DataTableModule,SharedModule} from 'primeng/primeng';


import { AppComponent } from './app/app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';


import { FirebaseAuthService } from './firebase/firebase-auth.service';
import { FirebaseDBService } from './firebase/firebase-db.service';
import { StorageService } from './storage/storage.service';

import { StringImagesPipe } from './pipes/string-images.pipe';
import { AnchorImagesPipe } from './pipes/anchor-images.pipe';
import { MaterialComponent } from './material/material.component';
import { MeasurementComponent } from './measurement/measurement.component';

const appRoutes: Routes = [
      { path: '', redirectTo: '/login', pathMatch: 'full' }, 
      { path: 'login', component: LoginComponent}, 
      { path: 'register', component: RegisterComponent }, 
      { path: 'home', component: HomeComponent }, 
      { path: 'category', component: CategoryComponent }, 
      { path: 'product', component: ProductComponent }, 
      { path: 'material', component: MaterialComponent },
      { path: 'measurement', component: MeasurementComponent }
    ];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    StringImagesPipe,
    AnchorImagesPipe,
    MaterialComponent,
    MeasurementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    //start: primeng module
    SharedModule, InputTextModule, TabMenuModule,
    DataTableModule, SharedModule,
    //end: primeng module
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FirebaseAuthService,
    StorageService,
    FirebaseDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
