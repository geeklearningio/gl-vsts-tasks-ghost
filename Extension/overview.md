# Ghost Build and Release Tasks

[Ghost](https://ghostpkg.com/) is an amazing blogging platform. It is fast, reliable and now has an amazing editing experience. 

With this extension you can automate the publication of a theme to a Ghost blog instance. 

![Features](https://raw.githubusercontent.com/geeklearningio/gl-vsts-tasks-ghost/master/Extension/Screenshots/Branding-Main.png)

> Note: We support only ghost 1.24 and above

[Learn more](https://github.com/geeklearningio/gl-vsts-tasks-ghost/wiki) about this extension on the wiki!

## Tasks included

* **[Ghost theme uploader](https://github.com/geeklearningio/gl-vsts-tasks-ghost/wiki/Ghost-Theme-Uploader)**: Uploads a theme to ghost.

> TFS 2015 is not supported.

## Steps

This extension depends on Chromium. Due to extensions size limits it is not bundled with the tasks. 

You can install it thanks to the [Chromium Task](https://marketplace.visualstudio.com/items?itemName=schlumberger.chromium-build-tasks-Preview). (There's a known speed issue with the install speed. We submitted a patch which has been acceptd. So it shall be solved very soon)

Alternatively, if you are using Self Hosted agent, you can install it directly on your agent and set a `CHROMIUM_BIN` variable pointing to `chrome.exe` and also add a `chromium` capability to your agents.

## Learn more

The [source](https://github.com/geeklearningio/gl-vsts-tasks-ghost) for this extension is on GitHub. Take, fork, and extend.

## Known Issues

Please refer to our [wiki page on Github](https://github.com/geeklearningio/gl-vsts-tasks-ghost/wiki/Known-Issues)

## Release Notes

Please refer to our [release page on Github](https://github.com/geeklearningio/gl-vsts-tasks-ghost/releases)
