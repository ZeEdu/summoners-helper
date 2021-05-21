// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebase: {
  //   apiKey: 'AIzaSyAxOX-2jIekbF-E_TUjejsO99p5j4YvGTk',
  //   authDomain: 'summoners-helper-dev.firebaseapp.com',
  //   databaseURL: 'https://summoners-helper-dev.firebaseio.com',
  //   projectId: 'summoners-helper-dev',
  //   storageBucket: 'summoners-helper-dev.appspot.com',
  //   messagingSenderId: '663752846896',
  //   appId: '1:663752846896:web:af4fab6144660d885707f5',
  //   measurementId: 'G-8XL0KJHZ99',
  // },
  // backendBaseUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyAlxXly9cTeEQ8cNMtaqNqAU9_jzIOp4Gg',
    authDomain: 'summoners-helper.firebaseapp.com',
    databaseURL: 'https://summoners-helper.firebaseio.com',
    projectId: 'summoners-helper',
    storageBucket: 'summoners-helper.appspot.com',
    messagingSenderId: '427390495077',
    appId: '1:427390495077:web:4212e527c2d0212012598c',
    measurementId: 'G-YMW9FG3888',
  },
  backendBaseUrl: 'http://summoners-helper-api.com',
  patchVersion: '10.7.1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
