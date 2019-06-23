import {Component, OnInit, AfterViewInit, OnDestroy, Injectable}        from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl}    from '@angular/forms';
import {ApiService} from './apiservice';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private fb:FormBuilder,
                private apiService:ApiService) {
    }

    public componentName = "My app Component";
    public myForm!:FormGroup;
    public loginForm!: FormGroup;
    public session:any;

    ngOnInit() {
        var day = new Date();
        var d: any = day.getTime();

        this.myForm = this.fb.group({
            'username': ['Prajak_' +  d, [Validators.required]],
            'email': ['prajak' + d + '@gmail.com', [Validators.required]],
            'password': ['something', [Validators.required]],
            'passwordConf': ['something', [Validators.required]]
        });

        this.loginForm = this.fb.group({
            'logemail': ['prajak' + d + '@gmail.com', [Validators.required]],
            'logpassword': ['something', [Validators.required]]
        })
    }

    onSubmit(valid) {
        let form = this.myForm.getRawValue();

        this.apiService.postLogin({
            username: form.username,
            email: form.email,
            password: form.password,
            passwordConf: form.passwordConf
        }).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error)
            },
            () => {
                console.log("complete ajax");
            });
    }

    onLogin(valid){
        let form = this.loginForm.getRawValue();

        this.apiService.postLogin({
            logemail: form.logemail,
            logpassword: form.logpassword
        }).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error)
            },
            () => {
                console.log("complete ajax");
            });
    }

    getSession(){
        this.apiService.getSession().subscribe((response) => {
                console.log(response);
                this.session = response;
            },
            (error) => {
                console.log(error)
            },
            () => {
                console.log("complete ajax");
            })
    }

    logout(){
        this.apiService.getLogout().subscribe((response) => {
                console.log(response);
            },
            (error) => {
                console.log(error)
            },
            () => {
                console.log("complete ajax");
            })
    }
}
