test('Contact Add test', async ({ page, request }) => {
    const contact = new ContactPage(page);
    await contact.contactAdd(
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
