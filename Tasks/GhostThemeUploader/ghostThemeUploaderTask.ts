import * as tl from "azure-pipelines-task-lib/task";

import { themeUploadV1 } from "./ghostv1";
import { themeUploadV2 } from "./ghostv2";

let version = tl.getInput("version");

async function themeUpload() {
  switch (version) {
    case "v1":
      await themeUploadV1();
      break;
    default:
      const blogEndpoint = tl.getInput("blog");

      await themeUploadV2({
        themePath: tl.getPathInput("theme"),
        blogUrl: tl.getEndpointUrl(blogEndpoint, false),
        blogAuth: tl.getEndpointAuthorization(blogEndpoint, false),
        version: "v2"
      });
      break;
  }
}

themeUpload();
