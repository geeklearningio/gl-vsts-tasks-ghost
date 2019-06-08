import * as tl from "vsts-task-lib/task";
import GhostAdminAPI, { GhostVersions, AdminApi } from "@tryghost/admin-api";

export interface Options {
  blogUrl: string;
  blogAuth: tl.EndpointAuthorization;
  themePath: string;
  version: GhostVersions;
}

export async function themeUploadV2(options: Options) {
  const client = new GhostAdminAPI({
    url: options.blogUrl,
    key: options.blogAuth.parameters["password"] as string,
    version: options.version
  });

  await client.api.themes.upload({ file: options.themePath });
}
