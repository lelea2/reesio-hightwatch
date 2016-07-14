POC for integration testing with nightwatch

##Getting Started

Install deps :
`npm install`

To run Acceptance test, just run :
`npm test`


## Explanations

The project is organize as following :
 * nw/logs : Selenium log
 * nw/reports : xUnit reports
 * nw/tests : Test suites
 * nightwatch.json : Nightwatch configuration file
 * nightwatch.gloabls.js : Nightwatch globals file


Command to run

```
# Run full test suite
npm test

# Run selected test suite
node_modules/nightwatch/bin/nightwatch -t nw/tests/homepage.test.js

```
