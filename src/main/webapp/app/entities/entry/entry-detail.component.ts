import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Entry } from './entry.model';
import { EntryService } from './entry.service';

@Component({
    selector: 'jhi-entry-detail',
    templateUrl: './entry-detail.component.html'
})
export class EntryDetailComponent implements OnInit, OnDestroy {

    entry: Entry;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private entryService: EntryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntries();
    }

    load(id) {
        this.entryService.find(id)
            .subscribe((entryResponse: HttpResponse<Entry>) => {
                this.entry = entryResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entryListModification',
            (response) => this.load(this.entry.id)
        );
    }
}
