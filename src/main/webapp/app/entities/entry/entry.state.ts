import { Transition, Ng2StateDeclaration } from 'ui-router-ng2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, PaginationUtil } from 'ng-jhipster';

import { EntryComponent } from './entry.component';
import { EntryDetailComponent } from './entry-detail.component';
import { EntryDialogComponent } from './entry-dialog.component';
import { EntryDeleteDialogComponent } from './entry-delete-dialog.component';
import { Entry } from './entry.model';
import { EntryService } from './entry.service';

export const entryState: Ng2StateDeclaration = {
    name: 'entry',
    parent: 'entity',
    url: '/entry',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.entry.home.title'
    },
    views: {
        'content@': { component: EntryComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService) => languageService.setLocations(['entry'])
        }
    ]
};

export const entryDetailState: Ng2StateDeclaration = {
    name: 'entry-detail',
    parent: 'entity',
    url: '/entry/:id',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.entry.detail.title'
    },
    views: {
        'content@': { component: EntryDetailComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService) => languageService.setLocations(['entry'])
        },
        {
            token: 'previousState',
            deps: [Transition],
            resolveFn: (trans: Transition) => {
                // TODO this needs to be tested
                const stateParams = trans.params();
                const stateService = trans.router.stateService;
                const currentStateData = {
                    name: stateService.current.name || 'entry',
                    params: stateParams,
                    url: stateService.href(stateService.current.name, stateParams)
                };
                return currentStateData;
            }
        }
    ]
};

export const entryNewState: Ng2StateDeclaration = {
    name: 'entry.new',
    url: '/new',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        const modalRef  = modalService.open(EntryDialogComponent, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.entry = new Entry();
        modalRef.result.then((result) => {
            console.log(`Closed with: ${result}`);
            $state.go('entry', null, { reload: 'entry' });
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            $state.go('entry');
        });
    }
};

export const entryEditState: Ng2StateDeclaration = {
    name: 'entry.edit',
    url: '/{id}/edit',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let entryService: EntryService = trans.injector().get(EntryService);
        let id = trans.params()['id'];
        entryService.find(id).subscribe(entry => {
            // TODO Find a better way to format dates so that it works with NgbDatePicker
            if (entry.date) {
                entry.date = {
                     year: entry.date.getFullYear(),
                     month: entry.date.getMonth() + 1,
                     day: entry.date.getDate()
                };
            }
            const modalRef  = modalService.open(EntryDialogComponent, { size: 'lg', backdrop: 'static'});
            modalRef.componentInstance.entry = entry;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('entry', null, { reload: 'entry' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};

export const entryDeleteState: Ng2StateDeclaration = {
    name: 'entry.delete',
    url: '/{id}/delete',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let entryService: EntryService = trans.injector().get(EntryService);
        let id = trans.params()['id'];
        entryService.find(id).subscribe(entry => {
            const modalRef  = modalService.open(EntryDeleteDialogComponent, { size: 'md'});
            modalRef.componentInstance.entry = entry;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('entry', null, { reload: 'entry' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};
