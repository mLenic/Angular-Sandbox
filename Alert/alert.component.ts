import { Component, OnInit } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
    moduleId: module.id,
    selector: 'app-alert-component',
    templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {
    public message: any;
    constructor(private alertService: AlertService) {}

    ngOnInit() { 
        this.alertService.getMessage().subscribe(data => { this.message = data; });
    }

    clearAlert(){
        this.alertService.clearAlert();
    }
}