import { Injector } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { EventManager, InterceptableHttp } from 'ng-jhipster';

import { AuthInterceptor } from './auth.interceptor';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { AuthExpiredInterceptor } from './auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './errorhandler.interceptor';
import { NotificationInterceptor } from './notification.interceptor';

export const customHttpProvider = () => ({
    provide: Http,
    useFactory: (
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        localStorage: LocalStorageService,
        sessionStorage: SessionStorageService,
        injector: Injector,
        eventManager: EventManager
    ) => new InterceptableHttp(
        backend,
        defaultOptions,
        [
            new AuthInterceptor(localStorage, sessionStorage),
            new AuthExpiredInterceptor(injector),
            // Other interceptors can be added here
            new ErrorHandlerInterceptor(eventManager),
            new NotificationInterceptor()
        ]
    ),
    deps: [
        XHRBackend,
        RequestOptions,
        LocalStorageService,
        SessionStorageService,
        Injector,
        EventManager
    ]
});
