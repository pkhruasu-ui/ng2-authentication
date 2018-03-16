import {Injectable, Renderer2, RendererFactory2}        from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import {CookieService} from './cookie.service';

@Injectable()
export class ApiService {


    constructor(private http:HttpClient, private cookie:CookieService, private rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null,null);
    }

    postLogin(data) {    //todo: figure out the response type
        // return this.http.post('/login', data).toPromise().catch(this.handleError);
        return this.http.post('/login', data).map( (response:any) => {
            // this.checkSession();
            this.cookie.setCookie(response.session.username,response.session.cookie.expires);
            this.startListeningToUserClick();
            this.setTimerForClient(response.session.cookie.expires);
            return response;
        } );
    }

    getSession(){
        return this.http.get('/session');
    }
    
    getLogout(){
        return this.http.get('/logout').map((response:any)=> {
            console.log('logout', response);
            this.cleanupTimers();
            // localStorage.removeItem('currentUser');
            this.cookie.deleteCookie();
            return response;
        } );
    }

    getTime(){
        return this.http.get('/api/timer').map((response:any)=> {
            console.log('timer', response);
            return response;
        } );
    }


    handleError(error:any) {
        console.log('An error occurred ', error);

        return (error.message || error);
    }

    // private get(url){
    //     return this.http.get(url).map((response:any) => {
    //         this.cookie.setCookie(response.session.username, response.session.cookie.expires);
    //
    //         let aa = new Date(response.session.cookie.expires), bb = new Date();
    //         if( aa.valueOf() - bb.valueOf() > 0){
    //             if(this.timerHandler){ clearTimeout(this.timerHandler)}
    //             this.timerHandler = setTimeout(() => {
    //
    //                 // check
    //                 alert("timeout");
    //             }, aa.valueOf() - bb.valueOf());
    //         }
    //
    //         return response;
    //     });
    // }

    /**
     * Session related functionalities
     */
    // private warningDuration = 1000 * 40;
    public timerHandler:any;
    private renderer: Renderer2;
    private clickListener;
    private warningTimerHandler;
    private autoLogoutTimerHandler;

    private startListeningToUserClick(){
        let _t = this;

        function listen(){

            if(_t.clickListener) _t.clickListener();   // detatch listener to prevent duplicate;
            _t.clickListener = _t.renderer.listen("document","click", (event) => {
                // extend session
                _t.keepAlive();
            })
        }

        clearTimeout(this.timerHandler);
        this.timerHandler = setTimeout(listen, 1000 * 30);
    }

    private keepAlive(){
        this.http.get('/api/keepalive').subscribe((response:any) => {
            console.log(response);
            // detatch any existing listeners for now
            this.cleanupTimers();
            // start over again
            this.startListeningToUserClick();
            this.setTimerForClient(response.session.cookie.expires);
            // update cookie,
        }, (error) => {
            console.log(error);
        },() => {

        })
    }

    private setTimerForClient(expireDate){


        let aa = new Date(expireDate), bb = new Date();
        if( aa.valueOf() - bb.valueOf() > 0){

            // timer to logout user
            if(this.autoLogoutTimerHandler){ clearTimeout(this.autoLogoutTimerHandler)}
            this.autoLogoutTimerHandler = setTimeout(() => {

                this.getLogout().subscribe((response) => {
                    // check
                    alert("timeout");
                }, () => {}, () => {});
            }, aa.valueOf() - bb.valueOf());

            // timer to war user
            if(this.warningTimerHandler){ clearTimeout(this.warningTimerHandler) }
            this.warningTimerHandler = setTimeout(() => {

                // check
                alert("warning start");
            }, aa.valueOf() - bb.valueOf() - (1000 * 20));
        }
    }

    private cleanupTimers(){

        clearTimeout(this.timerHandler);
        if(this.clickListener) this.clickListener();   // detatch listener to prevent duplicate;
        if(this.autoLogoutTimerHandler){ clearTimeout(this.autoLogoutTimerHandler)}
        if(this.warningTimerHandler){ clearTimeout(this.warningTimerHandler) }
    }
}