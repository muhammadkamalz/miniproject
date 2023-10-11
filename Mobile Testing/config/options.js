const path = require('path')
const options = {
    hostname : '0.0.0.0',

    port : 4723,

    logLevel : 'error',

    capabilities: {

        platformName: 'Android',
        'appium:deviceName' : 'HP Galaxy',
        'appium:automationName' : 'UiAutomator2',
        'appium:app' :  path.join(process.cwd(), 'apk/tixid.apk'),
        "appium:autoGrantPermissions" : "true",
        // 'appium:appActivity': 'id.tix.android.home.view.HomeNavigationActivity',
        // 'appium:noReset' : 'true',
        // 'appium:fullReset' : 'false'
    },
}

module.exports = options