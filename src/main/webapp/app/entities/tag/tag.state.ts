import { Transition, Ng2StateDeclaration } from 'ui-router-ng2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, PaginationUtil } from 'ng-jhipster';

import { TagComponent } from './tag.component';
import { TagDetailComponent } from './tag-detail.component';
import { TagDialogComponent } from './tag-dialog.component';
import { TagDeleteDialogComponent } from './tag-delete-dialog.component';
import { Tag } from './tag.model';
import { TagService } from './tag.service';

export const tagState: Ng2StateDeclaration = {
    name: 'tag',
    parent: 'entity',
    url: '/tag',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.tag.home.title'
    },
    views: {
        'content@': { component: TagComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService) => languageService.setLocations(['tag'])
        }
    ]
};

export const tagDetailState: Ng2StateDeclaration = {
    name: 'tag-detail',
    parent: 'entity',
    url: '/tag/:id',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.tag.detail.title'
    },
    views: {
        'content@': { component: TagDetailComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService) => languageService.setLocations(['tag'])
        },
        {
            token: 'previousState',
            deps: [Transition],
            resolveFn: (trans: Transition) => {
                // TODO this needs to be tested
                const stateParams = trans.params();
                const stateService = trans.router.stateService;
                const currentStateData = {
                    name: stateService.current.name || 'tag',
                    params: stateParams,
                    url: stateService.href(stateService.current.name, stateParams)
                };
                return currentStateData;
            }
        }
    ]
};

export const tagNewState: Ng2StateDeclaration = {
    name: 'tag.new',
    url: '/new',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        const modalRef  = modalService.open(TagDialogComponent, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tag = new Tag();
        modalRef.result.then((result) => {
            console.log(`Closed with: ${result}`);
            $state.go('tag', null, { reload: 'tag' });
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            $state.go('tag');
        });
    }
};

export const tagEditState: Ng2StateDeclaration = {
    name: 'tag.edit',
    url: '/{id}/edit',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let tagService: TagService = trans.injector().get(TagService);
        let id = trans.params()['id'];
        tagService.find(id).subscribe(tag => {
            // TODO Find a better way to format dates so that it works with NgbDatePicker
            const modalRef  = modalService.open(TagDialogComponent, { size: 'lg', backdrop: 'static'});
            modalRef.componentInstance.tag = tag;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('tag', null, { reload: 'tag' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};

export const tagDeleteState: Ng2StateDeclaration = {
    name: 'tag.delete',
    url: '/{id}/delete',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let tagService: TagService = trans.injector().get(TagService);
        let id = trans.params()['id'];
        tagService.find(id).subscribe(tag => {
            const modalRef  = modalService.open(TagDeleteDialogComponent, { size: 'md'});
            modalRef.componentInstance.tag = tag;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('tag', null, { reload: 'tag' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};
