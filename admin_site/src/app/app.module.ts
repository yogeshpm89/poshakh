import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    StringImagesPipe,
    AnchorImagesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }, {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'register',
        component: RegisterComponent
      }, {
        path: 'home',
        component: HomeComponent
      }, {
        path: 'category',
        component: CategoryComponent
      }, {
        path: 'product',
        component: ProductComponent
      }
    ])
  ],
  providers: [
    FirebaseAuthService,
    StorageService,
    FirebaseDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }