// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientID: "d22ea31a-e5c9-4039-a9e1-1a44770e91db",
  authority: "https://login.microsoftonline.com/common",
  redirectUri: "http://localhost:4200",
  postLogoutRedirectUri: "http://localhost:4200",
  webapiDomain: "https://ES14157:8081"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
