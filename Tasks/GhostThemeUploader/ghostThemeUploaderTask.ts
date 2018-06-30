import * as path from "path";
import * as tl from "vsts-task-lib/task";
import * as puppeteer from "puppeteer";

let themePath = tl.getPathInput("theme");
let takeScreenshots = tl.getBoolInput("takeScreenshots");
let screenshotPath = tl.getPathInput("screenshots");
let blogUrl = tl.getEndpointUrl("blog", false);
let blogAuth = tl.getEndpointAuthorization("blog", false);
console.log('endpoint params', Object.keys(blogAuth));

async function takeScreenshot(page: puppeteer.Page, name: string) {
    if (takeScreenshots) {
        await takeScreenshot(page, path.join(screenshotPath, name));
}
}

async function themeUpload() {
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        console.log('Opening blog: ', blogUrl);

        const separator = blogUrl.endsWith('/') ? '' : '/';

        await page.goto(`${blogUrl}${separator}admin`);
        await takeScreenshot(page, '.debug/login.navigated.png');

        await page.waitFor('input[name=identification]')
        await takeScreenshot(page, '.debug/login.loaded.png');

        const userName = blogAuth.parameters['username'];
        const password = blogAuth.parameters['password'];

        console.log('Logging in with  ', userName);
        await page.type('input[name=identification]', userName);
        await page.type('input[name=password]', password);
        await takeScreenshot(page, '.debug/login.filled.png');
        await page.click('button.login');
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await takeScreenshot(page, '.debug/login.done.png');
        console.log('Logged in with  ', userName);

        await page.goto(page.url() + 'settings/design', { waitUntil: 'networkidle0' });
        await takeScreenshot(page, '.debug/theme.page.png');

        console.log('Navigating to the design section');
        await page.waitFor('a.gh-themes-uploadbtn')
        await page.click('a.gh-themes-uploadbtn');
        await takeScreenshot(page, '.debug/theme.upload.png');

        console.log('Uploading theme: ', themePath);
        var themeUpload = await page.$('input[type=file]');
        await themeUpload.uploadFile(themePath);
        await takeScreenshot(page, '.debug/theme.file.png');

        await page.waitFor('button.gh-btn-red');
        await page.click('button.gh-btn-red');
        await takeScreenshot(page, '.debug/theme.uploading.png');

        await page.waitFor("//h1[contains(.,'Upload successful!')]", {})
        await takeScreenshot(page, '.debug/complete.png');
        console.log('Uploading complete: ', themePath);

    } catch (err) {
        tl.debug(String(err));
        if (err.stack) {
            tl.debug(err.stack);
        }
        tl.setResult(tl.TaskResult.Failed, String(err));
    } finally {
        browser.close();
    }
}

themeUpload();
