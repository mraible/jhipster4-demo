import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { ParseLinks } from 'ng-jhipster';

import { BlogSharedModule } from '../shared';

import {
    AuditsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiMetricsMonitoringModalComponent,
    JhiMetricsMonitoringComponent,
    JhiHealthModalComponent,
    JhiHealthCheckComponent,
    JhiConfigurationComponent,
    JhiDocsComponent,
    AuditsService,
    UserService,
    JhiConfigurationService,
    JhiHealthService,
    JhiMetricsService,
    LogsService,
    adminState,
    auditState,
    configState,
    docsState,
    healthState,
    logsState,
    userMgmtState,
    userMgmtDetailState,
    userMgmtNewState,
    userMgmtEditState,
    userMgmtDeleteState,
    metricsState
} from './';

let ADMIN_STATES = [
    adminState,
    auditState,
    configState,
    docsState,
    healthState,
    logsState,
    userMgmtState,
    userMgmtDetailState,
    userMgmtNewState,
    userMgmtEditState,
    userMgmtDeleteState,
    metricsState
];

@NgModule({
    imports: [
        BlogSharedModule,
        UIRouterModule.forChild({ states: ADMIN_STATES })
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        LogsComponent,
        JhiConfigurationComponent,
        JhiHealthCheckComponent,
        JhiHealthModalComponent,
        JhiDocsComponent,
        JhiMetricsMonitoringComponent,
        JhiMetricsMonitoringModalComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        JhiHealthModalComponent,
        JhiMetricsMonitoringModalComponent,
    ],
    providers: [
        AuditsService,
        UserService,
        JhiConfigurationService,
        JhiHealthService,
        JhiMetricsService,
        LogsService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogAdminModule {}
