module.exports = {
    'Checking button on home page': (browser) => {
        browser
            .init()
            .waitForElementVisible('body', 2000);

        browser.expect.element('.log-in').to.be.present;
        browser.expect.element('.onboard-demo').to.be.present;
        browser.expect.element('.onboard-signup').to.be.present;
    },

    'Test request demo button behavior': (browser) => {
        browser.click(".onboard-demo", function(response) {
            browser.expect.element('.mod-demo-request').to.be.visible;
            browser.pause(500);
            browser.click(".mod-demo-request .close-btn", function(response) {
            });
            browser.pause(1000);
            browser.expect.element('.mod-demo-request').to.not.be.visible;
        });
    },

    'Test get start button behavior': (browser) => {
        browser.click(".onboard-signup", function(response) {
            browser.expect.element('.mod-signup').to.be.visible;
            browser.pause(500);
            browser.click(".mod-signup .close-btn", function(response) {
            });
            browser.pause(1000);
            browser.expect.element('.mod-signup').to.not.be.visible;
        });
    },

    after: (browser) => {
        browser.pause(4000).end();
    }
};
