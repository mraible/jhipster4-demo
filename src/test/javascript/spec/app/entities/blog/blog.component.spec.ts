/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { BlogComponent } from '../../../../../../main/webapp/app/entities/blog/blog.component';
import { BlogService } from '../../../../../../main/webapp/app/entities/blog/blog.service';
import { Blog } from '../../../../../../main/webapp/app/entities/blog/blog.model';

describe('Component Tests', () => {

    describe('Blog Management Component', () => {
        let comp: BlogComponent;
        let fixture: ComponentFixture<BlogComponent>;
        let service: BlogService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [BlogComponent],
                providers: [
                    BlogService
                ]
            })
            .overrideTemplate(BlogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlogService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Blog(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.blogs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
