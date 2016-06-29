module.exports = {
    'Go to homepage': (browser) => {
        browser
            .init()
            .waitForElementVisible('body', 2000);

        browser.expect.element('.log-in').to.be.present;
    },
    after: (browser)=> {
        browser.end()
    }
};
