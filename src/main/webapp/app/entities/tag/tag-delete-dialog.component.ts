import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Tag } from './tag.model';
import { TagService } from './tag.service';

@Component({
    selector: 'jhi-tag-delete-dialog',
    templateUrl: './tag-delete-dialog.component.html'
})
export class TagDeleteDialogComponent {

    tag: Tag;

    constructor(
        private tagService: TagService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {}

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id) {
        this.tagService.delete(id).subscribe(response => {
            this.eventManager.broadcast({ name: 'tagListModification', content: 'Deleted an tag'});
            this.activeModal.dismiss(true);
        });
    }
}
