import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Blog } from './blog.model';
import { BlogService } from './blog.service';

@Component({
    selector: 'jhi-blog-delete-dialog',
    templateUrl: './blog-delete-dialog.component.html'
})
export class BlogDeleteDialogComponent {

    blog: Blog;

    constructor(
        private blogService: BlogService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {}

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id) {
        this.blogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({ name: 'blogListModification', content: 'Deleted an blog'});
            this.activeModal.dismiss(true);
        });
    }
}
