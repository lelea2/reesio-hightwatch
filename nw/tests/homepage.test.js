module.exports = {
    'Checking button on home page': (browser) => {
        browser.resizeWindow(320, 800); //make sure mobile size
        browser
            .init()
            .waitForElementVisible('body', 2000);

        browser.assert.title("Reesio | Home");
        browser.expect.element('.mod-header .log-in').to.be.present;
        browser.expect.element('.demo .onboard-demo').to.be.present;
        browser.expect.element('.signup .onboard-signup').to.be.present;
        browser.expect.element('a.benefits').to.be.present;
    },

    'Test sidebar menu in homepage': (browser) => {
        browser.click(".mod-header .info-menu", function(response) {
            browser.expect.element(".mod-info-menu .body").to.be.visible;
            browser.expect.element(".links a:nth-child(1)").to.have.attribute("href").equals("https://www.reesio.com/features");
            browser.expect.element(".links a:nth-child(2)").to.have.attribute("href").contains("https://www.reesio.com/#pricing");
            browser.expect.element(".links a:nth-child(3)").to.have.attribute("href").contains("https://www.reesio.com/how-it-works");
            browser.expect.element(".links a:nth-child(4)").to.have.attribute("href").contains("https://www.reesio.com/faq");
            browser.assert.cssClassPresent(".mod-info-menu", "visible");
        });
        browser.pause(300);
        browser.click(".mod-info-menu .toolbar span.pull-left", function(response) {
            browser.assert.cssClassNotPresent(".mod-info-menu", "visible");
        });
        browser.pause(100);
    },

    'Test request demo submission': (browser) => {
        browser.click(".landing-actions .onboard-demo", function(response) {
            browser.expect.element('.mod-demo-request').to.be.visible;
            browser.pause(300);
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
        browser.click(".landing-actions .onboard-signup", function(response) {
            browser.expect.element('.mod-signup').to.be.visible;
            browser.pause(300);
            browser.click(".mod-signup .close-btn", function(response) {
            });
            browser.pause(300);
            browser.expect.element('.mod-signup').to.not.be.visible;
        });
    },

    after: (browser) => {
        browser.pause(2000).end();
    }
};
