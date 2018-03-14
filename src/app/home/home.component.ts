import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-comp',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    public componentName:string;

    constructor(){}

    ngOnInit(){
        this.componentName = "Home Component";
    }
}