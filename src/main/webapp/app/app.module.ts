
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from 'ui-router-ng2';
import { Ng2Webstorage } from 'ng2-webstorage';

import { BlogSharedModule } from './shared';
import { BlogAdminModule } from './admin/admin.module';
import { BlogEntityModule } from './entities/entity.module';
import { BlogAccountModule } from './account/account.module';

import { appState } from './app.state';
import { HomeComponent, homeState } from './home';
import { JhiRouterConfig } from './blocks/config/router.config';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent,
    errorState,
    accessdeniedState
} from './layouts';

let routerConfig = {
    configClass: JhiRouterConfig,
    useHash: true,
    states: [
        appState,
        homeState,
        errorState,
        accessdeniedState
    ]
};

@NgModule({
    imports: [
        BrowserModule,
        UIRouterModule.forRoot(routerConfig),
        Ng2Webstorage.forRoot({ prefix: 'jhi'}),
        BlogSharedModule,
        BlogAdminModule,
        BlogEntityModule,
        BlogAccountModule
    ],
    declarations: [
        JhiMainComponent,
        HomeComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        { provide: Window, useValue: window },
        { provide: Document, useValue: document },
        customHttpProvider(),
        PaginationConfig
    ],
    bootstrap: [ JhiMainComponent ]
})
export class BlogAppModule {}
