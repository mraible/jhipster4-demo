import { Ng2StateDeclaration } from "ui-router-ng2";
import { JhiLanguageService } from 'ng-jhipster';
import { JhiHealthCheckComponent } from './health.component';

export const healthState: Ng2StateDeclaration = {
    name: 'jhi-health',
    parent: 'admin',
    url: '/health',
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'health.title'
    },
    views: {
        'content@': { component: JhiHealthCheckComponent }
    },
    resolve: [{
        token: 'translate',
        deps: [JhiLanguageService],
        resolveFn: (languageService) => languageService.setLocations(['health'])
    }]
};
