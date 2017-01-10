import { Transition, Ng2StateDeclaration } from 'ui-router-ng2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, PaginationUtil } from 'ng-jhipster';

import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogDialogComponent } from './blog-dialog.component';
import { BlogDeleteDialogComponent } from './blog-delete-dialog.component';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';

export const blogState: Ng2StateDeclaration = {
    name: 'blog',
    parent: 'entity',
    url: '/blog',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.blog.home.title'
    },
    views: {
        'content@': { component: BlogComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService) => languageService.setLocations(['blog'])
        }
    ]
};

export const blogDetailState: Ng2StateDeclaration = {
    name: 'blog-detail',
    parent: 'entity',
    url: '/blog/:id',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'blogApp.blog.detail.title'
    },
    views: {
        'content@': { component: BlogDetailComponent }
    },
    resolve: [
        {
            token: 'translate',
            deps: [JhiLanguageService],
            resolveFn: (languageService) => languageService.setLocations(['blog'])
        },
        {
            token: 'previousState',
            deps: [Transition],
            resolveFn: (trans: Transition) => {
                // TODO this needs to be tested
                const stateParams = trans.params();
                const stateService = trans.router.stateService;
                const currentStateData = {
                    name: stateService.current.name || 'blog',
                    params: stateParams,
                    url: stateService.href(stateService.current.name, stateParams)
                };
                return currentStateData;
            }
        }
    ]
};

export const blogNewState: Ng2StateDeclaration = {
    name: 'blog.new',
    url: '/new',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        const modalRef  = modalService.open(BlogDialogComponent, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.blog = new Blog();
        modalRef.result.then((result) => {
            console.log(`Closed with: ${result}`);
            $state.go('blog', null, { reload: 'blog' });
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
            $state.go('blog');
        });
    }
};

export const blogEditState: Ng2StateDeclaration = {
    name: 'blog.edit',
    url: '/{id}/edit',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let blogService: BlogService = trans.injector().get(BlogService);
        let id = trans.params()['id'];
        blogService.find(id).subscribe(blog => {
            // TODO Find a better way to format dates so that it works with NgbDatePicker
            const modalRef  = modalService.open(BlogDialogComponent, { size: 'lg', backdrop: 'static'});
            modalRef.componentInstance.blog = blog;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('blog', null, { reload: 'blog' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};

export const blogDeleteState: Ng2StateDeclaration = {
    name: 'blog.delete',
    url: '/{id}/delete',
    data: {
        authorities: ['ROLE_USER']
    },
    onEnter: (trans: Transition) => {
        let $state = trans.router.stateService;
        let modalService = trans.injector().get(NgbModal);
        let blogService: BlogService = trans.injector().get(BlogService);
        let id = trans.params()['id'];
        blogService.find(id).subscribe(blog => {
            const modalRef  = modalService.open(BlogDeleteDialogComponent, { size: 'md'});
            modalRef.componentInstance.blog = blog;
            modalRef.result.then((result) => {
                console.log(`Closed with: ${result}`);
                $state.go('blog', null, { reload: 'blog' });
            }, (reason) => {
                console.log(`Dismissed ${reason}`);
                $state.go('^');
            });
        });
    }
};
