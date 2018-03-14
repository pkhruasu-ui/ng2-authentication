import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ApiService} from './apiservice';
import {RouterModule, Routes}  from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
// login guard
import {LoginGuard} from './login.guard';


const routes:Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [LoginGuard]
    },
    {
        path: "",
        component: HomeComponent   // should have nothing relate to login
    }
    // , { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [ApiService, LoginGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}