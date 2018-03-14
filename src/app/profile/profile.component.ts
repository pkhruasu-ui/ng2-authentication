import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'profile-comp',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    public componentName:string;

    constructor(){}

    ngOnInit(){
        this.componentName = "Profile Component";
    }
}