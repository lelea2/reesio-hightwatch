module.exports = {

    beforeEach : function(browser) {
        browser.resizeWindow(320, 800); //make sure mobile size
        browser.deleteCookies(function() {});
        browser
            .init()
            .waitForElementVisible('body', 1000);
    },

    'Checking login page toggle signin signup form': (browser) => {
        browser.click(".mod-header .log-in", function(response) {
            browser.pause(200);
            /*browser.url(function(result) {
                this.assert.equal(result.value, 'https://www.reesio.com/users/sign_in');
            });*/
            browser.expect.element('.mod-signin').to.be.visible;
            browser.expect.element('.mod-signup').to.not.be.visible;
            browser.click("a[href='#createAccount']", function(response) {
                browser.expect.element('.mod-signup').to.be.visible;
                browser.expect.element('.mod-signin').to.not.be.visible;
                browser.click("a[href='#loginAccount']", function(response) {
                    browser.expect.element('.mod-signin').to.be.visible;
                    browser.expect.element('.mod-signup').to.not.be.visible;
                });
            });
        });
    },

    'Checking login failure handler': (browser) => {
        browser.click(".mod-header .log-in", function(response) {
            browser.pause(200);
            //Invalid email and password
            browser.setValue(".mod-signin form input[name='user[email]']", "Khanh");
            browser.setValue(".mod-signin form input[name='user[password]']", "");
            browser.click(".mod-signin button[type=submit]", function(response) {
                browser.expect.element("label.error[for='user_email']").to.be.visible;
                browser.expect.element("label.error[for='user_password'").to.be.visible;
            });

            //Invalid email
            browser.setValue(".mod-signin form input[name='user[email]']", "kdao@");
            browser.setValue(".mod-signin form input[name='user[password]']", "testing");
            browser.click(".mod-signin button[type=submit]", function(response) {
                browser.expect.element("label.error[for='user_email']").to.be.visible;
                browser.expect.element("label.error[for='user_password'").to.not.be.visible;
            });

            browser.clearValue(".mod-signin form input[name='user[email]']");
            browser.setValue(".mod-signin form input[name='user[email]']", "faketest@test.com");
            browser.setValue(".mod-signin form input[name='user[password]']", "fakepwd");
            browser.click(".mod-signin button[type=submit]", function(response) {
                browser.pause(100);
                browser.url(function(result) {
                    browser.expect.element(".rs-result-toast.alert.alert-danger").to.be.visible;
                    this.assert.equal(result.value, 'https://www.reesio.com/users/sign_in');
                });
            });
        });
    },

    'Checking redirect to login page and signin as paid brokerage': (browser) => {
        browser.click(".mod-header .log-in", function(response) {
            browser.pause(300);
            browser.setValue(".mod-signin form input[name='user[email]']", "khanh.dao@move.com");
            browser.setValue(".mod-signin form input[name='user[password]']", "testing123");
            browser.click(".mod-signin button[type=submit]", function(response) {
                browser.pause(300);
                browser.url(function(result) {
                    this.assert.equal(result.value, 'https://www.reesio.com/dashboard'); //TODO: https://www.reesio.com in config
                });
            });
        });
    },

    'Checking redirect to login page and signin as unpaid account': (browser) => {
        browser.click(".mod-header .log-in", function(response) {
            browser.pause(300);
            browser.setValue(".mod-signin form input[name='user[email]']", "khanh.dao@reesio.com");
            browser.setValue(".mod-signin form input[name='user[password]']", "testing123");
            browser.click(".mod-signin button[type=submit]", function(response) {
                browser.pause(300);
                browser.url(function(result) {
                    this.assert.equal(result.value, 'https://www.reesio.com/transactions');
                });
            });
        });
    },

    after: (browser) => {
        browser.pause(2000).end();
    }
};
