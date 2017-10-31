/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BlogTestModule } from '../../../test.module';
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
                imports: [BlogTestModule],
                declarations: [BlogDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BlogService,
                    JhiEventManager
                ]
            }).overrideTemplate(BlogDetailComponent, '')
            .compileComponents();
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
            expect(comp.blog).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
