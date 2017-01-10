import { Component, OnInit } from '@angular/core';
import { Transition } from 'ui-router-ng2';

import { Blog } from './blog.model';
import { BlogService } from './blog.service';

@Component({
    selector: 'jhi-blog-detail',
    templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {

    blog: Blog;

    constructor(private blogService: BlogService, private trans: Transition) { }

    ngOnInit() {
        this.load(this.trans.params()['id']);
    }

    load (id) {
        this.blogService.find(id).subscribe(blog => {
            this.blog = blog;
        });
    }

}
