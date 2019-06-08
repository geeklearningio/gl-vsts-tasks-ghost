import * as tl from "azure-pipelines-task-lib/task";

import GhostAdminApiClient = require("@tryghost/admin-api");

export interface Options {
  blogUrl: string;
  blogAuth: tl.EndpointAuthorization;
  themePath: string;
  version: "v2";
}

export async function themeUploadV2(options: Options) {
  const url = options.blogUrl.endsWith("/")
    ? options.blogUrl.substr(0, options.blogUrl.length - 1)
    : options.blogUrl;

  const client = new GhostAdminApiClient({
    url,
    key: options.blogAuth.parameters["token"] as string,
    version: options.version
  });

  await client.api.themes.upload({ file: options.themePath });
}
