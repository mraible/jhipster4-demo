import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Tag } from './tag.model';
import { TagService } from './tag.service';

@Component({
    selector: 'jhi-tag-detail',
    templateUrl: './tag-detail.component.html'
})
export class TagDetailComponent implements OnInit, OnDestroy {

    tag: Tag;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tagService: TagService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['tag']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.tagService.find(id).subscribe(tag => {
            this.tag = tag;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
