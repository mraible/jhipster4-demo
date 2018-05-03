/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlogTestModule } from '../../../test.module';
import { EntryDetailComponent } from '../../../../../../main/webapp/app/entities/entry/entry-detail.component';
import { EntryService } from '../../../../../../main/webapp/app/entities/entry/entry.service';
import { Entry } from '../../../../../../main/webapp/app/entities/entry/entry.model';

describe('Component Tests', () => {

    describe('Entry Management Detail Component', () => {
        let comp: EntryDetailComponent;
        let fixture: ComponentFixture<EntryDetailComponent>;
        let service: EntryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [EntryDetailComponent],
                providers: [
                    EntryService
                ]
            })
            .overrideTemplate(EntryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Entry(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entry).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
