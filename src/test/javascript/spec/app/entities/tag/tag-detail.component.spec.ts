import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TagDetailComponent } from '../../../../../../main/webapp/app/entities/tag/tag-detail.component';
import { TagService } from '../../../../../../main/webapp/app/entities/tag/tag.service';
import { Tag } from '../../../../../../main/webapp/app/entities/tag/tag.model';

describe('Component Tests', () => {

    describe('Tag Management Detail Component', () => {
        let comp: TagDetailComponent;
        let fixture: ComponentFixture<TagDetailComponent>;
        let service: TagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TagDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    TagService
                ]
            }).overrideComponent(TagDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TagService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Tag(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tag).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
