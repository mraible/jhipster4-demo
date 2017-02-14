import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Tag } from './tag.model';
import { TagPopupService } from './tag-popup.service';
import { TagService } from './tag.service';

@Component({
    selector: 'jhi-tag-delete-dialog',
    templateUrl: './tag-delete-dialog.component.html'
})
export class TagDeleteDialogComponent {

    tag: Tag;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tagService: TagService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tag']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.tagService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tagListModification',
                content: 'Deleted an tag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tag-delete-popup',
    template: ''
})
export class TagDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tagPopupService: TagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.tagPopupService
                .open(TagDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
