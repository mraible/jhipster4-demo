import { Ng2StateDeclaration } from "ui-router-ng2";
import { JhiLanguageService } from 'ng-jhipster';
import { JhiMetricsMonitoringComponent } from './metrics.component';

export const metricsState: Ng2StateDeclaration = {
    name: 'jhi-metrics',
    parent: 'admin',
    url: '/metrics',
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'metrics.title'
    },
    views: {
        'content@': { component: JhiMetricsMonitoringComponent }
    },
    resolve: [{
        token: 'translate',
        deps: [JhiLanguageService],
        resolveFn: (languageService) => languageService.setLocations(['metrics'])
    }]
};
