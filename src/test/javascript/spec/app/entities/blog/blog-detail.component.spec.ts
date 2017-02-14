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
import { BlogDetailComponent } from '../../../../../../main/webapp/app/entities/blog/blog-detail.component';
import { BlogService } from '../../../../../../main/webapp/app/entities/blog/blog.service';
import { Blog } from '../../../../../../main/webapp/app/entities/blog/blog.model';

describe('Component Tests', () => {

    describe('Blog Management Detail Component', () => {
        let comp: BlogDetailComponent;
        let fixture: ComponentFixture<BlogDetailComponent>;
        let service: BlogService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [BlogDetailComponent],
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
                    BlogService
                ]
            }).overrideComponent(BlogDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlogDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlogService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Blog(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.blog).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
