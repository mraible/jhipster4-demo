import { Component, OnInit } from '@angular/core';
import { Transition } from 'ui-router-ng2';

import { Entry } from './entry.model';
import { EntryService } from './entry.service';

@Component({
    selector: 'jhi-entry-detail',
    templateUrl: './entry-detail.component.html'
})
export class EntryDetailComponent implements OnInit {

    entry: Entry;

    constructor(private entryService: EntryService, private trans: Transition) { }

    ngOnInit() {
        this.load(this.trans.params()['id']);
    }

    load (id) {
        this.entryService.find(id).subscribe(entry => {
            this.entry = entry;
        });
    }

}
