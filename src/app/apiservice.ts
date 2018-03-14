import {Injectable}        from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(private http:HttpClient) {

    }

    postLogin(data) {    //todo: figure out the response type
        // return this.http.post('/login', data).toPromise().catch(this.handleError);
        return this.http.post('/login', data).map( (response:any) => {
            console.log(response);
            localStorage.setItem('currentUser', response.session.username);

            return response;
        } );
    }

    getSession(){
        return this.http.get('/session');
    }
    
    getLogout(){
        return this.http.get('/logout').map((response:any)=> {
            console.log('logout', response);
            localStorage.removeItem('currentUser');
            return response;
        } );
    }
    
    handleError(error:any) {
        console.log('An error occurred ', error);

        return (error.message || error);
    }
}
