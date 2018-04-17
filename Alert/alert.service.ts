import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'; 
/*
    Service used for handling alerts.
*/
@Injectable()
export class AlertService {

    private subject = new Subject<any>();
    private _keepAfterNavigationChange = false;

    private _errCodeMap = new Map<number, string>();

    constructor(private router: Router) {
    // Check if alerts need to be cleared after route changes
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this._keepAfterNavigationChange) {
                    this._keepAfterNavigationChange = false;
                }else {
                    this.subject.next();
                }
            }
        });
        this.initializeErrCodeMap();
    }

    // Alert methods - Currently supports Alert and Success messages
    /**
     * Application wide error handling
     *  - Uses http error codes for forming the alerts
     *  - Extra parameters may include time the alert needs to be displayed,
     *  if it should be kept after navigation change and additional information
     */
    alertHandle(errCode: number, additionalInfo: string, keepAfterNavigationChange = true) {
        switch (errCode) {
            case 200:
                this.success(additionalInfo, keepAfterNavigationChange);
            break;
            default:
                var _errMsg = this._errCodeMap.get(errCode);
                if(_errMsg != null){
                    this.error(additionalInfo + ' ' + this._errCodeMap.get(errCode), keepAfterNavigationChange);
                } else {
                    const errMsg = 'Unknown error - '  + errCode;
                    this.error(additionalInfo + ' ' + errMsg, keepAfterNavigationChange);
                }
            break;
        }
    }

    success(message: string, keepAfterNavigationChange = true, timeLimit = 5000) {
        this._keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'success', text: message});
    }

    error(message: string, keepAfterNavigationChange = true) {
        this._keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'error', text: message});
    }

    /**
     * Error code descriptions
     */
    initializeErrCodeMap(){
        this._errCodeMap.set(400, 'Bad Request (400)');
        this._errCodeMap.set(401, 'Unauthorized (400)');
        this._errCodeMap.set(403, 'Forbidden (403)');
        this._errCodeMap.set(404, 'Not Found (400)');
        this._errCodeMap.set(500, 'Internal server error (500)');
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    clearAlert(){
        this.subject.next();
    }
}