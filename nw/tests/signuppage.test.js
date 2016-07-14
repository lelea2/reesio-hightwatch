var faker = require('faker');

module.exports = {

    beforeEach : function(browser) {
        browser.resizeWindow(320, 800); //make sure mobile size
        browser
            .init()
            .waitForElementVisible('body', 1000);
    },

    'Check signup flow': (browser) => {
        browser.click(".landing-actions .onboard-signup", function(response) {
            browser.pause(200);
            //Missing field
            browser.setValue(".mod-signup form input[name='user[first_name]']", "Khanh");
            browser.setValue(".mod-signup form input[name='user[last_name]']", "");
            browser.setValue(".mod-signup form input[name='user[phone]']", "Khanh");
            browser.setValue(".mod-signup form input[name='user[email]']", "Khanh");
            browser.setValue(".mod-signup form input[name='user[password]']", "");
            browser.click(".mod-signup button[type=submit]", function(response) {
                browser.expect.element(".mod-signup label.error[for='user_lastname']").to.be.visible;
                browser.expect.element(".mod-signup label.error[for='user_phone'").to.be.visible;
                browser.expect.element(".mod-signup label.error[for='user_email'").to.be.visible;
                browser.expect.element(".mod-signup label.error[for='user_password'").to.be.visible;
            });

            //Invalid email and password
            browser.setValue(".mod-signup form input[name='user[first_name]']", "Khanh");
            browser.setValue(".mod-signup form input[name='user[last_name]']", "Test");
            browser.setValue(".mod-signup form input[name='user[phone]']", "(408)212-1212");
            browser.setValue(".mod-signup form input[name='user[email]']", "Khanh@");
            browser.setValue(".mod-signup form input[name='user[password]']", "test");
            browser.click(".mod-signup button[type=submit]", function(response) {
                browser.expect.element(".mod-signup label.error[for='user_email'").to.be.visible;
                browser.expect.element(".mod-signup label.error[for='user_password'").to.be.visible;
            });
        });
    },

    after: (browser) => {
        browser.pause(2000).end();
    }

};
