import {Injectable}        from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(private http:HttpClient) {

    }

    postLogin(data) {    //todo: figure out the response type
        // return this.http.post('/login', data).toPromise().catch(this.handleError);
        return this.http.post('/login', data);
    }

    getSession(){
        return this.http.get('/session');
    }
    
    getLogout(){
        return this.http.get('/logout');    
    }
    
    handleError(error:any) {
        console.log('An error occurred ', error);

        return (error.message || error);
    }
}
