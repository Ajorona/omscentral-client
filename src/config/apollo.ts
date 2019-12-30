export interface IApolloConfig {
  uri: string;
}

export const config: IApolloConfig = {
  uri: process.env.REACT_APP_API_URI!
};
