module.exports = {
    'Checking button on home page': (browser) => {
        browser
            .init()
            .waitForElementVisible('body', 2000);

        browser.expect.element('.log-in').to.be.present;
        browser.expect.element('.onboard-demo').to.be.present;
        browser.expect.element('.onboard-signup').to.be.present;
    },

    'Test request demo submission': (browser) => {
        browser.click(".onboard-demo", function(response) {
            browser.expect.element('.mod-demo-request').to.be.visible;
            browser.pause(500);
            browser.setValue(".mod-demo-request form input[name=name]", "Khanh");
            browser.setValue(".mod-demo-request form input[name=email]", "fakeemail@");
            browser.setValue(".mod-demo-request form input[name=phone]", "(123) 123-1234");
            browser.setValue(".mod-demo-request form input[name=brokerage_name]", "Brokerage1");
            browser.setValue(".mod-demo-request form input[name=number_of_agents]", 5);
            //Form submit error handling
            browser.click(".mod-demo-request button[type=submit]", function(response) {
                browser.expect.element("label.error[for=name]").to.not.be.visible;
                browser.expect.element("label.error[for=phone]").to.not.be.visible;
                browser.expect.element("label.error[for=email]").to.be.visible;
                browser.expect.element("label.error[for=brokerage_name]").to.not.be.visible;
                browser.expect.element("label.error[for=number_of_agents]").to.not.be.visible;
            });
            browser.pause(500);
            //Form submit success
            browser.clearValue(".mod-demo-request form input[name=email]");
            browser.setValue(".mod-demo-request form input[name=email]", "test@test.com");
            browser.click(".mod-demo-request button[type=submit]", function(response) {
                browser.pause(100);
                browser.expect.element(".mod-demo-request .alert-success").to.be.visible;
            });
            browser.click(".mod-demo-request .close-btn", function(response) {
            });
            browser.pause(500);
            browser.expect.element('.mod-demo-request').to.not.be.visible;
        });
    },

    'Test get start button behavior': (browser) => {
        browser.click(".onboard-signup", function(response) {
            browser.expect.element('.mod-signup').to.be.visible;
            browser.pause(500);
            browser.click(".mod-signup .close-btn", function(response) {
            });
            browser.pause(500);
            browser.expect.element('.mod-signup').to.not.be.visible;
        });
    },

    after: (browser) => {
        browser.pause(4000).end();
    }
};
