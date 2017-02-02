import { Injectable, Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Entry } from './entry.model';
import { EntryService } from './entry.service';
@Injectable()
export class EntryPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private entryService: EntryService
    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.entryService.find(id).subscribe(entry => {
                entry.date = this.datePipe.transform(entry.date, 'yyyy-MM-ddThh:mm');
                this.entryModalRef(component, entry);
            });
        } else {
            return this.entryModalRef(component, new Entry());
        }
    }

    entryModalRef(component: Component, entry: Entry): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.entry = entry;
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
