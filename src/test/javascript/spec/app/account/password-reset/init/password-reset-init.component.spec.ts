import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { Renderer, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../../helpers/mock-language.service';
import { PasswordResetInitComponent } from '../../../../../../../main/webapp/app/account/password-reset/init/password-reset-init.component';
import { PasswordResetInit } from '../../../../../../../main/webapp/app/account/password-reset/init/password-reset-init.service';


describe('Component Tests', () => {

    describe('PasswordResetInitComponent', function () {
        let fixture: ComponentFixture<PasswordResetInitComponent>;
        let comp: PasswordResetInitComponent;

        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                declarations: [PasswordResetInitComponent],
                providers: [MockBackend,
                    PasswordResetInit,
                    BaseRequestOptions,
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
                    {
                        provide: Renderer,
                        useValue: {
                            invokeElementMethod(renderElement: any, methodName: string, args?: any[]) {}
                        }
                    },
                    {
                        provide: ElementRef,
                        useValue: new ElementRef(null)
                    }
                ]
            }).overrideComponent(PasswordResetInitComponent, {
                set: {
                    template: ''
                }
            }).createComponent(PasswordResetInitComponent);
            comp = fixture.componentInstance;
            comp.ngOnInit();
        });

        it('should define its initial state', function () {
            expect(comp.success).toBeUndefined();
            expect(comp.error).toBeUndefined();
            expect(comp.errorEmailNotExists).toBeUndefined();
            expect(comp.resetAccount).toEqual({});
        });

        it('sets focus after the view has been initialized',
            inject([ElementRef], (elementRef: ElementRef) => {
                let element = fixture.nativeElement;
                let node = {
                    focus() {}
                };

                elementRef.nativeElement = element;
                spyOn(element, 'querySelector').and.returnValue(node);
                spyOn(node, 'focus');

                comp.ngAfterViewInit();

                expect(element.querySelector).toHaveBeenCalledWith('#email');
                expect(node.focus).toHaveBeenCalled();
            })
        );

        it('notifies of success upon successful requestReset',
            inject([PasswordResetInit], (service: PasswordResetInit) => {
                spyOn(service, 'save').and.returnValue(Observable.of({}));
                comp.resetAccount.email = 'user@domain.com';

                comp.requestReset();

                expect(service.save).toHaveBeenCalledWith('user@domain.com');
                expect(comp.success).toEqual('OK');
                expect(comp.error).toBeNull();
                expect(comp.errorEmailNotExists).toBeNull();
            })
        );

        it('notifies of unknown email upon e-mail address not registered/400',
            inject([PasswordResetInit], (service: PasswordResetInit) => {
                spyOn(service, 'save').and.returnValue(Observable.throw({
                    status: 400,
                    data: 'e-mail address not registered'
                }));
                comp.resetAccount.email = 'user@domain.com';

                comp.requestReset();

                expect(service.save).toHaveBeenCalledWith('user@domain.com');
                expect(comp.success).toBeNull();
                expect(comp.error).toBeNull();
                expect(comp.errorEmailNotExists).toEqual('ERROR');
            })
        );

        it('notifies of error upon error response',
            inject([PasswordResetInit], (service: PasswordResetInit) => {
                spyOn(service, 'save').and.returnValue(Observable.throw({
                    status: 503,
                    data: 'something else'
                }));
                comp.resetAccount.email = 'user@domain.com';

                comp.requestReset();

                expect(service.save).toHaveBeenCalledWith('user@domain.com');
                expect(comp.success).toBeNull();
                expect(comp.errorEmailNotExists).toBeNull();
                expect(comp.error).toEqual('ERROR');
            })
        );

    });
});
