const  axios = require('axios');
import { except } from '@playwright/test';

let apiUrl

async function authenticateUser(userName, password, { request} ) {
    const apiUrl = await getApiUrlBase();
    const headers ={
        'Content-Type': 'application/json',
    };
    const requestbody = {
        email: username,
        password: password,
    };
    const response = await request.post(`${apiUrl}/auth/login`, {
        data: requestbody,
        headers,
    });
    except(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}
async function getApiUrlBase() {
    apiUrl = process.env.API_BASE_URL;
    if (!apiUrl) {
        apiUrl = 'https://thinking-tester-contact-list.herokuapp.com';
    }
    return apiUrl;
}
async function createEntity(userData ,accessToken, module,  { request }) {
    const apiUrl = await getApiUrlBase();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: "Bearer " + accessToken,
    };
    const response = await request.post(apiUrl + module, {
        headers,
        data: JSON.stringify(userData),
    });
    const responseBody = await response.json();
    const statusCode = response.status();
    except(statusCode).toBe(201);
    if (responseBody && responseBody.id) {
        return responseBody.id;
    } else {
        return null;
    }
}

