import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { BlogSharedModule } from '../shared';
import {
    entityState,
    BlogService,
    BlogComponent,
    BlogDetailComponent,
    BlogDialogComponent,
    BlogDeleteDialogComponent,
    blogState,
    blogDetailState,
    blogNewState,
    blogEditState,
    blogDeleteState,
    EntryService,
    EntryComponent,
    EntryDetailComponent,
    EntryDialogComponent,
    EntryDeleteDialogComponent,
    entryState,
    entryDetailState,
    entryNewState,
    entryEditState,
    entryDeleteState,
    TagService,
    TagComponent,
    TagDetailComponent,
    TagDialogComponent,
    TagDeleteDialogComponent,
    tagState,
    tagDetailState,
    tagNewState,
    tagEditState,
    tagDeleteState,
    /* jhipster-needle-add-entity-to-module-import - JHipster will add entity classes here */
} from './';

let ENTITY_STATES = [
    entityState,
    blogState,
    blogNewState,
    blogDetailState,
    blogEditState,
    blogDeleteState,
    entryState,
    entryNewState,
    entryDetailState,
    entryEditState,
    entryDeleteState,
    tagState,
    tagNewState,
    tagDetailState,
    tagEditState,
    tagDeleteState,
    /* jhipster-needle-add-entity-to-module-states - JHipster will add entity state vars here */
];

@NgModule({
    imports: [
        BlogSharedModule,
        InfiniteScrollModule,
        UIRouterModule.forChild({ states: ENTITY_STATES })
    ],
    declarations: [
        BlogComponent,
        BlogDetailComponent,
        BlogDialogComponent,
        BlogDeleteDialogComponent,
        EntryComponent,
        EntryDetailComponent,
        EntryDialogComponent,
        EntryDeleteDialogComponent,
        TagComponent,
        TagDetailComponent,
        TagDialogComponent,
        TagDeleteDialogComponent,
        /* jhipster-needle-add-entity-to-module-declarations - JHipster will add entity component classes here */
    ],
    entryComponents: [
        BlogDialogComponent,
        BlogDeleteDialogComponent,
        EntryDialogComponent,
        EntryDeleteDialogComponent,
        TagDialogComponent,
        TagDeleteDialogComponent,
        /* jhipster-needle-add-entity-to-module-entryComponents - JHipster will add entity dialog classes here */
    ],
    providers: [
        BlogService,
        EntryService,
        TagService,
        /* jhipster-needle-add-entity-to-module-providers - JHipster will add entity Service classes here */
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntityModule {}

