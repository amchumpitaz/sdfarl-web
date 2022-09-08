import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

    collapedSideBar: boolean;
    constructor() {}

    ngOnInit() {}

    receiveCollapsed($event: any) {
        this.collapedSideBar = $event;
    }
}
