import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-custom-pagination',
    templateUrl: './custom-pagination.component.html',
    styleUrls: ['./custom-pagination.component.css'],
})
export class CustomPaginationComponent {
    
    public _pgArray: Array<any>;
    public _pgNum: number;

    //Settings
    private _pgDisplayed: number = 5;       //How many pages are displayed
    public selectedPgNumber: number = 1;    //Page that is displayed by default

    @Input()
    set pgNum(value: number){
        this._pgNum = value;
        this.buildPgArray(1);
    }

    @Output() pgChange : EventEmitter<number> = new EventEmitter();

    setPgNum(pgSelected: number){
        this.selectedPgNumber = pgSelected;
        this.pgChange.emit(pgSelected);
        this.buildPgArray(this.selectedPgNumber);
    }
    
    pgIter(next: boolean){
        if(next)this.selectedPgNumber+=1;
        if(!next)this.selectedPgNumber-=1;
        this.buildPgArray(this.selectedPgNumber);
        this.pgChange.emit(this.selectedPgNumber);
    }

    buildPgArray(_currentNum: number){
        var firstNum = 1;        
        if(_currentNum - Math.floor(this._pgDisplayed/2) > 0){
            firstNum = _currentNum - Math.floor(this._pgDisplayed/2);
        }
        
        var lastNum = firstNum + this._pgDisplayed-1;
        if(lastNum >= this._pgNum) lastNum = this._pgNum;

        this._pgArray = new Array<number>();
        for(var i = firstNum; i <= lastNum; i++){
            this._pgArray.push(i);
        }
    }
}