import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UIRouterModule } from 'ui-router-ng2';

import { BlogSharedModule } from '../shared';

import {
    Register,
    Activate,
    Password,
    PasswordResetInit,
    PasswordResetFinish,
    PasswordStrengthBarComponent,
    RegisterComponent,
    ActivateComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    settingsState,
    activateState,
    passwordState,
    finishResetState,
    requestResetState,
    registerState,
    accountState
} from './';

let ACCOUNT_STATES = [
    accountState,
    activateState,
    passwordState,
    finishResetState,
    requestResetState,
    registerState,
    settingsState
];

@NgModule({
    imports: [
        BlogSharedModule,
        UIRouterModule.forChild({ states: ACCOUNT_STATES })
    ],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent
    ],
    providers: [
        Register,
        Activate,
        Password,
        PasswordResetInit,
        PasswordResetFinish
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogAccountModule {}
