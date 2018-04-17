import { Injectable } from '@angular/core';
import { Globals }  from './globals';

/*
 Service stores user and its information (ticket, username, company year, ...)
*/
@Injectable()
export class StorageService {

    private _loggedin: string;
    private _user: string;

    constructor(private globals: Globals){
        this._loggedin  = this.globals.STORAGE_LOGGEDIN;
        this._user      = this.globals.STORAGE_USER;
    }

    setUser(user) {
        localStorage.setItem(this._loggedin, 'true');
        localStorage.setItem(this._user,
                                JSON.stringify(
                                    user,
                                    function(k, v) { if (v === undefined) { return null; } return v; }
                            ));
    }

    removeUser() {
        localStorage.removeItem(this._loggedin);
        localStorage.removeItem(this._user);
    }

    getUser(){
        return JSON.parse(localStorage.getItem(this._user));
    }

    uLoggedIn() {
        return localStorage.getItem(this._loggedin) != null ? true : false;
    }
}