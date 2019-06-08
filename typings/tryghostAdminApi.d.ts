declare module "@tryghost/admin-api" {
  export enum GhostVersions {
    v2 = "v2"
  }

  export interface AdminApiOptions {
    url: string;
    key: string;
    version: GhostVersions;
  }

  export interface ThemeData {
    file: string;
  }

  export class ThemesApi {
    upload(data: ThemeData): PromiseLike<any>;
  }

  export class AdminApi {
    themes: ThemesApi;
  }

  class GhostAdminApiClient {
    constructor(options: AdminApiOptions);

    public api: AdminApi;
  }

  export default GhostAdminApiClient;
}
