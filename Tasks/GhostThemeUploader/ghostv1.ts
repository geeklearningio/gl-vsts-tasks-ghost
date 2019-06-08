import * as path from "path";
import * as fs from "fs-extra";
import * as puppeteer from "puppeteer";
import * as tl from "azure-pipelines-task-lib/task";

export async function themeUploadV1() {
  let chromiumBinVariable = tl.getVariable("CHROMIUM_BIN");
  let screenshotPath = tl.getPathInput("screenshotPath");
  let themePath = tl.getPathInput("theme");
  let takeScreenshotsEnabled = tl.getBoolInput("takeScreenshots");
  let blogEndpoint = tl.getInput("blog");
  let blogUrl = tl.getEndpointUrl(blogEndpoint, false);
  let blogAuth = tl.getEndpointAuthorization(blogEndpoint, false);
  let uploadTimeout = parseInt(tl.getInput("uploadTimeout"));

  let screenshotCount = 0;

  async function takeScreenshot(page: puppeteer.Page, name: string) {
    if (takeScreenshotsEnabled) {
      await page.screenshot({
        path: path.join(screenshotPath, `${screenshotCount}_${name}`)
      });
      screenshotCount++;
    }
  }

  const searchLocation = [
    chromiumBinVariable,
    path.join(
      process.env["programfiles(x86)"],
      "/google/chrome/Application/chrome.exe"
    )
  ];

  let chromium = undefined;
  for (let candidate of searchLocation) {
    if (fs.existsSync(candidate)) {
      chromium = candidate;
      break;
    }
  }

  if (!chromium) {
    tl.setResult(
      tl.TaskResult.Failed,
      "Chromium was not found. Please install it"
    );
    return;
  }

  const browser = await puppeteer.launch({
    executablePath: chromium,
    args: ["--window-size=1920,1080"]
  });
  const page = await browser.newPage();
  await fs.ensureDir(screenshotPath);
  try {
    console.log("Opening blog: ", blogUrl);

    const separator = blogUrl.endsWith("/") ? "" : "/";

    await page.goto(`${blogUrl}${separator}admin`);
    await takeScreenshot(page, "login.navigated.png");

    await page.waitFor("input[name=identification]");
    await takeScreenshot(page, "login.loaded.png");

    const userName = blogAuth.parameters["username"];
    const password = blogAuth.parameters["password"];

    console.log("Logging in with  ", userName);
    await page.type("input[name=identification]", userName);
    await page.type("input[name=password]", password);
    await takeScreenshot(page, "login.filled.png");
    await page.click("button.login");
    try {
      await page.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: 7500
      });
      await takeScreenshot(page, "login.done.png");
      console.log("Logged in with  ", userName);
    } catch (err) {
      var mainError = await page.$("p.main-error");
      if (mainError != null) {
        var message = (await page.evaluate(
          el => el.innerText,
          mainError
        )) as string;
        throw new Error(message);
      } else {
        throw err;
      }
    }

    await page.goto(page.url() + "settings/design", {
      waitUntil: "networkidle0"
    });
    await takeScreenshot(page, "theme.page.png");

    console.log("Navigating to the design section");
    await page.waitFor("a.gh-themes-uploadbtn");
    await page.click("a.gh-themes-uploadbtn");
    await takeScreenshot(page, "theme.upload.png");

    console.log("Uploading theme: ", themePath);
    var themeUpload = await page.$("input[type=file]");
    await themeUpload.uploadFile(themePath);
    await takeScreenshot(page, "theme.file.png");

    try {
      // if overwrite message
      await page.waitFor("button.gh-btn-red", { timeout: 7500 });

      await page.click("button.gh-btn-red");
      await takeScreenshot(page, "theme.uploading.png");
    } catch (err) {}

    await page.waitForXPath("//h1[contains(.,'Upload successful!')]", {
      timeout: uploadTimeout * 1000
    });
    await takeScreenshot(page, "complete.png");
    console.log("Uploading complete: ", themePath);
  } catch (err) {
    tl.debug(String(err));
    if (err.stack) {
      tl.debug(err.stack);
    }
    tl.setResult(tl.TaskResult.Failed, String(err));
    await takeScreenshot(page, "failure.png");
  } finally {
    browser.close();

    if (takeScreenshotsEnabled) {
      let data = {
        artifacttype: "container",
        artifactname: "screenshots",
        containerfolder: "screenshots",
        localpath: screenshotPath
      };

      tl.command("artifact.upload", data, screenshotPath);
    }
  }
}
