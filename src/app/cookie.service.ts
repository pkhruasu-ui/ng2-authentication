import {Injectable}        from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';

/**
 * Fun facts:
 * 1. To set multiple cookie, do mutiple document.cookie = bla..bla
 * 2. Always set expires and path when you set/delete it. Or you might delete from a wrong url
 * 3. You won't see expires/path after you set them but it is there! You can check from browser. The ';' is to add
 *    "addition info" not multiple cookie
 *
 * credit:
 * https://stackoverflow.com/questions/16842226/setting-multiple-cookies-in-javascript
 */

@Injectable()
export class CookieService {

    constructor() {

    }

    setCookie(username:string, expireDate:string):void{
        var d = new Date(expireDate);
        // var d = new Date();
        // d.setTime(d.getTime() + (1*24*60*60*1000));
        var expires = "expires=" + d.toUTCString();

        document.cookie = "username=" +username + "; " + expires + "; " + "path=/";
        // document.cookie = ;
        // document.cookie = "path=/";
    }

    getCookie(key:string):string{
        var name = key + "";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    deleteCookie(){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
        // document.cookie = ""
    }

}