import { Component, OnInit } from '@angular/core';
import { Transition } from 'ui-router-ng2';

import { Tag } from './tag.model';
import { TagService } from './tag.service';

@Component({
    selector: 'jhi-tag-detail',
    templateUrl: './tag-detail.component.html'
})
export class TagDetailComponent implements OnInit {

    tag: Tag;

    constructor(private tagService: TagService, private trans: Transition) { }

    ngOnInit() {
        this.load(this.trans.params()['id']);
    }

    load (id) {
        this.tagService.find(id).subscribe(tag => {
            this.tag = tag;
        });
    }

}
