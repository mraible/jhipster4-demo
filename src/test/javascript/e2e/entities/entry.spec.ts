import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Entry e2e test', () => {

    let navBarPage: NavBarPage;
    let entryDialogPage: EntryDialogPage;
    let entryComponentsPage: EntryComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Entries', () => {
        navBarPage.goToEntity('entry');
        entryComponentsPage = new EntryComponentsPage();
        expect(entryComponentsPage.getTitle()).toMatch(/blogApp.entry.home.title/);

    });

    it('should load create Entry dialog', () => {
        entryComponentsPage.clickOnCreateButton();
        entryDialogPage = new EntryDialogPage();
        expect(entryDialogPage.getModalTitle()).toMatch(/blogApp.entry.home.createOrEditLabel/);
        entryDialogPage.close();
    });

    it('should create and save Entries', () => {
        entryComponentsPage.clickOnCreateButton();
        entryDialogPage.setTitleInput('title');
        expect(entryDialogPage.getTitleInput()).toMatch('title');
        entryDialogPage.setContentInput('content');
        expect(entryDialogPage.getContentInput()).toMatch('content');
        entryDialogPage.setDateInput(12310020012301);
        expect(entryDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        entryDialogPage.blogSelectLastOption();
        // entryDialogPage.tagSelectLastOption();
        entryDialogPage.save();
        expect(entryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EntryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-entry div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EntryDialogPage {
    modalTitle = element(by.css('h4#myEntryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    contentInput = element(by.css('textarea#field_content'));
    dateInput = element(by.css('input#field_date'));
    blogSelect = element(by.css('select#field_blog'));
    tagSelect = element(by.css('select#field_tag'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function (title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function () {
        return this.titleInput.getAttribute('value');
    }

    setContentInput = function (content) {
        this.contentInput.sendKeys(content);
    }

    getContentInput = function () {
        return this.contentInput.getAttribute('value');
    }

    setDateInput = function (date) {
        this.dateInput.sendKeys(date);
    }

    getDateInput = function () {
        return this.dateInput.getAttribute('value');
    }

    blogSelectLastOption = function () {
        this.blogSelect.all(by.tagName('option')).last().click();
    }

    blogSelectOption = function (option) {
        this.blogSelect.sendKeys(option);
    }

    getBlogSelect = function () {
        return this.blogSelect;
    }

    getBlogSelectedOption = function () {
        return this.blogSelect.element(by.css('option:checked')).getText();
    }

    tagSelectLastOption = function () {
        this.tagSelect.all(by.tagName('option')).last().click();
    }

    tagSelectOption = function (option) {
        this.tagSelect.sendKeys(option);
    }

    getTagSelect = function () {
        return this.tagSelect;
    }

    getTagSelectedOption = function () {
        return this.tagSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
