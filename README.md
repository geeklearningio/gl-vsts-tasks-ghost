![Icon](https://github.com/geeklearningio/gl-vsts-tasks-ghost/blob/master/Extension/extension-icon.png)

# Ghost Build and Release Tasks

[![Build status](https://geeklearning.visualstudio.com/Ghost%20VSTS%20Extension/_apis/build/status/Ghost%20VSTS%20Extension-CI)](https://geeklearning.visualstudio.com/Ghost%20VSTS%20Extension/_build/latest?definitionId=138)

[Ghost](https://ghostpkg.com/) is an amazing blogging platform. It is fast, reliable and now has an amazing editing experience. 

![Features](https://github.com/geeklearningio/gl-vsts-tasks-ghost/blob/master/Extension/Screenshots/GBranding-Main.png)

With this extension you can automate the publication of a theme to a Ghost blog instance. 

> Note: We support only ghost 1.24 and above


[Learn more](https://github.com/geeklearningio/gl-vsts-tasks-ghost/wiki) about this extension on the wiki!

## Tasks included

* **[Ghost theme uploader](https://github.com/geeklearningio/gl-vsts-tasks-ghost/wiki/Ghost-Theme-Uploader)**: Uploads a theme to ghost.

## To contribute

1. Globally install typescript and tfx-cli (to package VSTS extensions): `npm install -g typescript tfx-cli`
2. From the root of the repo run `npm install`. This will pull down the necessary modules for the different tasks and for the build tools.
3. Run `npm run build` to compile the build tasks.
4. Run `npm run package -- --version <version>` to create the .vsix extension packages (supports multiple environments) that includes the build tasks.

## Known Issues

Please refer to our [wiki page](https://github.com/geeklearningio/gl-vsts-tasks-ghost/wiki/Known-Issues)

## Release Notes

Please refer to our [release page](https://github.com/geeklearningio/gl-vsts-tasks-ghost/releases)

## Contributors

This extension was created by [Geek Learning](http://geeklearning.io/), with help from the community.

## Attributions

* [Ghost by Ghost](https://ghost.org/)
