/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { EntryComponent } from '../../../../../../main/webapp/app/entities/entry/entry.component';
import { EntryService } from '../../../../../../main/webapp/app/entities/entry/entry.service';
import { Entry } from '../../../../../../main/webapp/app/entities/entry/entry.model';

describe('Component Tests', () => {

    describe('Entry Management Component', () => {
        let comp: EntryComponent;
        let fixture: ComponentFixture<EntryComponent>;
        let service: EntryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [EntryComponent],
                providers: [
                    EntryService
                ]
            })
            .overrideTemplate(EntryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Entry(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
