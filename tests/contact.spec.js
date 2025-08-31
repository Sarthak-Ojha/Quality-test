import { test } from '@playwright/test';
import { LoginPage } from '../pageObject/login.po.js';
import { ContactPage } from '../pageObject/contact.po.js';
import { access } from 'fs';
const testData = require('../testData/contact.json');
const contactTestData = require('../../fixtures/contactFixtures.json');
const { authenticateUser, getApiUrlBase, createEntity } = require('../tests/helper.spec.js');

// Add missing helper functions
async function getEntity(accessToken, endpoint, expectedStatus, { request }) {
    const apiUrl = await getApiUrlBase();
    const response = await request.get(apiUrl + endpoint, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    expect(response.status()).toBe(parseInt(expectedStatus));
    const responseBody = await response.json();
    return responseBody.id || responseBody[0]?.id; // Return first contact ID
}

async function deleteEntity(accessToken, endpoint, expectedStatus, { request }) {
    const apiUrl = await getApiUrlBase();
    const response = await request.delete(apiUrl + endpoint, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    expect(response.status()).toBe(parseInt(expectedStatus));
}

async function validateEntity(accessToken, endpoint, expectedStatus, { request }) {
    const apiUrl = await getApiUrlBase();
    const response = await request.get(apiUrl + endpoint, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    expect(response.status()).toBe(parseInt(expectedStatus));
}

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://example.com/login');
    await loginPage.login(testData.username, testData.password);
    await loginPage.verifyValidlogin();
});

test.describe('Contact testcases', () => {
    test('Contact Add test', async ({ page, request }) => {
        const contact = new ContactPage(page);
        await contact.contactAdd(
            contactTestData.firstName,
            contactTestData.lastName,
      hj      contactTestData.email,
            contactTestData.phone,
            contactTestData.dob,
            contactTestData.address,
            contactTestData.city,
            contactTestData.country,
            contactTestData.state
            cessToken = await authenticateUser(testData.validUser.email, testData.validUser.password, { request }
            const id = await getEntity(accessToken, '/contacts', '200', { request }
            await deleteEntity(accessToken, `/contacts/${id}`, '204', { request }
            await validateEntity(accessToken, `/contacts/${id}`, '404', { request }
        })
        
        await contact.viewContact();
        await contact.validateContactCreated(
            contactTestData.firstName,
            contactTestData.lastName,
            contactTestData.email,
            contactTestData.phone,
            contactTestData.dob,
            contactTestData.address,
            contactTestData.city,
            contactTestData.country,
            contactTestData.state
        );
        
        // API cleanup
        const accessToken = await authenticateUser(testData.validUser.email, testData.validUser.password, { request });
        const id = await getEntity(accessToken, '/contacts', '200', { request });
        await deleteEntity(accessToken, `/contacts/${id}`, '204', { request });
        await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
    });

    test.only('Contact Edit test', async ({ page, request }) => {
        const contactData = {
            firstName: "ram",
            lastName: "kumar",
            email: "ram@gmail.com",
            phone: "1234567890",
            dob: "1990-01-01",
            address: "123 Main St",
            city: "New York",
            country: "USA",
            state: "NY"
        };
        
        const contact = new ContactPage(page);
        
        // Create contact via API first
        const accessToken = await authenticateUser(testData.validUser.email, testData.validUser.password, { request });
        await createEntity(contactData, accessToken, '/contacts', { request });
        
        // Reload page to see the new contact
        await page.reload();
        
        // Edit contact via UI
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.viewContact();
        
        // API cleanup
        const id = await getEntity(accessToken, '/contacts', '200', { request });
        await deleteEntity(accessToken, `/contacts/${id}`, '204', { request });
        await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
    });
});
j