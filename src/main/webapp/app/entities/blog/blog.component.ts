import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Blog } from './blog.model';
import { BlogService } from './blog.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-blog',
    templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit, OnDestroy {
blogs: Blog[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private blogService: BlogService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.blogService.query().subscribe(
            (res: ResponseWrapper) => {
                this.blogs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBlogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Blog) {
        return item.id;
    }
    registerChangeInBlogs() {
        this.eventSubscriber = this.eventManager.subscribe('blogListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
