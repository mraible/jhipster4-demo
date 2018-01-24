/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BlogTestModule } from '../../../test.module';
import { EntryDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entry/entry-delete-dialog.component';
import { EntryService } from '../../../../../../main/webapp/app/entities/entry/entry.service';

describe('Component Tests', () => {

    describe('Entry Management Delete Component', () => {
        let comp: EntryDeleteDialogComponent;
        let fixture: ComponentFixture<EntryDeleteDialogComponent>;
        let service: EntryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [EntryDeleteDialogComponent],
                providers: [
                    EntryService
                ]
            })
            .overrideTemplate(EntryDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
