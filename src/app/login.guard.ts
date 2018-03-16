import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { CookieService } from './cookie.service';

@Injectable()
export class LoginGuard implements  CanActivate {
    constructor(private router:Router, private cookie:CookieService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // if(localStorage.getItem('currentUser')){
        if(this.cookie.getCookie("username")){
            // user has logged in so return true
            return true;
        }

        // not logged in so redirect user to home page
        this.router.navigate(['/'], { queryParams: { returnUrl : state.url }});
        return false;
    }
}