import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Entry } from './entry.model';
import { EntryService } from './entry.service';

@Component({
    selector: 'jhi-entry-delete-dialog',
    templateUrl: './entry-delete-dialog.component.html'
})
export class EntryDeleteDialogComponent {

    entry: Entry;

    constructor(
        private entryService: EntryService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {}

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id) {
        this.entryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({ name: 'entryListModification', content: 'Deleted an entry'});
            this.activeModal.dismiss(true);
        });
    }
}
