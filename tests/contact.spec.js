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
});
