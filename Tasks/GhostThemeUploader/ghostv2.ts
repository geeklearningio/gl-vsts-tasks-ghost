import GhostAdminAPI from "@tryghost/admin-api";
import * as tl from "azure-pipelines-task-lib/task";

export interface Options {
  blogUrl: string;
  blogAuth: tl.EndpointAuthorization;
  themePath: string;
  version: "v2";
}

export async function themeUploadV2(options: Options) {
  const client = new GhostAdminAPI({
    url: options.blogUrl,
    key: options.blogAuth.parameters["password"] as string,
    version: options.version
  });

  await client.api.themes.upload({ file: options.themePath });
}
