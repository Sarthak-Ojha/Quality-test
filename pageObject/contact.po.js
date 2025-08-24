const { expect } = require('@playwright/test');

exports.ContactPage = class ContactPage {
    constructor(page) {
        this.page = page;
        this.addContact = '//button[@id="add-contact"]';
        this.firstName = '#firstName';
        this.lastName = '#lastName';
        this.email = '//input[@id="email"]';
        this.phone = '//input[@id="phone"]';
        this.dob = '//input[@id="dob"]';
        this.address = '//input[@placeholder="Address1"]';
        this.city = '//input[@placeholder="city"]';
        this.country = '//input[@id="country"]';
        this.state = '//input[@id="state"]';
        this.save = '//button[@id="submit"]';
        this.saveFirstName = '//span[@id="firstName"]';
        this.saveLastName = '//span[@id="lastName"]';
        this.saveEmail = '//span[@id="email"]';
        this.savePhone = '//span[@id="phone"]';
        this.saveDob = '//span[@id="dob"]';
        this.saveAddress = '//span[@id="address1"]';
        this.saveCity = '//span[@id="city"]';
        this.saveCountry = '//span[@id="country"]';
        this.saveState = '//span[@id="state"]';
        this.viewCreatedContact = '//th[contains(text(),"First Name")]/following::td[1]';
        this.editContact = '//button[@id="edit-contact"]';
        this.deleteContact = '//button[@id="delete-contact"]';
        this.confirmDelete = '//button[@id="confirm-delete"]';
    }

    async contactAdd(firstName, lastName, email, phone, dob, address, city, country, state) {
        await this.page.locator(this.addContact).click();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.dob).fill(dob);
        await this.page.locator(this.address).fill(address);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.country).fill(country);
        await this.page.locator(this.state).fill(state);
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.save).click();
    }

    async validateContactCreated(firstName, lastName, email, phone, dob, address, city, country, state) {
        const fnameValidation = this.page.locator(this.saveFirstName);
        const lnameValidation = this.page.locator(this.saveLastName);
        const emailValidation = this.page.locator(this.saveEmail);
        const phoneValidation = this.page.locator(this.savePhone);
        const dobValidation = this.page.locator(this.saveDob);
        const addressValidation = this.page.locator(this.saveAddress);
        const cityValidation = this.page.locator(this.saveCity);
        const countryValidation = this.page.locator(this.saveCountry);
        const stateValidation = this.page.locator(this.saveState);
        
        await expect(fnameValidation).toHaveText(firstName);
        await expect(lnameValidation).toHaveText(lastName);
        await expect(emailValidation).toHaveText(email);
        await expect(phoneValidation).toHaveText(phone);
        await expect(dobValidation).toHaveText(dob);
        await expect(addressValidation).toHaveText(address);
        await expect(cityValidation).toHaveText(city);
        await expect(countryValidation).toHaveText(country);
        await expect(stateValidation).toHaveText(state);
    }

    async viewContact() {
        await this.page.locator(this.viewCreatedContact).click();
    }

    async contactEdit(firstName) {
        await this.page.locator(this.editContact).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.firstName).clear();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.save).click();
    }

    async contactDelete() {
        await this.page.waitForTimeout(2000);
            this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        
        await this.page.locator(this.deleteContact).click();
    }
}
