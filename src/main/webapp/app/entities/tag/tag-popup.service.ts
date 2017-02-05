import { Injectable, Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Tag } from './tag.model';
import { TagService } from './tag.service';
@Injectable()
export class TagPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private tagService: TagService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.tagService.find(id).subscribe(tag => {
                this.tagModalRef(component, tag);
            });
        } else {
            return this.tagModalRef(component, new Tag());
        }
    }

    tagModalRef(component: Component, tag: Tag): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tag = tag;
        modalRef.result.then(result => {
            console.log(`Closed with: ${result}`);
            this.isOpen = false;
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            this.isOpen = false;
        });
        return modalRef;
    }
}
