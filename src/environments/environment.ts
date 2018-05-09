// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCkgKUqbSlNmJxJykc9VPJA6AfvkNi5SmI',
    authDomain: 'colour-game-ed095.firebaseapp.com',
    databaseURL: 'https://colour-game-ed095.firebaseio.com',
    projectId: 'colour-game-ed095',
    storageBucket: 'colour-game-ed095.appspot.com',
    messagingSenderId: '203742208097',
  }
};
