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

  class AdminApi {
    themes: ThemesApi;
  }

  class GhostAdminApiClient {
    constructor(options: AdminApiOptions);

    public api: AdminApi;
  }

  export = GhostAdminApiClient;
}
