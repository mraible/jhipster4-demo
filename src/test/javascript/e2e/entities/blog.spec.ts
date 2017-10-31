import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Blog e2e test', () => {

    let navBarPage: NavBarPage;
    let blogDialogPage: BlogDialogPage;
    let blogComponentsPage: BlogComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Blogs', () => {
        navBarPage.goToEntity('blog');
        blogComponentsPage = new BlogComponentsPage();
        expect(blogComponentsPage.getTitle()).toMatch(/blogApp.blog.home.title/);

    });

    it('should load create Blog dialog', () => {
        blogComponentsPage.clickOnCreateButton();
        blogDialogPage = new BlogDialogPage();
        expect(blogDialogPage.getModalTitle()).toMatch(/blogApp.blog.home.createOrEditLabel/);
        blogDialogPage.close();
    });

    it('should create and save Blogs', () => {
        blogComponentsPage.clickOnCreateButton();
        blogDialogPage.setNameInput('name');
        expect(blogDialogPage.getNameInput()).toMatch('name');
        blogDialogPage.setHandleInput('handle');
        expect(blogDialogPage.getHandleInput()).toMatch('handle');
        blogDialogPage.userSelectLastOption();
        blogDialogPage.save();
        expect(blogDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BlogComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-blog div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BlogDialogPage {
    modalTitle = element(by.css('h4#myBlogLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    handleInput = element(by.css('input#field_handle'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setHandleInput = function (handle) {
        this.handleInput.sendKeys(handle);
    }

    getHandleInput = function () {
        return this.handleInput.getAttribute('value');
    }

    userSelectLastOption = function () {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function (option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function () {
        return this.userSelect;
    }

    getUserSelectedOption = function () {
        return this.userSelect.element(by.css('option:checked')).getText();
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
