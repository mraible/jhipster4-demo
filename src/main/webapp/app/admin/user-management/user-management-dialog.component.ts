import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { User } from './user.model';
import { UserService } from './user.service';
import { JhiLanguageHelper } from '../../shared';

@Component({
    selector: 'jhi-user-mgmt-dialog',
    templateUrl: './user-management-dialog.component.html'
})
export class UserMgmtDialogComponent implements OnInit {

    user: User;
    languages: any[];
    authorities: any[];
    isSaving: Boolean;

    constructor (
        public activeModal: NgbActiveModal,
        private languageHelper: JhiLanguageHelper,
        private userService: UserService,
        private eventManager: EventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== null) {
            this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
