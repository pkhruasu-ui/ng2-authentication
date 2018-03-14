import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class LoginGuard implements  CanActivate {
    constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(localStorage.getItem('currentUser')){
            // user has logged in so return true
            return true;
        }

        // not logged in so redirect user to home page
        this.router.navigate(['/'], { queryParams: { returnUrl : state.url }});
        return false;
    }
}