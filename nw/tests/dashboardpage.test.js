module.exports = {

    beforeEach : function(browser) {
        browser.deleteCookies(function() {
            // do something more in here
        });
        browser
            .init()
            .waitForElementVisible('body', 1000);
    },

    'Checking dashboard content': (browser) => {

    },


    after: (browser) => {
        browser.pause(2000).end();
    }

};
