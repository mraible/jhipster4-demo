/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { BlogTestModule } from '../../../test.module';
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
                imports: [BlogTestModule],
                declarations: [TagDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TagService,
                    JhiEventManager
                ]
            }).overrideTemplate(TagDetailComponent, '')
            .compileComponents();
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
            expect(comp.tag).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
