// This file is for the demo-version running on http://adras.bplaced.net/notes-angular/
// The github CI/CD process uses this file and overwrites environment.prod.ts before building the angular project

export const environment = {
  production: false,
  apiURL: 'http://adras.bplaced.net/notes-angular/index.php',
};

