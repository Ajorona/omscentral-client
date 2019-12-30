declare module '@elastic/search-ui-app-search-connector' {
  interface IConnectorOptions {
    searchKey: string;
    engineName: string;
    hostIdentifier: string;
  }

  export default class AppSearchAPIConnector {
    constructor(options: IConnectorOptions);
  }
}
