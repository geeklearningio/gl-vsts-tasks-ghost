declare module "@tryghost/admin-api" {
  interface AdminApiOptions {
    url: string;
    key: string;
    version: "v2";
  }

  interface ThemeData {
    file: string;
  }

  class ThemesApi {
    upload(data: ThemeData): PromiseLike<any>;
  }

  class GhostAdminApiClient {
    constructor(options: AdminApiOptions);
    themes: ThemesApi;
  }

  export = GhostAdminApiClient;
}
