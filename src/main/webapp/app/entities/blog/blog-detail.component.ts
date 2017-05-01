import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';

@Component({
    selector: 'jhi-blog-detail',
    templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit, OnDestroy {

    blog: Blog;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private blogService: BlogService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['blog']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.blogService.find(id).subscribe(blog => {
            this.blog = blog;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
