import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Blog } from './blog.model';
import { BlogPopupService } from './blog-popup.service';
import { BlogService } from './blog.service';

@Component({
    selector: 'jhi-blog-delete-dialog',
    templateUrl: './blog-delete-dialog.component.html'
})
export class BlogDeleteDialogComponent {

    blog: Blog;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private blogService: BlogService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager,
        private router: Router
    ) {
        this.jhiLanguageService.setLocations(['blog']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
        this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
    }

    confirmDelete (id: number) {
        this.blogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'blogListModification',
                content: 'Deleted an blog'
            });
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-blog-delete-popup',
    template: ''
})
export class BlogDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private blogPopupService: BlogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.blogPopupService
                .open(BlogDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
